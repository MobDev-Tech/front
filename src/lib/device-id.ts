import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const DEVICE_ID_KEY = 'smart-list.device-id';
let deviceIdPromise: Promise<string> | null = null;

/** Cria um identificador local para esta instalação do aplicativo. */
function createDeviceId(): string {
  const randomPart = Math.random().toString(36).slice(2, 10);
  return `smart-list-${Date.now().toString(36)}-${randomPart}`;
}

/** Recupera o identificador salvo ou cria e persiste um novo. */
async function loadOrCreateDeviceId(): Promise<string> {
  const existingId =
    Platform.OS === 'web'
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

/** Retorna o identificador do dispositivo, reutilizando a busca em andamento. */
export function getDeviceId(): Promise<string> {
  if (!deviceIdPromise) {
    deviceIdPromise = loadOrCreateDeviceId().catch((error) => {
      deviceIdPromise = null;
      throw error;
    });
  }
  return deviceIdPromise;
}
