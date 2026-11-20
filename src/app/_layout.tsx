import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { colors } from '../constants/design-tokens';
import { restoreGeofence } from '../lib/geofence-monitor';
import { configureNotifications, handleNotificationResponse } from '../lib/notification-runtime';
import '../lib/geofence-task';

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_600SemiBold, Inter_700Bold });

  useEffect(() => {
    if (Platform.OS === 'web') return;
    void configureNotifications().catch((error) =>
      console.warn('Notificações indisponíveis:', error),
    );
    void restoreGeofence().catch((error) => console.warn('Geocerca indisponível:', error));
    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      void handleNotificationResponse(response).catch((error) =>
        console.warn('Ação da notificação falhou:', error),
      );
    });
    void Notifications.getLastNotificationResponseAsync()
      .then((response) => {
        if (response) return handleNotificationResponse(response);
      })
      .catch((error) => console.warn('Resposta da notificação indisponível:', error));
    return () => subscription.remove();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }} />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    flex: 1,
    justifyContent: 'center',
  },
});
