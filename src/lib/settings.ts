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

/** Busca as preferências atuais do usuário. */
export function getSettings() {
  return api.get<UserSettings>('/api/v1/settings');
}

/** Salva as preferências atualizadas do usuário. */
export function updateSettings(settings: SettingsUpdate) {
  return api.put<UserSettings>('/api/v1/settings', settings);
}

/** Busca o diagnóstico de configuração e permissões informado pela API. */
export function getDiagnostic() {
  return api.get<SystemDiagnostic>('/api/v1/settings/diagnostic');
}

/** Lê do sistema as permissões atuais de localização e notificações. */
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

/** Sincroniza com a API as permissões do aparelho quando houver divergência. */
export async function syncDevicePermissions(settings: UserSettings): Promise<UserSettings> {
  const permissions = await readDevicePermissions();
  if (
    permissions.locationPermission === settings.locationPermission &&
    permissions.notificationPermission === settings.notificationPermission
  )
    return settings;
  return updateSettings({ ...settings, ...permissions });
}

/** Solicita as permissões necessárias e retorna o estado atualizado do aparelho. */
export async function requestDevicePermissions() {
  const foreground = await Location.requestForegroundPermissionsAsync();
  if (foreground.granted && Platform.OS !== 'web') {
    await Location.requestBackgroundPermissionsAsync().catch(() => null);
  }
  if (Platform.OS !== 'web') await Notifications.requestPermissionsAsync().catch(() => null);
  return readDevicePermissions();
}
