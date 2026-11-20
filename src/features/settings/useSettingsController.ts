import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

import { configureGeofence } from '../../lib/geofence-monitor';
import {
  applySnooze,
  cancelSnooze,
  getSnooze,
  type Snooze,
  type SnoozeOption,
} from '../../lib/notification-api';
import { getResidence, saveResidence, type Residence } from '../../lib/residence';
import { clearCompletedShoppingItems } from '../../lib/shopping-items';
import {
  getDiagnostic,
  getSettings,
  requestDevicePermissions,
  syncDevicePermissions,
  updateSettings,
  type SystemDiagnostic,
  type UserSettings,
} from '../../lib/settings';

const snoozeOptions = {
  '30m': 'MINUTES_30',
  '1h': 'HOUR_1',
  tomorrow: 'TOMORROW_MORNING',
  manual: 'INDEFINITE',
} as const satisfies Record<string, SnoozeOption>;

type SnoozeChoice = keyof typeof snoozeOptions;

export function useSettingsController() {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [residence, setResidence] = useState<Residence | null>(null);
  const [diagnostic, setDiagnostic] = useState<SystemDiagnostic | null>(null);
  const [snooze, setSnooze] = useState<Snooze | null>(null);
  const [monitoringRunning, setMonitoringRunning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [reminders, setReminders] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [radius, setRadius] = useState(150);
  const [draftRadius, setDraftRadius] = useState(150);
  const [radiusSheet, setRadiusSheet] = useState(false);
  const [snoozeSheet, setSnoozeSheet] = useState(false);
  const [snoozeChoice, setSnoozeChoice] = useState<SnoozeChoice>('30m');
  const [toast, setToast] = useState('');

  const showToast = useCallback((message: string) => {
    setToast(message);
    setTimeout(() => setToast(''), 2600);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const currentSettings = await syncDevicePermissions(await getSettings());
      const [currentResidence, currentDiagnostic, currentSnooze] = await Promise.all([
        getResidence(),
        getDiagnostic(),
        getSnooze(),
      ]);
      setSettings(currentSettings);
      setReminders(currentSettings.remindOnLeave);
      setVibration(currentSettings.vibrateOnNotify);
      setResidence(currentResidence);
      setRadius(currentResidence?.radiusMeters ?? 150);
      setDiagnostic(currentDiagnostic);
      setSnooze(currentSnooze);
      try {
        setMonitoringRunning(await configureGeofence(currentResidence, currentSettings));
      } catch {
        setMonitoringRunning(false);
      }
    } catch (error) {
      setLoadError(
        error instanceof Error ? error.message : 'Não foi possível carregar as configurações.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load]),
  );

  async function persistSetting(
    change: Partial<Pick<UserSettings, 'remindOnLeave' | 'vibrateOnNotify'>>,
  ) {
    if (!settings || busy) return;
    setBusy(true);
    try {
      const updated = await updateSettings({ ...settings, ...change });
      setSettings(updated);
      setReminders(updated.remindOnLeave);
      setVibration(updated.vibrateOnNotify);
      setDiagnostic(await getDiagnostic());
      try {
        setMonitoringRunning(await configureGeofence(residence, updated));
      } catch {
        setMonitoringRunning(false);
      }
      showToast('Configuração salva');
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Falha ao salvar configuração');
    } finally {
      setBusy(false);
    }
  }

  function openRadius() {
    if (!residence) {
      router.push('/residence');
      return;
    }
    setDraftRadius(radius);
    setRadiusSheet(true);
  }

  async function confirmRadius() {
    if (!residence || busy) return;
    setBusy(true);
    try {
      const updated = await saveResidence({
        address: residence.address,
        complement: residence.complement,
        latitude: residence.latitude,
        longitude: residence.longitude,
        geofenceActive: residence.geofenceActive,
        radiusMeters: draftRadius,
      });
      setResidence(updated);
      setRadius(updated.radiusMeters);
      if (settings) {
        try {
          setMonitoringRunning(await configureGeofence(updated, settings));
        } catch {
          setMonitoringRunning(false);
        }
      }
      setRadiusSheet(false);
      showToast(`Raio ajustado para ${updated.radiusMeters} metros`);
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Não foi possível salvar o raio');
    } finally {
      setBusy(false);
    }
  }

  async function chooseSnooze() {
    if (busy) return;
    setBusy(true);
    try {
      setSnooze(await applySnooze(snoozeOptions[snoozeChoice]));
      setSnoozeSheet(false);
      showToast('Lembretes pausados com sucesso');
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Não foi possível pausar lembretes');
    } finally {
      setBusy(false);
    }
  }

  async function reactivate() {
    if (busy) return;
    setBusy(true);
    try {
      setSnooze(await cancelSnooze());
      showToast('Lembretes reativados');
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Não foi possível reativar');
    } finally {
      setBusy(false);
    }
  }

  async function clearCompleted() {
    if (busy) return;
    setBusy(true);
    try {
      await clearCompletedShoppingItems();
      showToast('Itens concluídos removidos');
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Não foi possível limpar a lista');
    } finally {
      setBusy(false);
    }
  }

  async function grantPermissions() {
    if (busy) return;
    setBusy(true);
    try {
      await requestDevicePermissions();
      await load();
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Não foi possível solicitar permissões');
    } finally {
      setBusy(false);
    }
  }

  return {
    busy,
    clearCompleted,
    confirmRadius,
    diagnostic,
    draftRadius,
    grantPermissions,
    loading,
    load,
    loadError,
    monitoringRunning,
    openRadius,
    persistSetting,
    radius,
    radiusSheet,
    reactivate,
    reminders,
    residence,
    setDraftRadius,
    setRadiusSheet,
    setSnoozeChoice,
    setSnoozeSheet,
    setToast,
    settings,
    snooze,
    snoozeChoice,
    snoozeSheet,
    toast,
    vibration,
    chooseSnooze,
  };
}
