import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  BagIcon,
  BatteryIcon,
  CalendarIcon,
  CameraIcon,
  CheckCircleIcon,
  FingerprintIcon,
  FlashIcon,
  ListIcon,
  NavigationIcon,
  PinIcon,
  ProductArt,
  RadarIcon,
  SignalIcon,
  SnoozeIcon,
  WeatherIcon,
  WifiIcon,
} from './NotificationPreviewComponents';
import { styles } from './notificationPreview.styles';

export function NotificationPreviewScreen() {
  const [notificationVisible, setNotificationVisible] = useState(true);
  const [toast, setToast] = useState('');

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.lockScreen}>
          <View style={styles.wallpaperGlow} />
          <View style={styles.statusBar}>
            <View style={styles.statusLeft}>
              <Text style={styles.statusTime}>09:41</Text>
              <NavigationIcon />
            </View>
            <View style={styles.statusRight}>
              <WifiIcon />
              <SignalIcon />
              <BatteryIcon />
            </View>
          </View>
          <View style={styles.clockBlock}>
            <Text style={styles.clock}>09:41</Text>
            <View style={styles.dateRow}>
              <CalendarIcon />
              <Text style={styles.date}>Segunda-feira, 24 de Outubro</Text>
              <Text style={styles.dateDot}>•</Text>
              <WeatherIcon />
              <Text style={styles.date}>23°C</Text>
            </View>
          </View>

          {notificationVisible ? (
            <View style={styles.notification}>
              <View style={styles.notificationHeader}>
                <View style={styles.appIcon}>
                  <BagIcon />
                </View>
                <Text style={styles.appName}>Lista Inteligente</Text>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.now}>agora</Text>
                <View style={styles.geoMini}>
                  <PinIcon />
                </View>
                <Pressable
                  accessibilityLabel="Dispensar notificação"
                  onPress={() => setNotificationVisible(false)}
                  style={styles.expandButton}
                >
                  <Text style={styles.expandText}>⌄</Text>
                </Pressable>
              </View>
              <Text style={styles.notificationTitle}>Você saiu de casa com compras pendentes!</Text>
              <Text style={styles.notificationBody}>
                Há <Text style={styles.bold}>4 itens</Text> na sua lista de compras: Café moído,
                Leite desnatado, Azeite de oliva e mais 1 produto.
              </Text>
              <View style={styles.geofencePill}>
                <RadarIcon />
                <Text style={styles.geofenceText}>Detectado afastamento de 150m da residência</Text>
              </View>
              <View style={styles.products}>
                {[
                  ['coffee', 'Café'],
                  ['milk', 'Leite'],
                  ['oil', 'Azeite'],
                ].map(([type, label]) => (
                  <View key={type} style={styles.productTile}>
                    <ProductArt kind={type} />
                    <Text style={styles.productLabel}>{label}</Text>
                  </View>
                ))}
                <View style={styles.moreTile}>
                  <Text style={styles.moreNumber}>+1</Text>
                  <Text style={styles.moreLabel}>item</Text>
                </View>
              </View>
              <View style={styles.actions}>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => router.replace('/(tabs)/list')}
                  style={styles.openList}
                >
                  <ListIcon />
                  <Text style={styles.actionPrimaryText}>Abrir Lista</Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => {
                    setNotificationVisible(false);
                    setToast('Lembretes adiados por 30 minutos');
                  }}
                  style={styles.snooze}
                >
                  <SnoozeIcon />
                  <Text style={styles.actionSecondaryText}>Adiar 30 min</Text>
                </Pressable>
              </View>
              <Pressable
                accessibilityRole="button"
                onPress={() => setNotificationVisible(false)}
                style={styles.dismiss}
              >
                <Text style={styles.dismissText}>Dispensar</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable
              accessibilityRole="button"
              onPress={() => setNotificationVisible(true)}
              style={styles.dismissed}
            >
              <Text style={styles.dismissedText}>
                Notificação dispensada — tocar para restaurar
              </Text>
            </Pressable>
          )}

          <View style={styles.lockFooter}>
            <View style={styles.quickLaunch}>
              <FlashIcon />
            </View>
            <View style={styles.unlock}>
              <FingerprintIcon />
              <Text style={styles.unlockText}>Toque para desbloquear</Text>
            </View>
            <View style={styles.quickLaunch}>
              <CameraIcon />
            </View>
          </View>
        </View>

        <View style={styles.explanation}>
          <View style={styles.explanationTitle}>
            <CheckCircleIcon />
            <Text style={styles.explanationHeading}>Como o Gatilho Proativo Funciona</Text>
          </View>
          <Text style={styles.explanationBody}>
            Assim que o serviço em segundo plano detecta o afastamento do raio seguro de{' '}
            <Text style={styles.bold}>150 metros</Text> da sua residência com itens não marcados, o
            Android 14 emite este alerta contextual com botões de ação com um só toque, garantindo
            que você não precise retornar ou esquecer compras essenciais.
          </Text>
        </View>
      </ScrollView>
      {toast ? (
        <View accessibilityRole="alert" style={styles.toast}>
          <Text style={styles.toastText}>{toast}</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
}
