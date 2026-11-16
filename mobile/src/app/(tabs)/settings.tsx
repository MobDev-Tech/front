import { router } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { colors } from '../../constants/design-tokens';

const radiusOptions = [100, 150, 200, 300];
const snoozeOptions = [
  { id: '30m', title: '30 minutos', detail: 'Ideal para passeios curtos com o pet ou caminhadas rápidas.', badge: 'Mais usado' },
  { id: '1h', title: '1 hora', detail: 'Recomendado para recados rápidos ou almoço no bairro.' },
  { id: 'tomorrow', title: 'Até amanhã de manhã', detail: 'Retomar o monitoramento automaticamente às 08:00.' },
  { id: 'manual', title: 'Até eu reativar manualmente', detail: 'Silenciar indefinidamente até um novo toque na lista.' },
];

export default function SettingsScreen() {
  const [reminders, setReminders] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [radius, setRadius] = useState(150);
  const [draftRadius, setDraftRadius] = useState(150);
  const [radiusSheet, setRadiusSheet] = useState(false);
  const [snoozeSheet, setSnoozeSheet] = useState(false);
  const [snoozeChoice, setSnoozeChoice] = useState('30m');
  const [toast, setToast] = useState('');

  function showToast(message: string) {
    setToast(message);
    setTimeout(() => setToast(''), 2600);
  }

  function openRadius() {
    setDraftRadius(radius);
    setRadiusSheet(true);
  }

  function confirmRadius() {
    setRadius(draftRadius);
    setRadiusSheet(false);
    showToast(`Raio ajustado para ${draftRadius} metros`);
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerCopy}>
            <Text style={styles.title}>Configurações</Text>
            <View style={styles.monitoring}><View style={styles.pulseDot} /><Text style={styles.monitoringText}>MONITORAMENTO RESIDENCIAL ATIVO</Text></View>
          </View>
          <Pressable accessibilityLabel="Configurações" style={styles.headerIcon}><SettingsIcon /></Pressable>
          <View style={styles.avatar}><UserIcon /></View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeading}><Text style={styles.sectionTitle}>LEMBRETES &amp; MONITORAMENTO</Text><Text style={styles.sectionTag}>Geofencing</Text></View>
          <View style={styles.card}>
            <View style={styles.switchRow}>
              <View style={styles.rowCopy}><Text style={styles.rowTitle}>Lembretes ao sair de casa</Text><Text style={styles.rowDescription}>Envia um alerta quando você sai da área residencial com itens pendentes na lista.</Text></View>
              <Switch accessibilityLabel="Lembretes ao sair de casa" value={reminders} onValueChange={(value) => { setReminders(value); showToast(value ? 'Opção ativada' : 'Opção desativada'); }} trackColor={{ false: colors.surfaceContainerHigh, true: colors.primary }} thumbColor={colors.white} />
            </View>
            <Divider />
            <Pressable accessibilityRole="button" onPress={openRadius} style={styles.residenceRow}>
              <IconTile><RadarIcon /></IconTile>
              <View style={styles.rowCopy}>
                <Text style={styles.rowTitle}>Configuração da Residência</Text>
                <Text style={styles.rowDescription}>Rua das Flores, 342 • Raio: <Text style={styles.radiusInline}>{radius}m</Text></Text>
                <View style={styles.definedRow}><View style={styles.smallDot} /><Text style={styles.definedText}>Definido no mapa</Text></View>
              </View>
              <ChevronIcon />
            </Pressable>
            <Divider />
            <View style={styles.vibrationRow}>
              <IconTile><VibrationIcon /></IconTile>
              <View style={styles.rowCopy}><Text style={styles.rowTitle}>Vibração ao notificar</Text><Text style={styles.rowDescription}>Padrão tátil curto para atenção imediata</Text></View>
              <Switch accessibilityLabel="Vibração ao notificar" value={vibration} onValueChange={(value) => { setVibration(value); showToast(value ? 'Opção ativada' : 'Opção desativada'); }} trackColor={{ false: colors.surfaceContainerHigh, true: colors.primary }} thumbColor={colors.white} />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeading}><Text style={styles.sectionTitle}>PERMISSÕES DO SISTEMA</Text><Text style={styles.sectionTagMuted}>Android 14</Text></View>
          <View style={[styles.card, styles.permissionsCard]}>
            <PermissionRow icon="notification" title="Notificações do Android" description="Prioridade alta para lembretes" status="Permitido" />
            <PermissionRow icon="location" title="Acesso à Localização" description="Geocerca em baixa energia" status="Sempre permitida" />
            <View style={styles.privacyBanner}><ShieldIcon /><Text style={styles.privacyText}>Sua privacidade em primeiro plano: o aplicativo continua funcionando como uma lista de compras convencional caso as permissões de localização sejam desativadas.</Text></View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeading}><Text style={styles.sectionTitle}>GERENCIAMENTO DA LISTA</Text><TuneIcon /></View>
          <View style={styles.card}>
            <ActionRow icon="clean" title="Limpar itens comprados" description="Remove apenas os itens com checkmark" onPress={() => showToast('Itens concluídos foram removidos da lista')} />
            <Divider />
            <ActionRow icon="snooze" title="Pausar lembretes temporariamente" description="Silencia avisos por 2 horas ou até amanhã" onPress={() => setSnoozeSheet(true)} />
          </View>
        </View>

        <View style={styles.footer}><Text style={styles.footerBrand}><Text style={styles.footerLeaf}>❧</Text>  Lista Inteligente • v1.0.0</Text><Text style={styles.footerText}>Dados salvos localmente com segurança no dispositivo.</Text><Pressable accessibilityRole="button" onPress={() => router.push('/notification-preview')} style={styles.previewLink}><Text style={styles.previewLinkText}>Visualizar prévia da notificação</Text></Pressable></View>
      </ScrollView>

      {toast ? <View accessibilityRole="alert" style={styles.toast}><CheckIcon /><Text style={styles.toastText}>{toast}</Text><Pressable accessibilityLabel="Fechar aviso" onPress={() => setToast('')}><Text style={styles.toastClose}>×</Text></Pressable></View> : null}

      <Modal animationType="slide" onRequestClose={() => setRadiusSheet(false)} transparent visible={radiusSheet}>
        <View style={styles.modalRoot}>
          <Pressable accessibilityLabel="Fechar seletor de raio" onPress={() => setRadiusSheet(false)} style={styles.modalBackdrop} />
          <View style={styles.sheet}>
            <View style={styles.sheetHandle} />
            <View style={styles.sheetHeader}><View><Text style={styles.sheetTitle}>Raio do Perímetro</Text><Text style={styles.sheetSubtitle}>Selecione a distância ideal para acionar os avisos</Text></View><Pressable accessibilityLabel="Fechar" onPress={() => setRadiusSheet(false)} style={styles.closeButton}><Text style={styles.closeText}>×</Text></Pressable></View>
            <View style={styles.miniMap}><MiniRadar /><Text style={styles.mapAddress}>Rua das Flores, 342 • São Paulo</Text></View>
            <Text style={styles.distanceLabel}>DISTÂNCIA DO GATILHO</Text>
            <View style={styles.radiusOptions}>{radiusOptions.map((option) => <Pressable accessibilityRole="radio" accessibilityState={{ selected: draftRadius === option }} key={option} onPress={() => setDraftRadius(option)} style={[styles.radiusOption, draftRadius === option && styles.radiusOptionSelected]}><Text style={[styles.radiusOptionText, draftRadius === option && styles.radiusOptionTextSelected]}>{option}m</Text></Pressable>)}</View>
            <Pressable accessibilityRole="button" onPress={confirmRadius} style={styles.confirmButton}><CheckIcon /><Text style={styles.confirmText}>Confirmar Perímetro</Text></Pressable>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" onRequestClose={() => setSnoozeSheet(false)} transparent visible={snoozeSheet}>
        <View style={styles.modalRoot}>
          <Pressable accessibilityLabel="Fechar pausa de lembretes" onPress={() => setSnoozeSheet(false)} style={styles.modalBackdrop} />
          <View style={styles.sheet}>
            <View style={styles.sheetHandle} />
            <View style={styles.snoozeHero}>
              <View style={styles.snoozeIcon}><SnoozeIcon /><View style={styles.notificationBadge}><BellIcon /></View></View>
              <Text style={styles.sheetTitle}>Adiar Lembretes Residenciais</Text>
              <Text style={styles.snoozeIntro}>Vai dar uma volta rápida ou não vai ao mercado agora? Escolha por quanto tempo pausar os avisos de saída:</Text>
            </View>
            <View accessibilityLabel="Tempo de pausa do lembrete" accessibilityRole="radiogroup" style={styles.snoozeChoices}>
              {snoozeOptions.map((option) => {
                const selected = snoozeChoice === option.id;
                return <Pressable accessibilityRole="radio" accessibilityState={{ selected }} key={option.id} onPress={() => setSnoozeChoice(option.id)} style={[styles.snoozeOption, selected && styles.snoozeOptionSelected]}><View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>{selected ? <View style={styles.radioInner} /> : null}</View><View style={styles.snoozeOptionCopy}><View style={styles.snoozeOptionTitleRow}><Text style={[styles.snoozeOptionTitle, selected && styles.snoozeOptionTitleSelected]}>{option.title}</Text>{option.badge ? <Text style={styles.popularBadge}>{option.badge}</Text> : <Text style={styles.optionMark}>{option.id === '1h' ? '◷' : option.id === 'tomorrow' ? '☼' : 'Ⅱ'}</Text>}</View><Text style={styles.snoozeOptionDescription}>{option.detail}</Text></View></Pressable>;
              })}
            </View>
            <Pressable accessibilityRole="button" onPress={() => { setSnoozeSheet(false); showToast('Lembretes pausados com sucesso!'); }} style={styles.confirmButton}><CheckIcon /><Text style={styles.confirmText}>Confirmar Soneca</Text></Pressable>
            <Pressable accessibilityRole="button" onPress={() => setSnoozeSheet(false)} style={styles.cancelSnooze}><Text style={styles.cancelSnoozeText}>Voltar sem pausar</Text></Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function Divider() { return <View style={styles.divider} />; }
function IconTile({ children }: { children: React.ReactNode }) { return <View style={styles.iconTile}>{children}</View>; }
function PermissionRow({ icon, title, description, status }: { icon: 'notification' | 'location'; title: string; description: string; status: string }) { return <View style={styles.permissionRow}><View style={styles.permissionIcon}>{icon === 'notification' ? <BellIcon /> : <PinIcon />}</View><View style={styles.rowCopy}><Text style={styles.permissionTitle}>{title}</Text><Text style={styles.rowDescription}>{description}</Text></View><View style={styles.permissionStatus}><View style={styles.smallDot} /><Text style={styles.permissionStatusText}>{status}</Text></View></View>; }
function ActionRow({ icon, title, description, onPress }: { icon: 'clean' | 'snooze'; title: string; description: string; onPress: () => void }) { return <Pressable accessibilityRole="button" onPress={onPress} style={styles.actionRow}><IconTile>{icon === 'clean' ? <TrashIcon /> : <SnoozeIcon />}</IconTile><View style={styles.rowCopy}><Text style={styles.rowTitle}>{title}</Text><Text style={styles.rowDescription}>{description}</Text></View><ArrowIcon /></Pressable>; }
function MiniRadar() { return <View style={styles.radarWrap}><View style={styles.radarOuter} /><View style={styles.radarInner} /><View style={styles.radarCenter} /><View style={styles.radarLabel}><Text style={styles.radarLabelText}>150m</Text></View></View>; }
function UserIcon() { return <Svg height="19" viewBox="0 0 24 24" width="19"><Circle cx="12" cy="8" fill="none" r="3" stroke={colors.onPrimary} strokeWidth="1.8" /><Path d="M5.5 19c.8-3.1 3-4.7 6.5-4.7s5.7 1.6 6.5 4.7" fill="none" stroke={colors.onPrimary} strokeLinecap="round" strokeWidth="1.8" /></Svg>; }
function SettingsIcon() { return <Svg height="24" viewBox="0 0 24 24" width="24"><Path d="m19.4 13.5 1.6 1.2-1.8 3.1-1.9-.8a7.5 7.5 0 0 1-2.1 1.2L15 20.3h-3.6l-.3-2.1a7.5 7.5 0 0 1-2.1-1.2l-1.9.8-1.8-3.1 1.6-1.2a7.7 7.7 0 0 1 0-2.4L5.3 9.9l1.8-3.1 1.9.8a7.5 7.5 0 0 1 2.1-1.2l.3-2.1H15l.3 2.1a7.5 7.5 0 0 1 2.1 1.2l1.9-.8 1.8 3.1-1.6 1.2a7.7 7.7 0 0 1-.1 2.4Z" fill="none" stroke={colors.onSurfaceVariant} strokeLinejoin="round" strokeWidth="1.8" /><Circle cx="13.2" cy="12.3" fill="none" r="2.8" stroke={colors.onSurfaceVariant} strokeWidth="1.8" /></Svg>; }
function RadarIcon() { return <Svg height="23" viewBox="0 0 24 24" width="23"><Circle cx="12" cy="12" fill="none" r="8" stroke={colors.primary} strokeWidth="2" /><Circle cx="12" cy="12" fill="none" r="4" stroke={colors.primary} strokeWidth="2" /><Path d="m12 12 6-6M12 4v2m8 6h-2" stroke={colors.primary} strokeLinecap="round" strokeWidth="2" /></Svg>; }
function VibrationIcon() { return <Svg height="22" viewBox="0 0 24 24" width="22"><Rect fill="none" height="12" rx="2" stroke={colors.onSurfaceVariant} strokeWidth="1.8" width="9" x="7.5" y="6" /><Path d="M4 9v6m16-6v6M11 9v6m2-6v6" stroke={colors.onSurfaceVariant} strokeLinecap="round" strokeWidth="1.6" /></Svg>; }
function BellIcon() { return <Svg height="21" viewBox="0 0 24 24" width="21"><Path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" fill="none" stroke={colors.primary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /><Path d="M3 5 5 3m16 2-2-2" stroke={colors.primary} strokeLinecap="round" strokeWidth="1.6" /></Svg>; }
function PinIcon() { return <Svg height="21" viewBox="0 0 24 24" width="21"><Path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" fill="none" stroke={colors.primary} strokeWidth="2" /><Circle cx="12" cy="10" fill="none" r="2.5" stroke={colors.primary} strokeWidth="2" /></Svg>; }
function ShieldIcon() { return <Svg height="19" viewBox="0 0 24 24" width="19"><Path d="M12 3 20 6v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3Z" fill="none" stroke={colors.primary} strokeLinejoin="round" strokeWidth="2" /></Svg>; }
function TrashIcon() { return <Svg height="22" viewBox="0 0 24 24" width="22"><Path d="M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m3 4v6m6-6v6" fill="none" stroke={colors.error} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></Svg>; }
function SnoozeIcon() { return <Svg height="22" viewBox="0 0 24 24" width="22"><Circle cx="12" cy="13" fill="none" r="7" stroke={colors.onSurfaceVariant} strokeWidth="1.8" /><Path d="M12 9v4l3 2M5 4 3 6m16-2 2 2M8 2h8" fill="none" stroke={colors.onSurfaceVariant} strokeLinecap="round" strokeWidth="1.7" /></Svg>; }
function ChevronIcon() { return <Svg height="22" viewBox="0 0 24 24" width="22"><Path d="m9 5 7 7-7 7" fill="none" stroke={colors.onSurfaceVariant} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></Svg>; }
function ArrowIcon() { return <Svg height="21" viewBox="0 0 24 24" width="21"><Path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke={colors.onSurfaceVariant} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></Svg>; }
function TuneIcon() { return <Svg height="18" viewBox="0 0 24 24" width="18"><Path d="M4 7h10m4 0h2M4 17h2m4 0h10M14 4v6M8 14v6" fill="none" stroke={colors.onSurfaceVariant} strokeLinecap="round" strokeWidth="1.8" /><Circle cx="16" cy="7" fill={colors.surface} r="2" stroke={colors.onSurfaceVariant} strokeWidth="1.8" /><Circle cx="8" cy="17" fill={colors.surface} r="2" stroke={colors.onSurfaceVariant} strokeWidth="1.8" /></Svg>; }
function CheckIcon() { return <Svg height="18" viewBox="0 0 24 24" width="18"><Path d="m5 12 4 4L19 6" fill="none" stroke={colors.onPrimary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" /></Svg>; }

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.surface, flex: 1 }, content: { gap: 20, paddingBottom: 26, paddingHorizontal: 16, paddingTop: 4 },
  header: { alignItems: 'center', flexDirection: 'row', gap: 10, minHeight: 74 }, headerCopy: { flex: 1 }, title: { color: colors.onSurface, fontFamily: 'Inter_600SemiBold', fontSize: 22, letterSpacing: -0.4 },
  monitoring: { alignItems: 'center', flexDirection: 'row', gap: 6, marginTop: 4 }, pulseDot: { backgroundColor: colors.primary, borderRadius: 4, height: 8, width: 8 }, monitoringText: { color: colors.primary, fontFamily: 'Inter_600SemiBold', fontSize: 9, letterSpacing: 0.35 }, headerIcon: { alignItems: 'center', height: 42, justifyContent: 'center', width: 42 }, avatar: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: 17, height: 34, justifyContent: 'center', width: 34 },
  section: { gap: 8 }, sectionHeading: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 4 }, sectionTitle: { color: colors.onSurfaceVariant, flex: 1, fontFamily: 'Inter_700Bold', fontSize: 12, letterSpacing: 0.5 }, sectionTag: { color: colors.primary, fontFamily: 'Inter_600SemiBold', fontSize: 10 }, sectionTagMuted: { color: colors.onSurfaceVariant, fontFamily: 'Inter_600SemiBold', fontSize: 10 },
  card: { backgroundColor: colors.white, borderColor: '#F0EFF4', borderRadius: 13, borderWidth: 1, elevation: 1, overflow: 'hidden' }, switchRow: { alignItems: 'flex-start', flexDirection: 'row', gap: 12, padding: 16 }, rowCopy: { flex: 1, minWidth: 0 }, rowTitle: { color: colors.onSurface, fontFamily: 'Inter_600SemiBold', fontSize: 15, lineHeight: 20 }, rowDescription: { color: colors.onSurfaceVariant, fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 18, marginTop: 2 }, divider: { backgroundColor: colors.surfaceContainerHigh, height: 1, opacity: 0.7 }, residenceRow: { alignItems: 'center', flexDirection: 'row', gap: 9, minHeight: 88, padding: 16 }, vibrationRow: { alignItems: 'center', flexDirection: 'row', gap: 9, minHeight: 86, padding: 16 }, iconTile: { alignItems: 'center', backgroundColor: colors.surfaceContainer, borderRadius: 9, height: 40, justifyContent: 'center', width: 40 }, radiusInline: { color: colors.onSurface, fontFamily: 'Inter_700Bold' }, definedRow: { alignItems: 'center', flexDirection: 'row', gap: 5, marginTop: 5 }, smallDot: { backgroundColor: colors.primary, borderRadius: 4, height: 7, width: 7 }, definedText: { color: colors.primary, fontFamily: 'Inter_600SemiBold', fontSize: 10 },
  permissionsCard: { gap: 15, padding: 16 }, permissionRow: { alignItems: 'center', flexDirection: 'row', gap: 9, minHeight: 52 }, permissionIcon: { alignItems: 'center', backgroundColor: '#E4F3E8', borderRadius: 19, height: 38, justifyContent: 'center', width: 38 }, permissionTitle: { color: colors.onSurface, fontFamily: 'Inter_600SemiBold', fontSize: 13 }, permissionStatus: { alignItems: 'center', backgroundColor: '#CFF3D8', borderRadius: 14, flexDirection: 'row', gap: 5, paddingHorizontal: 9, paddingVertical: 6 }, permissionStatusText: { color: colors.primary, fontFamily: 'Inter_600SemiBold', fontSize: 10 }, privacyBanner: { alignItems: 'flex-start', backgroundColor: colors.surfaceContainer, borderRadius: 9, flexDirection: 'row', gap: 8, padding: 10 }, privacyText: { color: colors.onSurfaceVariant, flex: 1, fontFamily: 'Inter_400Regular', fontSize: 11, lineHeight: 18 },
  actionRow: { alignItems: 'center', flexDirection: 'row', gap: 9, minHeight: 76, padding: 16 }, footer: { alignItems: 'center', paddingBottom: 12, paddingTop: 2 }, footerBrand: { color: colors.onSurfaceVariant, fontFamily: 'Inter_600SemiBold', fontSize: 11 }, footerLeaf: { color: colors.primary, fontSize: 15 }, footerText: { color: colors.onSurfaceVariant, fontFamily: 'Inter_400Regular', fontSize: 11, marginTop: 5, textAlign: 'center' }, previewLink: { marginTop: 9, padding: 6 }, previewLinkText: { color: colors.primary, fontFamily: 'Inter_600SemiBold', fontSize: 11 },
  toast: { alignItems: 'center', alignSelf: 'center', backgroundColor: '#283044', borderRadius: 12, bottom: 80, flexDirection: 'row', gap: 8, maxWidth: '90%', paddingHorizontal: 14, paddingVertical: 10, position: 'absolute' }, toastText: { color: '#EEF0FF', flex: 1, fontFamily: 'Inter_400Regular', fontSize: 12 }, toastClose: { color: '#EEF0FF', fontSize: 20, paddingLeft: 4 },
  modalRoot: { backgroundColor: 'rgba(40,48,68,.4)', flex: 1, justifyContent: 'flex-end' }, modalBackdrop: { ...StyleSheet.absoluteFill }, sheet: { backgroundColor: colors.white, borderTopLeftRadius: 22, borderTopRightRadius: 22, gap: 16, padding: 24, paddingBottom: 32 }, sheetHandle: { alignSelf: 'center', backgroundColor: colors.outlineVariant, borderRadius: 3, height: 4, marginBottom: 2, width: 40 }, sheetHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }, sheetTitle: { color: colors.onSurface, fontFamily: 'Inter_600SemiBold', fontSize: 19 }, sheetSubtitle: { color: colors.onSurfaceVariant, fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: 3 }, closeButton: { alignItems: 'center', borderRadius: 18, height: 36, justifyContent: 'center', width: 36 }, closeText: { color: colors.onSurfaceVariant, fontSize: 26 }, miniMap: { alignItems: 'center', backgroundColor: colors.surfaceContainer, borderRadius: 12, height: 140, justifyContent: 'center', overflow: 'hidden', position: 'relative' }, radarWrap: { alignItems: 'center', height: 112, justifyContent: 'center', width: 112 }, radarOuter: { backgroundColor: 'rgba(0,107,44,.12)', borderColor: 'rgba(0,107,44,.28)', borderRadius: 60, borderWidth: 2, height: 112, position: 'absolute', width: 112 }, radarInner: { backgroundColor: 'rgba(0,107,44,.1)', borderColor: 'rgba(0,107,44,.35)', borderRadius: 40, borderWidth: 1, height: 72, position: 'absolute', width: 72 }, radarCenter: { backgroundColor: colors.primary, borderRadius: 6, height: 12, width: 12 }, radarLabel: { backgroundColor: colors.white, borderRadius: 8, bottom: 5, left: -36, paddingHorizontal: 6, paddingVertical: 3, position: 'absolute' }, radarLabelText: { color: colors.onSurface, fontFamily: 'Inter_600SemiBold', fontSize: 9 }, mapAddress: { backgroundColor: 'rgba(255,255,255,.92)', borderRadius: 5, bottom: 8, color: colors.onSurface, fontFamily: 'Inter_600SemiBold', fontSize: 10, left: 8, overflow: 'hidden', paddingHorizontal: 7, paddingVertical: 4, position: 'absolute' }, distanceLabel: { color: colors.onSurfaceVariant, fontFamily: 'Inter_700Bold', fontSize: 10, letterSpacing: 0.5 }, radiusOptions: { flexDirection: 'row', gap: 8 }, radiusOption: { alignItems: 'center', backgroundColor: colors.surfaceContainer, borderRadius: 11, flex: 1, justifyContent: 'center', minHeight: 44 }, radiusOptionSelected: { backgroundColor: colors.primary, elevation: 2 }, radiusOptionText: { color: colors.onSurfaceVariant, fontFamily: 'Inter_600SemiBold', fontSize: 12 }, radiusOptionTextSelected: { color: colors.onPrimary }, confirmButton: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: 11, flexDirection: 'row', gap: 8, height: 50, justifyContent: 'center', marginTop: 3 }, confirmText: { color: colors.onPrimary, fontFamily: 'Inter_600SemiBold', fontSize: 14 },
  snoozeHero: { alignItems: 'center', gap: 6, paddingHorizontal: 3 }, snoozeIcon: { alignItems: 'center', backgroundColor: '#E4F9E8', borderRadius: 28, height: 56, justifyContent: 'center', marginBottom: 5, position: 'relative', width: 56 }, notificationBadge: { alignItems: 'center', backgroundColor: colors.surfaceContainerHigh, borderRadius: 12, height: 24, justifyContent: 'center', position: 'absolute', right: -4, top: -4, width: 24 }, snoozeIntro: { color: colors.onSurfaceVariant, fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 18, maxWidth: 300, textAlign: 'center' }, snoozeChoices: { gap: 8 }, snoozeOption: { alignItems: 'flex-start', backgroundColor: colors.surfaceContainerLow, borderColor: 'transparent', borderRadius: 12, borderWidth: 1, flexDirection: 'row', gap: 10, padding: 13 }, snoozeOptionSelected: { backgroundColor: '#F2FBF4', borderColor: '#B8DCC1' }, radioOuter: { alignItems: 'center', backgroundColor: colors.white, borderColor: colors.outlineVariant, borderRadius: 10, borderWidth: 1, height: 20, justifyContent: 'center', marginTop: 2, width: 20 }, radioOuterSelected: { backgroundColor: colors.primary, borderColor: colors.primary }, radioInner: { backgroundColor: colors.white, borderRadius: 4, height: 8, width: 8 }, snoozeOptionCopy: { flex: 1 }, snoozeOptionTitleRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }, snoozeOptionTitle: { color: colors.onSurface, flex: 1, fontFamily: 'Inter_600SemiBold', fontSize: 13 }, snoozeOptionTitleSelected: { color: colors.primary }, popularBadge: { backgroundColor: '#DDF5E2', borderRadius: 9, color: colors.primary, fontFamily: 'Inter_600SemiBold', fontSize: 9, overflow: 'hidden', paddingHorizontal: 7, paddingVertical: 3 }, optionMark: { color: colors.onSurfaceVariant, fontSize: 17 }, snoozeOptionDescription: { color: colors.onSurfaceVariant, fontFamily: 'Inter_400Regular', fontSize: 10, lineHeight: 15, marginTop: 3 }, cancelSnooze: { alignItems: 'center', justifyContent: 'center', minHeight: 42 }, cancelSnoozeText: { color: colors.onSurfaceVariant, fontFamily: 'Inter_600SemiBold', fontSize: 13 },
});
