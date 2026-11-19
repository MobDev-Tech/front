import * as Notifications from 'expo-notifications';
import { AndroidImportance } from 'expo-notifications';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { Platform } from 'react-native';

import { applySnooze, type TriggerDecision } from './notification-api';

const CHANNEL_VIBRATE = 'smart-list-reminders';
const CHANNEL_SILENT = 'smart-list-reminders-silent';
const CATEGORY = 'shopping_reminder';
const LAST_NOTIFICATION_KEY = 'smart-list.last-notification';
const COOLDOWN_MS = 30 * 60 * 1000;

if (Platform.OS !== 'web') {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

export async function configureNotifications() {
  if (Platform.OS === 'web') return;
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(CHANNEL_VIBRATE, {
      name: 'Lembretes de compras',
      importance: AndroidImportance.HIGH,
      enableVibrate: true,
      vibrationPattern: [0, 250, 150, 250],
      sound: 'default',
    });
    await Notifications.setNotificationChannelAsync(CHANNEL_SILENT, {
      name: 'Lembretes sem vibração',
      importance: AndroidImportance.HIGH,
      enableVibrate: false,
      sound: 'default',
    });
  }
  await Notifications.setNotificationCategoryAsync(CATEGORY, [
    {
      identifier: 'open_list',
      buttonTitle: 'Abrir lista',
      options: { opensAppToForeground: true },
    },
    { identifier: 'snooze', buttonTitle: 'Adiar 30 min', options: { opensAppToForeground: true } },
    { identifier: 'dismiss', buttonTitle: 'Dispensar', options: { opensAppToForeground: false } },
  ]);
}

export async function maybeShowReminder(
  decision: TriggerDecision,
  vibrate: boolean,
): Promise<boolean> {
  if (Platform.OS === 'web' || !decision.shouldNotify) return false;
  const previous = Number((await SecureStore.getItemAsync(LAST_NOTIFICATION_KEY)) ?? 0);
  if (Date.now() - previous < COOLDOWN_MS) return false;

  const firstItem = decision.pendingItemsSummary[0]?.name;
  const body = firstItem
    ? `Você tem ${decision.pendingItemsCount} item(ns) pendente(s), incluindo ${firstItem}.`
    : `Você tem ${decision.pendingItemsCount} item(ns) pendente(s) na lista.`;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Não esqueça sua lista de compras',
      body,
      categoryIdentifier: CATEGORY,
      data: { destination: 'list' },
      ...(Platform.OS === 'android'
        ? { channelId: vibrate ? CHANNEL_VIBRATE : CHANNEL_SILENT }
        : {}),
    },
    trigger: null,
  });
  await SecureStore.setItemAsync(LAST_NOTIFICATION_KEY, String(Date.now()));
  return true;
}

export async function handleNotificationResponse(response: Notifications.NotificationResponse) {
  const action = response.actionIdentifier;
  if (action === 'snooze') await applySnooze('MINUTES_30');
  if (
    action === 'snooze' ||
    action === 'open_list' ||
    action === Notifications.DEFAULT_ACTION_IDENTIFIER
  ) {
    router.replace('/(tabs)/list');
  }
  // Dispensar fecha somente este aviso; o cooldown evita novo aviso imediato.
  Notifications.clearLastNotificationResponse();
}
