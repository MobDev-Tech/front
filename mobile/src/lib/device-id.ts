import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const DEVICE_ID_KEY = 'smart-list.device-id';

function createDeviceId(): string {
  const randomPart = Math.random().toString(36).slice(2, 10);
  return `smart-list-${Date.now().toString(36)}-${randomPart}`;
}

export async function getDeviceId(): Promise<string> {
  const existingId = Platform.OS === 'web'
    ? globalThis.localStorage?.getItem(DEVICE_ID_KEY)
    : await SecureStore.getItemAsync(DEVICE_ID_KEY);
  if (existingId) {
    return existingId;
  }

  const newId = createDeviceId();
  if (Platform.OS === 'web') {
    globalThis.localStorage?.setItem(DEVICE_ID_KEY, newId);
  } else {
    await SecureStore.setItemAsync(DEVICE_ID_KEY, newId);
  }
  return newId;
}
