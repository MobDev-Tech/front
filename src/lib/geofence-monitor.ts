import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { Platform } from 'react-native';

import { checkNotificationTrigger } from './notification-api';
import { maybeShowReminder } from './notification-runtime';
import { getResidence, type Residence } from './residence';
import { getSettings, type UserSettings } from './settings';

export const GEOFENCE_TASK = 'smart-list-home-geofence';

/** Ativa ou desativa o monitoramento conforme residência, preferências e permissões. */
export async function configureGeofence(
  residence: Residence | null,
  settings: UserSettings,
): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  const started = await Location.hasStartedGeofencingAsync(GEOFENCE_TASK);
  const foreground = await Location.getForegroundPermissionsAsync();
  const background = await Location.getBackgroundPermissionsAsync();
  const enabled =
    !!residence?.geofenceActive &&
    settings.remindOnLeave &&
    settings.notificationPermission === 'PERMITIDO' &&
    foreground.granted &&
    background.granted;

  if (!enabled) {
    if (started) await Location.stopGeofencingAsync(GEOFENCE_TASK);
    return false;
  }
  if (!(await TaskManager.isAvailableAsync())) return false;
  await Location.startGeofencingAsync(GEOFENCE_TASK, [
    {
      identifier: 'home',
      latitude: residence.latitude,
      longitude: residence.longitude,
      radius: residence.radiusMeters,
      notifyOnEnter: true,
      notifyOnExit: true,
    },
  ]);
  return true;
}

/** Restaura o monitoramento usando a residência e as preferências salvas. */
export async function restoreGeofence() {
  if (Platform.OS === 'web') return false;
  const [residence, settings] = await Promise.all([getResidence(), getSettings()]);
  return configureGeofence(residence, settings);
}

/** Consulta a localização e verifica se uma saída deve gerar um lembrete. */
export async function processGeofenceExit() {
  const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
  const settings = await getSettings();
  if (!settings.remindOnLeave || settings.notificationPermission !== 'PERMITIDO') return;
  const decision = await checkNotificationTrigger(
    position.coords.latitude,
    position.coords.longitude,
  );
  await maybeShowReminder(decision, settings.vibrateOnNotify);
}
