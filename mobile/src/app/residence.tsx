import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Animated, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { colors } from '../constants/design-tokens';
import { completeOnboarding } from '../lib/storage';

const radiusOptions = [100, 150, 200, 300] as const;

export default function ResidenceScreen() {
  const [radius, setRadius] = useState<number>(150);
  const [ringScale] = useState(() => new Animated.Value(1));
  const [locationLoading, setLocationLoading] = useState(false);
  const [addressEditing, setAddressEditing] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const { from } = useLocalSearchParams<{ from?: string }>();

  useEffect(() => {
    const scales: Record<number, number> = { 100: 0.75, 150: 1, 200: 1.16, 300: 1.38 };
    Animated.spring(ringScale, {
      toValue: scales[radius],
      damping: 16,
      stiffness: 120,
      mass: 0.8,
      useNativeDriver: true,
    }).start();
  }, [radius, ringScale]);

  async function saveResidence() {
    if (from === 'onboarding') await completeOnboarding();
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
      router.replace('/(tabs)/list');
    }, 1400);
  }

  function useCurrentLocation() {
    setLocationLoading(true);
    setTimeout(() => {
      setLocationLoading(false);
      Alert.alert('Localização', 'A localização do dispositivo será ativada na etapa de permissões.');
    }, 750);
  }

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable accessibilityLabel="Voltar" accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}><BackIcon /></Pressable>
        <Text style={styles.headerTitle}>Configuração da Residência</Text>
        <View style={styles.avatar}><UserIcon /></View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.statusBanner}>
          <View style={styles.locationBadge}><NavigationIcon /><View style={styles.onlineDot} /></View>
          <View style={styles.statusCopy}>
            <View style={styles.statusTitleLine}><Text style={styles.statusTitle}>Monitoramento Geofence Ativo</Text><Text style={styles.onlinePill}>Online</Text></View>
            <Text style={styles.statusDescription}>Dispositivo reconhecido dentro da área residencial</Text>
          </View>
          <View style={styles.statusCheck}><CheckIcon /></View>
        </View>

        <View style={styles.mapCard}>
          <View style={styles.map}>
            <MapStreets />
            <Animated.View style={[styles.geofenceRing, { transform: [{ scale: ringScale }] }]}>
              <View style={styles.ringMiddle}><View style={styles.ringCore} /></View>
            </Animated.View>
            <View style={styles.homePin}><HomeIcon /><View style={styles.pinShadow} /></View>
            <View style={styles.mapRadiusBadge}><View style={styles.mapDot} /><Text style={styles.mapRadiusText}>Raio: {radius}m</Text></View>
          </View>
          <View style={styles.addressSection}>
            <View style={styles.addressIcon}><PinIcon /></View>
            <View style={styles.addressCopy}>
              <Text style={styles.addressLabel}>ENDEREÇO RESIDENCIAL DETECTADO</Text>
              {addressEditing ? <Text style={styles.addressTitle}>Toque em “Usar minha localização atual”</Text> : <Text style={styles.addressTitle}>Rua das Flores, 342</Text>}
              {!addressEditing ? <Text style={styles.addressDescription}>Apto 51, Jardim Paulistano • São Paulo, SP</Text> : null}
            </View>
            <Pressable accessibilityLabel="Editar endereço" accessibilityRole="button" onPress={() => setAddressEditing((value) => !value)} style={styles.editButton}><EditIcon /></Pressable>
          </View>
          <Pressable accessibilityRole="button" onPress={useCurrentLocation} style={styles.currentLocationButton}>
            <TargetIcon spinning={locationLoading} />
            <Text style={styles.currentLocationText}>{locationLoading ? 'Localizando...' : 'Usar minha localização atual'}</Text>
          </Pressable>
        </View>

        <View style={styles.radiusCard}>
          <View style={styles.radiusTitleRow}><Text style={styles.cardTitle}>Raio de monitoramento</Text><Text style={styles.radiusValue}>{radius} metros</Text></View>
          <Text style={styles.radiusDescription}>Você receberá um lembrete inteligente instantâneo assim que ultrapassar este perímetro caso haja itens pendentes na sua lista.</Text>
          <View style={styles.radiusOptions}>
            {radiusOptions.map((option) => <Pressable accessibilityRole="radio" accessibilityState={{ selected: option === radius }} key={option} onPress={() => setRadius(option)} style={[styles.radiusOption, radius === option && styles.radiusOptionSelected]}><Text style={[styles.radiusOptionNumber, radius === option && styles.radiusOptionTextSelected]}>{option}m</Text><Text style={[styles.radiusOptionHint, radius === option && styles.radiusOptionHintSelected]}>{option === 100 ? 'Perto' : option === 150 ? 'Padrão' : option === 200 ? 'Médio' : 'Amplo'}</Text>{radius === option ? <View style={styles.radiusSelectedCheck}><CheckIcon /></View> : null}</Pressable>)}
          </View>
          <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${({100: 15, 150: 35, 200: 65, 300: 100} as Record<number, number>)[radius]}%` }]} /></View>
        </View>

        <View style={styles.diagnosticCard}>
          <View style={styles.diagnosticHeading}><View style={styles.shield}><ShieldIcon /></View><Text style={styles.diagnosticTitle}>Diagnóstico do Sistema</Text><Text style={styles.readyPill}>Pronto</Text></View>
          <DiagnosticRow icon="shield" title="Permissão de Localização" detail="Segundo plano permanente" status="Permitido" />
          <DiagnosticRow icon="home" title="Status da Residência" detail="Atualmente dentro do perímetro" status="Em Casa" home />
        </View>
      </ScrollView>

      <View style={styles.bottomAction}><Pressable accessibilityRole="button" onPress={saveResidence} style={({ pressed }) => [styles.saveButton, pressed && styles.pressed]}><CheckIcon /><Text style={styles.saveButtonText}>Salvar Configuração de Residência</Text></Pressable></View>
      {toastVisible ? <View accessibilityRole="alert" style={styles.toast}><CheckIcon /><Text style={styles.toastText}>Residência e geofence configurados com sucesso!</Text></View> : null}
    </SafeAreaView>
  );
}

function MapStreets() {
  return <View pointerEvents="none" style={StyleSheet.absoluteFill}><Svg height="100%" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 280" width="100%"><Rect fill="#EAEDFF" height="280" width="400" />{[0, 1, 2, 3, 4, 5].map((i) => <Rect fill="#FAF8FF" height="12" key={`h${i}`} width="400" y={i * 54 + 13} />)}{[0, 1, 2, 3, 4, 5, 6].map((i) => <Rect fill="#FAF8FF" height="280" key={`v${i}`} width="12" x={i * 64 + 12} />)}<Path d="M0 0 400 280" fill="none" stroke="#DAE2FD" strokeDasharray="8 6" strokeWidth="6" /><Rect fill="#DAE2FD" fillOpacity=".18" height="156" rx="16" width="258" x="72" y="60" /></Svg></View>;
}

function DiagnosticRow({ icon, title, detail, status, home = false }: { icon: 'shield' | 'home'; title: string; detail: string; status: string; home?: boolean }) {
  return <View style={styles.diagnosticRow}><View style={styles.diagnosticIcon}>{icon === 'shield' ? <ShieldIcon /> : <HomeIcon />}</View><View style={styles.diagnosticCopy}><Text style={styles.diagnosticRowTitle}>{title}</Text><Text style={styles.diagnosticDetail}>{detail}</Text></View>{home ? <View style={styles.homeStatus}><View style={styles.homeStatusDot} /><Text style={styles.homeStatusText}>{status}</Text></View> : <View style={styles.allowedStatus}><CheckIcon /><Text style={styles.allowedText}>{status}</Text></View>}</View>;
}

function UserIcon() { return <Svg height="20" viewBox="0 0 24 24" width="20"><Circle cx="12" cy="8" fill="none" r="3" stroke={colors.onPrimary} strokeWidth="1.8" /><Path d="M5.5 19c.8-3.1 3-4.7 6.5-4.7s5.7 1.6 6.5 4.7" fill="none" stroke={colors.onPrimary} strokeLinecap="round" strokeWidth="1.8" /></Svg>; }
function BackIcon() { return <Svg height="22" viewBox="0 0 24 24" width="22"><Path d="m15 18-6-6 6-6M9 12h11" fill="none" stroke={colors.onSurface} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></Svg>; }
function NavigationIcon() { return <Svg height="21" viewBox="0 0 24 24" width="21"><Path d="m4 4 16 7-7 2-2 7L4 4Z" fill="none" stroke={colors.onPrimary} strokeLinejoin="round" strokeWidth="2" /></Svg>; }
function HomeIcon() { return <Svg height="23" viewBox="0 0 24 24" width="23"><Path d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1v-9Z" fill={colors.onPrimary} stroke={colors.onPrimary} strokeLinejoin="round" strokeWidth="1.2" /></Svg>; }
function PinIcon() { return <Svg height="23" viewBox="0 0 24 24" width="23"><Path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" fill="none" stroke={colors.primary} strokeWidth="2" /><Circle cx="12" cy="10" fill="none" r="2.5" stroke={colors.primary} strokeWidth="2" /></Svg>; }
function EditIcon() { return <Svg height="20" viewBox="0 0 24 24" width="20"><Path d="m4 16.5-.8 4.3 4.3-.8L20 7.5 16.5 4 4 16.5Z" fill="none" stroke={colors.onSurfaceVariant} strokeLinejoin="round" strokeWidth="1.8" /><Path d="m14.5 6 3.5 3.5" stroke={colors.onSurfaceVariant} strokeWidth="1.8" /></Svg>; }
function TargetIcon({ spinning }: { spinning: boolean }) { return <Svg height="20" style={spinning ? { transform: [{ rotate: '30deg' }] } : undefined} viewBox="0 0 24 24" width="20"><Circle cx="12" cy="12" fill="none" r="8" stroke={colors.primary} strokeWidth="2" /><Circle cx="12" cy="12" fill="none" r="3" stroke={colors.primary} strokeWidth="2" /><Path d="M12 1v3m0 16v3M1 12h3m16 0h3" stroke={colors.primary} strokeWidth="2" /></Svg>; }
function CheckIcon() { return <Svg height="18" viewBox="0 0 24 24" width="18"><Path d="m5 12 4 4L19 6" fill="none" stroke={colors.onPrimary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" /></Svg>; }
function ShieldIcon() { return <Svg height="21" viewBox="0 0 24 24" width="21"><Path d="M12 3 20 6v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3Z" fill="none" stroke={colors.primary} strokeLinejoin="round" strokeWidth="2" /></Svg>; }

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.surface, flex: 1 },
  header: { alignItems: 'center', backgroundColor: colors.surface, flexDirection: 'row', height: 64, paddingHorizontal: 16 },
  backButton: { alignItems: 'center', height: 44, justifyContent: 'center', marginLeft: -9, width: 44 },
  headerTitle: { color: colors.onSurface, flex: 1, fontFamily: 'Inter_600SemiBold', fontSize: 16, letterSpacing: -0.2 },
  avatar: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: 16, height: 32, justifyContent: 'center', width: 32 },
  scrollContent: { flexGrow: 1, gap: 14, justifyContent: 'space-between', paddingBottom: 20, paddingHorizontal: 16, paddingTop: 8 },
  statusBanner: { alignItems: 'center', backgroundColor: '#E8EBFF', borderRadius: 13, flexDirection: 'row', gap: 10, minHeight: 82, padding: 14 },
  locationBadge: { alignItems: 'center', backgroundColor: '#316BF3', borderRadius: 16, height: 32, justifyContent: 'center', position: 'relative', width: 32 },
  onlineDot: { backgroundColor: colors.primary, borderColor: '#E8EBFF', borderRadius: 6, borderWidth: 1, height: 11, position: 'absolute', right: -1, top: -1, width: 11 },
  statusCopy: { flex: 1 },
  statusTitleLine: { alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  statusTitle: { color: colors.onSurface, fontFamily: 'Inter_600SemiBold', fontSize: 12 },
  onlinePill: { backgroundColor: '#B7F5C7', borderRadius: 9, color: colors.primary, fontFamily: 'Inter_600SemiBold', fontSize: 10, overflow: 'hidden', paddingHorizontal: 7, paddingVertical: 3 },
  statusDescription: { color: colors.onSurfaceVariant, fontFamily: 'Inter_400Regular', fontSize: 11, lineHeight: 15, marginTop: 2 },
  statusCheck: { alignItems: 'center', borderColor: '#AAC8B2', borderRadius: 10, borderWidth: 1.5, height: 20, justifyContent: 'center', width: 20 },
  mapCard: { backgroundColor: colors.white, borderColor: '#F0EFF4', borderRadius: 14, borderWidth: 1, elevation: 1, overflow: 'hidden', paddingBottom: 14 },
  map: { height: 256, overflow: 'hidden', position: 'relative' },
  geofenceRing: { alignItems: 'center', backgroundColor: 'rgba(0,107,44,0.18)', borderRadius: 120, height: 192, justifyContent: 'center', left: '50%', marginLeft: -96, marginTop: -96, position: 'absolute', top: '50%', width: 192 },
  ringMiddle: { alignItems: 'center', backgroundColor: 'rgba(0,107,44,0.13)', borderRadius: 80, height: 128, justifyContent: 'center', width: 128 },
  ringCore: { backgroundColor: 'rgba(0,107,44,0.22)', borderRadius: 50, height: 80, width: 80 },
  homePin: { alignItems: 'center', left: '50%', marginLeft: -24, marginTop: -24, position: 'absolute', top: '50%' },
  pinShadow: { backgroundColor: 'rgba(19,27,46,.35)', borderRadius: 4, height: 8, marginTop: 4, width: 8 },
  mapRadiusBadge: { alignItems: 'center', backgroundColor: 'rgba(255,255,255,.92)', borderRadius: 15, flexDirection: 'row', gap: 5, left: 12, paddingHorizontal: 10, paddingVertical: 5, position: 'absolute', top: 12 },
  mapDot: { backgroundColor: colors.primary, borderRadius: 4, height: 8, width: 8 },
  mapRadiusText: { color: colors.onSurface, fontFamily: 'Inter_600SemiBold', fontSize: 10 },
  addressSection: { alignItems: 'flex-start', flexDirection: 'row', gap: 11, paddingHorizontal: 14, paddingTop: 14 },
  addressIcon: { alignItems: 'center', backgroundColor: colors.surfaceContainer, borderRadius: 20, height: 40, justifyContent: 'center', width: 40 },
  addressCopy: { flex: 1, minWidth: 0 },
  addressLabel: { color: colors.onSurfaceVariant, fontFamily: 'Inter_700Bold', fontSize: 9, letterSpacing: 0.45, marginTop: 1 },
  addressTitle: { color: colors.onSurface, fontFamily: 'Inter_600SemiBold', fontSize: 18, lineHeight: 23, marginTop: 2 },
  addressDescription: { color: colors.onSurfaceVariant, fontFamily: 'Inter_400Regular', fontSize: 13, lineHeight: 19 },
  editButton: { alignItems: 'center', height: 36, justifyContent: 'center', width: 32 },
  currentLocationButton: { alignItems: 'center', backgroundColor: colors.surfaceContainer, borderRadius: 11, flexDirection: 'row', gap: 9, height: 56, justifyContent: 'center', marginHorizontal: 14, marginTop: 13 },
  currentLocationText: { color: colors.onSurface, fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  radiusCard: { backgroundColor: colors.white, borderColor: '#F0EFF4', borderRadius: 14, borderWidth: 1, padding: 16 },
  radiusTitleRow: { alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 8 },
  cardTitle: { color: colors.onSurface, fontFamily: 'Inter_600SemiBold', fontSize: 17 },
  radiusValue: { backgroundColor: '#B7F5C7', borderRadius: 15, color: colors.primary, fontFamily: 'Inter_700Bold', fontSize: 13, overflow: 'hidden', paddingHorizontal: 12, paddingVertical: 5 },
  radiusDescription: { color: colors.onSurfaceVariant, fontFamily: 'Inter_400Regular', fontSize: 13, lineHeight: 19 },
  radiusOptions: { flexDirection: 'row', gap: 7, marginTop: 13 },
  radiusOption: { alignItems: 'center', backgroundColor: colors.surfaceContainer, borderRadius: 12, flex: 1, justifyContent: 'center', minHeight: 56, paddingVertical: 7, position: 'relative' },
  radiusOptionSelected: { backgroundColor: colors.primary },
  radiusOptionNumber: { color: colors.onSurface, fontFamily: 'Inter_700Bold', fontSize: 12 },
  radiusOptionTextSelected: { color: colors.onPrimary },
  radiusOptionHint: { color: colors.onSurfaceVariant, fontFamily: 'Inter_400Regular', fontSize: 9, marginTop: 3 },
  radiusOptionHintSelected: { color: '#E4FFE9' },
  radiusSelectedCheck: { position: 'absolute', right: 4, top: 3 },
  progressTrack: { backgroundColor: colors.surfaceContainer, borderRadius: 3, height: 5, marginTop: 12, overflow: 'hidden' },
  progressFill: { backgroundColor: colors.primary, borderRadius: 3, height: 5 },
  diagnosticCard: { backgroundColor: colors.white, borderColor: '#F0EFF4', borderRadius: 14, borderWidth: 1, gap: 10, padding: 15 },
  diagnosticHeading: { alignItems: 'center', flexDirection: 'row', gap: 8, marginBottom: 1 },
  shield: { alignItems: 'center', justifyContent: 'center' },
  diagnosticTitle: { color: colors.onSurface, flex: 1, fontFamily: 'Inter_600SemiBold', fontSize: 14 },
  readyPill: { backgroundColor: '#B7F5C7', borderRadius: 9, color: colors.primary, fontFamily: 'Inter_600SemiBold', fontSize: 10, overflow: 'hidden', paddingHorizontal: 8, paddingVertical: 3 },
  diagnosticRow: { alignItems: 'center', backgroundColor: colors.surfaceContainerLow, borderRadius: 11, flexDirection: 'row', gap: 10, minHeight: 58, paddingHorizontal: 10 },
  diagnosticIcon: { alignItems: 'center', backgroundColor: '#DCF3E3', borderRadius: 16, height: 32, justifyContent: 'center', width: 32 },
  diagnosticCopy: { flex: 1 },
  diagnosticRowTitle: { color: colors.onSurface, fontFamily: 'Inter_600SemiBold', fontSize: 11 },
  diagnosticDetail: { color: colors.onSurfaceVariant, fontFamily: 'Inter_400Regular', fontSize: 10, marginTop: 2 },
  allowedStatus: { alignItems: 'center', flexDirection: 'row', gap: 3 },
  allowedText: { color: colors.primary, fontFamily: 'Inter_600SemiBold', fontSize: 10 },
  homeStatus: { alignItems: 'center', backgroundColor: '#CBE9D3', borderRadius: 10, flexDirection: 'row', gap: 4, paddingHorizontal: 7, paddingVertical: 3 },
  homeStatusDot: { backgroundColor: colors.primary, borderRadius: 4, height: 8, width: 8 },
  homeStatusText: { color: colors.primary, fontFamily: 'Inter_600SemiBold', fontSize: 10 },
  bottomAction: { backgroundColor: 'rgba(250,248,255,.96)', borderTopColor: '#F0EFF4', borderTopWidth: 1, paddingHorizontal: 16, paddingTop: 12 },
  saveButton: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: 11, elevation: 4, flexDirection: 'row', gap: 9, height: 52, justifyContent: 'center', shadowColor: colors.onSurface, shadowOffset: { height: 2, width: 0 }, shadowOpacity: 0.18, shadowRadius: 5 },
  saveButtonText: { color: colors.onPrimary, fontFamily: 'Inter_600SemiBold', fontSize: 14 },
  pressed: { opacity: 0.86, transform: [{ scale: 0.99 }] },
  toast: { alignItems: 'center', alignSelf: 'center', backgroundColor: '#283044', borderRadius: 24, bottom: 80, flexDirection: 'row', gap: 8, paddingHorizontal: 16, paddingVertical: 11, position: 'absolute' },
  toastText: { color: '#EEF0FF', fontFamily: 'Inter_600SemiBold', fontSize: 12 },
});
