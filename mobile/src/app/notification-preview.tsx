import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { colors } from '../constants/design-tokens';

export default function NotificationPreviewScreen() {
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

function ProductArt({ kind }: { kind: string }) {
  return (
    <View style={styles.productArt}>
      {kind === 'coffee' ? (
        <Svg height="38" viewBox="0 0 40 40" width="38">
          <Rect fill="#C9A77A" height="31" rx="5" width="25" x="8" y="5" />
          <Rect fill="#4C3524" height="8" rx="2" width="25" x="8" y="5" />
          <Rect fill="#F4E8D7" height="12" rx="2" width="17" x="12" y="17" />
          <Path d="M15 23h11" stroke="#754B2B" strokeWidth="2" />
        </Svg>
      ) : kind === 'milk' ? (
        <Svg height="38" viewBox="0 0 40 40" width="38">
          <Path d="M14 7h12l3 6v22H11V13l3-6Z" fill="#F9FAF7" stroke="#CBD5E1" />
          <Path d="M14 7h12v6H14z" fill="#E8EEF4" />
          <Rect fill="#7CA6C2" height="8" rx="2" width="12" x="14" y="21" />
          <Path d="M17 25h6" stroke="#F8FCFF" strokeWidth="2" />
        </Svg>
      ) : (
        <Svg height="38" viewBox="0 0 40 40" width="38">
          <Path d="M14 5h12v5l3 4v20H11V14l3-4V5Z" fill="#456F3E" />
          <Rect fill="#D6C17B" height="11" rx="2" width="17" x="11.5" y="19" />
          <Path d="M15 24h10" stroke="#3F5732" strokeWidth="2" />
        </Svg>
      )}
    </View>
  );
}

function NavigationIcon() {
  return (
    <Svg height="13" viewBox="0 0 24 24" width="13">
      <Path d="m4 4 16 7-7 2-2 7L4 4Z" fill="#7FFC97" />
    </Svg>
  );
}
function WifiIcon() {
  return (
    <Svg height="17" viewBox="0 0 24 24" width="17">
      <Path
        d="M3 9a14 14 0 0 1 18 0M6 12a9 9 0 0 1 12 0m-9 3a5 5 0 0 1 6 0"
        fill="none"
        stroke="#DDE3F8"
        strokeWidth="2"
      />
      <Circle cx="12" cy="18" fill="#DDE3F8" r="1.4" />
    </Svg>
  );
}
function SignalIcon() {
  return (
    <Svg height="16" viewBox="0 0 24 24" width="16">
      <Path
        d="M4 20v-4m5 4v-7m5 7V9m5 11V4"
        stroke="#DDE3F8"
        strokeLinecap="round"
        strokeWidth="3"
      />
    </Svg>
  );
}
function BatteryIcon() {
  return (
    <Svg height="18" viewBox="0 0 24 24" width="18">
      <Rect
        fill="none"
        height="15"
        rx="2"
        stroke="#DDE3F8"
        strokeWidth="1.8"
        width="16"
        x="3"
        y="5"
      />
      <Path d="M21 10v5" stroke="#DDE3F8" strokeLinecap="round" strokeWidth="2" />
      <Rect fill="#DDE3F8" height="9" rx="1" width="10" x="6" y="8" />
    </Svg>
  );
}
function CalendarIcon() {
  return (
    <Svg height="17" viewBox="0 0 24 24" width="17">
      <Rect
        fill="none"
        height="16"
        rx="2"
        stroke="#7FFC97"
        strokeWidth="2"
        width="17"
        x="3.5"
        y="5"
      />
      <Path d="M7 3v4m10-4v4M4 9h16" stroke="#7FFC97" strokeWidth="2" />
    </Svg>
  );
}
function WeatherIcon() {
  return (
    <Svg height="17" viewBox="0 0 24 24" width="17">
      <Circle cx="12" cy="12" fill="none" r="4" stroke="#7FFC97" strokeWidth="2" />
      <Path
        d="M12 2v2m0 16v2M2 12h2m16 0h2m-17-7 1.5 1.5m11 11L19 21m0-16-1.5 1.5m-11 11L5 19"
        stroke="#7FFC97"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </Svg>
  );
}
function BagIcon() {
  return (
    <Svg height="16" viewBox="0 0 24 24" width="16">
      <Path
        d="M5 8h14l1 12H4L5 8Zm4 0V6a3 3 0 0 1 6 0v2"
        fill="none"
        stroke={colors.onPrimary}
        strokeWidth="2"
      />
    </Svg>
  );
}
function PinIcon() {
  return (
    <Svg height="14" viewBox="0 0 24 24" width="14">
      <Path
        d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"
        fill="none"
        stroke={colors.primary}
        strokeWidth="2"
      />
      <Circle cx="12" cy="10" fill={colors.primary} r="2" />
    </Svg>
  );
}
function RadarIcon() {
  return (
    <Svg height="15" viewBox="0 0 24 24" width="15">
      <Circle cx="12" cy="12" fill="none" r="8" stroke="#3159A8" strokeWidth="2" />
      <Path d="m12 12 5-5" stroke="#3159A8" strokeLinecap="round" strokeWidth="2" />
    </Svg>
  );
}
function ListIcon() {
  return (
    <Svg height="18" viewBox="0 0 24 24" width="18">
      <Path
        d="M9 6h12M9 12h12M9 18h12M4 6h.1M4 12h.1M4 18h.1"
        stroke={colors.onPrimary}
        strokeLinecap="round"
        strokeWidth="2.5"
      />
    </Svg>
  );
}
function SnoozeIcon() {
  return (
    <Svg height="17" viewBox="0 0 24 24" width="17">
      <Circle cx="11" cy="13" fill="none" r="7" stroke="#825100" strokeWidth="1.8" />
      <Path
        d="M11 9v4l3 2M17 5h4l-4 4h4"
        fill="none"
        stroke="#825100"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </Svg>
  );
}
function FlashIcon() {
  return (
    <Svg height="20" viewBox="0 0 24 24" width="20">
      <Path
        d="M8 3h8v4l2 3v10H6V10l2-3V3Zm0 4h8M12 10v6m-2-3 2 3 2-3"
        fill="none"
        stroke="#E9EDF8"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </Svg>
  );
}
function CameraIcon() {
  return (
    <Svg height="20" viewBox="0 0 24 24" width="20">
      <Path
        d="M4 7h4l2-2h4l2 2h4v12H4V7Z"
        fill="none"
        stroke="#E9EDF8"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <Circle cx="12" cy="13" fill="none" r="3.5" stroke="#E9EDF8" strokeWidth="1.8" />
    </Svg>
  );
}
function FingerprintIcon() {
  return (
    <Svg height="32" viewBox="0 0 24 24" width="32">
      <Path
        d="M12 11v4m-4-3a4 4 0 0 1 8 0c0 3-1 6-2 8M8 16c.3 2 .8 3.5 1.5 5M5 13a7 7 0 0 1 14 0c0 4-.6 7-1.5 9M3 13a9 9 0 0 1 18 0c0 2-.1 3.7-.4 5.2"
        fill="none"
        stroke="#7FFC97"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </Svg>
  );
}
function CheckCircleIcon() {
  return (
    <Svg height="19" viewBox="0 0 24 24" width="19">
      <Circle cx="12" cy="12" fill="none" r="9" stroke={colors.primary} strokeWidth="2" />
      <Path
        d="m7 12 3 3 7-7"
        fill="none"
        stroke={colors.primary}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.surface, flex: 1 },
  content: { gap: 22, padding: 16, paddingBottom: 32 },
  lockScreen: {
    backgroundColor: '#202A43',
    borderRadius: 14,
    minHeight: 720,
    overflow: 'hidden',
    padding: 16,
    position: 'relative',
  },
  wallpaperGlow: { ...StyleSheet.absoluteFill, backgroundColor: '#283044', opacity: 0.8 },
  statusBar: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  statusLeft: { alignItems: 'center', flexDirection: 'row', gap: 6 },
  statusTime: { color: '#E9EDF8', fontFamily: 'Inter_600SemiBold', fontSize: 11 },
  statusRight: { alignItems: 'center', flexDirection: 'row', gap: 5 },
  clockBlock: { alignItems: 'center', marginBottom: 26, marginTop: 20 },
  clock: {
    color: '#F3F4FF',
    fontFamily: 'Inter_700Bold',
    fontSize: 64,
    letterSpacing: -3,
    lineHeight: 76,
  },
  dateRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    justifyContent: 'center',
    marginTop: 4,
  },
  date: { color: '#E0E5F2', fontFamily: 'Inter_600SemiBold', fontSize: 10 },
  dateDot: { color: '#9BA5B8', fontSize: 12 },
  notification: { backgroundColor: colors.white, borderRadius: 14, padding: 16 },
  notificationHeader: { alignItems: 'center', flexDirection: 'row', gap: 5, marginBottom: 10 },
  appIcon: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    height: 24,
    justifyContent: 'center',
    width: 24,
  },
  appName: { color: colors.onSurface, fontFamily: 'Inter_600SemiBold', fontSize: 11 },
  dot: { color: colors.onSurfaceVariant, fontSize: 10 },
  now: { color: colors.onSurfaceVariant, fontFamily: 'Inter_400Regular', fontSize: 10 },
  geoMini: { marginLeft: 'auto' },
  expandButton: {
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    marginLeft: 4,
    width: 32,
  },
  expandText: { color: colors.onSurfaceVariant, fontSize: 19, lineHeight: 23 },
  notificationTitle: {
    color: colors.onSurface,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 17,
    lineHeight: 23,
  },
  notificationBody: {
    color: colors.onSurfaceVariant,
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
  },
  bold: { color: colors.onSurface, fontFamily: 'Inter_700Bold' },
  geofencePill: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#DBE1FF',
    borderRadius: 16,
    flexDirection: 'row',
    gap: 5,
    marginTop: 10,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  geofenceText: { color: '#00174B', flexShrink: 1, fontFamily: 'Inter_400Regular', fontSize: 10 },
  products: { flexDirection: 'row', gap: 5, marginTop: 14 },
  productTile: {
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 9,
    flex: 1,
    padding: 5,
  },
  productArt: {
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    borderRadius: 7,
    height: 42,
    justifyContent: 'center',
    marginBottom: 3,
    overflow: 'hidden',
    width: '100%',
  },
  productLabel: { color: colors.onSurface, fontFamily: 'Inter_600SemiBold', fontSize: 10 },
  moreTile: {
    alignItems: 'center',
    backgroundColor: colors.primaryContainer,
    borderRadius: 9,
    flex: 1,
    justifyContent: 'center',
  },
  moreNumber: { color: colors.onPrimary, fontFamily: 'Inter_700Bold', fontSize: 20 },
  moreLabel: { color: colors.onPrimary, fontFamily: 'Inter_600SemiBold', fontSize: 10 },
  actions: { alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 14 },
  openList: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 24,
    flexDirection: 'row',
    gap: 6,
    minHeight: 42,
    paddingHorizontal: 14,
  },
  actionPrimaryText: { color: colors.onPrimary, fontFamily: 'Inter_600SemiBold', fontSize: 11 },
  snooze: {
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    borderRadius: 24,
    flexDirection: 'row',
    gap: 5,
    minHeight: 42,
    paddingHorizontal: 13,
  },
  actionSecondaryText: { color: colors.onSurface, fontFamily: 'Inter_600SemiBold', fontSize: 11 },
  dismiss: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    minHeight: 38,
    paddingHorizontal: 12,
  },
  dismissText: { color: colors.onSurfaceVariant, fontFamily: 'Inter_600SemiBold', fontSize: 12 },
  dismissed: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF22',
    borderRadius: 12,
    minHeight: 90,
    justifyContent: 'center',
    padding: 16,
  },
  dismissedText: {
    color: '#E9EDF8',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    textAlign: 'center',
  },
  lockFooter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    paddingTop: 30,
  },
  quickLaunch: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF20',
    borderRadius: 22,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  unlock: { alignItems: 'center' },
  unlockText: { color: '#C7CCDA', fontFamily: 'Inter_600SemiBold', fontSize: 10, marginTop: 3 },
  explanation: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 12,
    gap: 8,
    padding: 16,
  },
  explanationTitle: { alignItems: 'center', flexDirection: 'row', gap: 6 },
  explanationHeading: { color: colors.primary, fontFamily: 'Inter_600SemiBold', fontSize: 14 },
  explanationBody: {
    color: colors.onSurfaceVariant,
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    lineHeight: 20,
  },
  toast: {
    alignSelf: 'center',
    backgroundColor: '#283044',
    borderRadius: 20,
    bottom: 24,
    paddingHorizontal: 14,
    paddingVertical: 10,
    position: 'absolute',
  },
  toastText: { color: '#EEF0FF', fontFamily: 'Inter_600SemiBold', fontSize: 12 },
});
