import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { api } from './api';

export type LocationPermission = 'SEMPRE_PERMITIDA' | 'APENAS_DURANTE_USO' | 'NEGADO';
export type NotificationPermission = 'PERMITIDO' | 'NEGADO';

export type UserSettings = {
  id: number;
  remindOnLeave: boolean;
  vibrateOnNotify: boolean;
  notificationPermission: NotificationPermission;
  locationPermission: LocationPermission;
};

export type SettingsUpdate = Omit<UserSettings, 'id'>;

export type SystemDiagnostic = {
  isSystemReady: boolean;
  notificationPermission: NotificationPermission;
  locationPermission: LocationPermission;
  isResidenceConfigured: boolean;
  residenceStatusMessage: string;
};

export function getSettings() {
  return api.get<UserSettings>('/api/v1/settings');
}

export function updateSettings(settings: SettingsUpdate) {
  return api.put<UserSettings>('/api/v1/settings', settings);
}

export function getDiagnostic() {
  return api.get<SystemDiagnostic>('/api/v1/settings/diagnostic');
}

export async function readDevicePermissions(): Promise<
  Pick<SettingsUpdate, 'notificationPermission' | 'locationPermission'>
> {
  const foreground = await Location.getForegroundPermissionsAsync();
  const background =
    Platform.OS === 'web' ? null : await Location.getBackgroundPermissionsAsync().catch(() => null);
  const notification =
    Platform.OS === 'web' ? null : await Notifications.getPermissionsAsync().catch(() => null);

  return {
    locationPermission: background?.granted
      ? 'SEMPRE_PERMITIDA'
      : foreground.granted
        ? 'APENAS_DURANTE_USO'
        : 'NEGADO',
    notificationPermission: notification?.granted ? 'PERMITIDO' : 'NEGADO',
  };
}

export async function syncDevicePermissions(settings: UserSettings): Promise<UserSettings> {
  const permissions = await readDevicePermissions();
  if (
    permissions.locationPermission === settings.locationPermission &&
    permissions.notificationPermission === settings.notificationPermission
  )
    return settings;
  return updateSettings({ ...settings, ...permissions });
}

export async function requestDevicePermissions() {
  const foreground = await Location.requestForegroundPermissionsAsync();
  if (foreground.granted && Platform.OS !== 'web') {
    await Location.requestBackgroundPermissionsAsync().catch(() => null);
  }
  if (Platform.OS !== 'web') await Notifications.requestPermissionsAsync().catch(() => null);
  return readDevicePermissions();
}
