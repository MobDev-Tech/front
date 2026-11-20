import { router, useLocalSearchParams } from 'expo-router';
import * as Location from 'expo-location';
import { useCallback, useEffect, useState } from 'react';
import { Animated, Platform } from 'react-native';

import { configureGeofence } from '../../lib/geofence-monitor';
import {
  checkGeofence,
  getResidence,
  saveResidence as saveResidenceToApi,
  type GeofenceStatus,
} from '../../lib/residence';
import {
  getDiagnostic,
  getSettings,
  requestDevicePermissions,
  syncDevicePermissions,
  type SystemDiagnostic,
} from '../../lib/settings';
import { completeOnboarding } from '../../lib/storage';
import { radiusScale } from './residence.constants';

type Coordinates = { latitude: number; longitude: number };

export function useResidenceController() {
  const [radius, setRadius] = useState<number>(150);
  const [address, setAddress] = useState('');
  const [complement, setComplement] = useState('');
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [diagnostic, setDiagnostic] = useState<SystemDiagnostic | null>(null);
  const [geofence, setGeofence] = useState<GeofenceStatus | null>(null);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [ringScale] = useState(() => new Animated.Value(1));
  const [locationLoading, setLocationLoading] = useState(false);
  const [addressEditing, setAddressEditing] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const { from } = useLocalSearchParams<{ from?: string }>();

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3500);
  }, []);

  useEffect(() => {
    void Promise.all([getResidence(), getDiagnostic()])
      .then(([saved, status]) => {
        setDiagnostic(status);
        if (saved) {
          setAddress(saved.address);
          setComplement(saved.complement ?? '');
          setCoordinates({ latitude: saved.latitude, longitude: saved.longitude });
          setRadius(saved.radiusMeters);
        }
      })
      .catch((error) =>
        showToast(
          error instanceof Error ? error.message : 'Não foi possível carregar a residência',
        ),
      );
  }, [showToast]);

  useEffect(() => {
    Animated.spring(ringScale, {
      toValue: radiusScale[radius] ?? 1,
      damping: 16,
      stiffness: 120,
      mass: 0.8,
      useNativeDriver: true,
    }).start();
  }, [radius, ringScale]);

  async function saveResidence() {
    if (saving) return;
    if (!coordinates) {
      showToast('Use a localização atual para definir o centro da residência.');
      return;
    }
    if (!address.trim()) {
      showToast('Informe o endereço residencial.');
      return;
    }
    setSaving(true);
    try {
      const saved = await saveResidenceToApi({
        address: address.trim(),
        complement: complement.trim() || null,
        ...coordinates,
        radiusMeters: radius,
        geofenceActive: true,
      });
      let monitoringActive = false;
      try {
        await requestDevicePermissions();
        const settings = await syncDevicePermissions(await getSettings());
        setDiagnostic(await getDiagnostic());
        monitoringActive = await configureGeofence(saved, settings);
      } catch {
        // A residência fica salva mesmo quando as permissões são negadas ou indisponíveis.
      }
      if (from === 'onboarding') await completeOnboarding();
      showToast(
        monitoringActive
          ? 'Residência e monitoramento configurados.'
          : 'Residência salva. Ative as permissões para receber avisos.',
      );
      setTimeout(() => router.replace('/(tabs)/list'), 1200);
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Não foi possível salvar a residência.');
    } finally {
      setSaving(false);
    }
  }

  async function useCurrentLocation() {
    setLocationLoading(true);
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (!permission.granted) {
        showToast('Localização negada. A lista continua disponível.');
        return;
      }
      const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const next = { latitude: position.coords.latitude, longitude: position.coords.longitude };
      setCoordinates(next);
      if (Platform.OS !== 'web') {
        try {
          const [place] = await Location.reverseGeocodeAsync(next);
          if (place && !address.trim()) {
            setAddress(
              [place.street, place.streetNumber, place.city, place.region]
                .filter(Boolean)
                .join(', '),
            );
          }
        } catch {
          // O endereço pode ser preenchido manualmente.
        }
      }
      try {
        setGeofence(await checkGeofence(next.latitude, next.longitude));
      } catch {
        setGeofence(null);
      }
      showToast('Localização obtida. Confira o endereço antes de salvar.');
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Não foi possível obter a localização.');
    } finally {
      setLocationLoading(false);
    }
  }

  return {
    address,
    addressEditing,
    complement,
    coordinates,
    diagnostic,
    geofence,
    locationLoading,
    radius,
    ringScale,
    saving,
    saveResidence,
    setAddress,
    setAddressEditing,
    setComplement,
    setRadius,
    toastMessage,
    toastVisible,
    useCurrentLocation,
  };
}
