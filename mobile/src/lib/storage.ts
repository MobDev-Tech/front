import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const ONBOARDING_COMPLETED_KEY = 'smart-list.onboarding-completed';

export async function hasCompletedOnboarding(): Promise<boolean> {
  const value =
    Platform.OS === 'web'
      ? globalThis.localStorage?.getItem(ONBOARDING_COMPLETED_KEY)
      : await SecureStore.getItemAsync(ONBOARDING_COMPLETED_KEY);

  return value === 'true';
}

export async function completeOnboarding(): Promise<void> {
  if (Platform.OS === 'web') {
    globalThis.localStorage?.setItem(ONBOARDING_COMPLETED_KEY, 'true');
    return;
  }

  await SecureStore.setItemAsync(ONBOARDING_COMPLETED_KEY, 'true');
}
