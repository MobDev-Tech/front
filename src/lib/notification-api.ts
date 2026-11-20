import { api } from './api';
import type { ShoppingItemResponse } from './shopping-items';

export type SnoozeOption = 'MINUTES_30' | 'HOUR_1' | 'TOMORROW_MORNING' | 'INDEFINITE';

export type Snooze = {
  active: boolean;
  option: SnoozeOption | null;
  snoozedUntil: string | null;
  message: string;
};

export type TriggerDecision = {
  shouldNotify: boolean;
  reason: string;
  pendingItemsCount: number;
  pendingItemsSummary: ShoppingItemResponse[];
};

/** Solicita à API o início de uma pausa de lembretes. */
export function applySnooze(option: SnoozeOption) {
  return api.post<Snooze>('/api/v1/notifications/snooze', { option });
}

/** Consulta à API o estado atual da pausa de lembretes. */
export function getSnooze() {
  return api.get<Snooze>('/api/v1/notifications/snooze');
}

/** Solicita à API o cancelamento da pausa de lembretes. */
export function cancelSnooze() {
  return api.delete<Snooze>('/api/v1/notifications/snooze');
}

/** Verifica com a API se a localização atual deve gerar uma notificação. */
export function checkNotificationTrigger(latitude: number, longitude: number) {
  return api.post<TriggerDecision>('/api/v1/notifications/trigger-check', {
    currentLatitude: latitude,
    currentLongitude: longitude,
  });
}
