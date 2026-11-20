import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { Platform } from 'react-native';

import { GEOFENCE_TASK, processGeofenceExit } from './geofence-monitor';

if (Platform.OS !== 'web') {
  // Avalia o lembrete quando o sistema informa a saída do perímetro.
  TaskManager.defineTask<{
    eventType: Location.GeofencingEventType;
    region: Location.LocationRegion;
  }>(GEOFENCE_TASK, async ({ data, error }) => {
    if (error || data?.eventType !== Location.GeofencingEventType.Exit) return;
    try {
      await processGeofenceExit();
    } catch (cause) {
      console.warn('Falha ao avaliar saída do perímetro:', cause);
    }
  });
}
