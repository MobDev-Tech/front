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

export function applySnooze(option: SnoozeOption) {
  return api.post<Snooze>('/api/v1/notifications/snooze', { option });
}

export function getSnooze() {
  return api.get<Snooze>('/api/v1/notifications/snooze');
}

export function cancelSnooze() {
  return api.delete<Snooze>('/api/v1/notifications/snooze');
}

export function checkNotificationTrigger(latitude: number, longitude: number) {
  return api.post<TriggerDecision>('/api/v1/notifications/trigger-check', {
    currentLatitude: latitude,
    currentLongitude: longitude,
  });
}
