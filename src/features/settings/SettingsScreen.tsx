import { router } from 'expo-router';
import {
  ActivityIndicator,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Switch,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../../constants/design-tokens';
import { useSettingsController } from './useSettingsController';
import { ActionRow, Divider, IconTile, MiniRadar, PermissionRow } from './SettingsPrimitives';
import {
  BellIcon,
  CheckIcon,
  ChevronIcon,
  RadarIcon,
  SettingsIcon,
  ShieldIcon,
  SnoozeIcon,
  TuneIcon,
  UserIcon,
  VibrationIcon,
} from './SettingsIcons';
import { styles } from './settings.styles';

const radiusOptions = [100, 150, 200, 300];
const snoozeOptions = [
  {
    id: '30m',
    title: '30 minutos',
    detail: 'Ideal para passeios curtos com o pet ou caminhadas rápidas.',
    badge: 'Mais usado',
  },
  { id: '1h', title: '1 hora', detail: 'Recomendado para recados rápidos ou almoço no bairro.' },
  {
    id: 'tomorrow',
    title: 'Até amanhã de manhã',
    detail: 'Retomar o monitoramento automaticamente às 08:00.',
  },
  {
    id: 'manual',
    title: 'Até eu reativar manualmente',
    detail: 'Silenciar indefinidamente até um novo toque na lista.',
  },
] as const;

export default function SettingsScreen() {
  const {
    busy,
    clearCompleted,
    confirmRadius,
    diagnostic,
    draftRadius,
    grantPermissions,
    loading,
    load,
    loadError,
    monitoringRunning,
    openRadius,
    persistSetting,
    radius,
    radiusSheet,
    reactivate,
    reminders,
    residence,
    setDraftRadius,
    setRadiusSheet,
    setSnoozeChoice,
    setSnoozeSheet,
    setToast,
    settings,
    snooze,
    snoozeChoice,
    snoozeSheet,
    toast,
    vibration,
    chooseSnooze,
  } = useSettingsController();

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerCopy}>
            <Text style={styles.title}>Configurações</Text>
            <View style={styles.monitoring}>
              <View
                style={[
                  styles.pulseDot,
                  (!monitoringRunning || snooze?.active) && { backgroundColor: colors.warningText },
                ]}
              />
              <Text
                style={[
                  styles.monitoringText,
                  (!monitoringRunning || snooze?.active) && { color: colors.warningText },
                ]}
              >
                {snooze?.active
                  ? 'LEMBRETES PAUSADOS'
                  : monitoringRunning
                    ? 'MONITORAMENTO RESIDENCIAL ATIVO'
                    : diagnostic?.isSystemReady && Platform.OS === 'web'
                      ? 'DISPONÍVEL NO ANDROID'
                      : 'MONITORAMENTO PENDENTE'}
              </Text>
            </View>
          </View>
          <View accessible={false} style={styles.headerIcon}>
            <SettingsIcon />
          </View>
          <View style={styles.avatar}>
            <UserIcon />
          </View>
        </View>

        {loading ? (
          <ActivityIndicator accessibilityLabel="Carregando configurações" color={colors.primary} />
        ) : null}
        {loadError ? (
          <Pressable
            accessibilityRole="button"
            onPress={() => void load()}
            style={styles.privacyBanner}
          >
            <Text style={styles.privacyText}>{loadError} Toque para tentar novamente.</Text>
          </Pressable>
        ) : null}

        <View style={styles.section}>
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>LEMBRETES &amp; MONITORAMENTO</Text>
            <Text style={styles.sectionTag}>Geofencing</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.switchRow}>
              <View style={styles.rowCopy}>
                <Text style={styles.rowTitle}>Lembretes ao sair de casa</Text>
                <Text style={styles.rowDescription}>
                  Envia um alerta quando você sai da área residencial com itens pendentes na lista.
                </Text>
              </View>
              <Switch
                accessibilityLabel="Lembretes ao sair de casa"
                disabled={!settings || busy}
                value={reminders}
                onValueChange={(value) => {
                  void persistSetting({ remindOnLeave: value });
                }}
                trackColor={{ false: colors.surfaceContainerHigh, true: colors.primary }}
                thumbColor={colors.white}
              />
            </View>
            <Divider />
            <Pressable accessibilityRole="button" onPress={openRadius} style={styles.residenceRow}>
              <IconTile>
                <RadarIcon />
              </IconTile>
              <View style={styles.rowCopy}>
                <Text style={styles.rowTitle}>Configuração da Residência</Text>
                <Text style={styles.rowDescription}>
                  {residence ? (
                    <>
                      {residence.address} • Raio: <Text style={styles.radiusInline}>{radius}m</Text>
                    </>
                  ) : (
                    'Residência ainda não configurada'
                  )}
                </Text>
                <View style={styles.definedRow}>
                  <View style={styles.smallDot} />
                  <Text style={styles.definedText}>
                    {residence ? 'Definido no mapa' : 'Toque para configurar'}
                  </Text>
                </View>
              </View>
              <ChevronIcon />
            </Pressable>
            {residence ? (
              <Pressable
                accessibilityRole="button"
                onPress={() => router.push('/residence')}
                style={styles.previewLink}
              >
                <Text style={styles.previewLinkText}>Alterar endereço residencial</Text>
              </Pressable>
            ) : null}
            <Divider />
            <View style={styles.vibrationRow}>
              <IconTile>
                <VibrationIcon />
              </IconTile>
              <View style={styles.rowCopy}>
                <Text style={styles.rowTitle}>Vibração ao notificar</Text>
                <Text style={styles.rowDescription}>Padrão tátil curto para atenção imediata</Text>
              </View>
              <Switch
                accessibilityLabel="Vibração ao notificar"
                disabled={!settings || busy}
                value={vibration}
                onValueChange={(value) => {
                  void persistSetting({ vibrateOnNotify: value });
                }}
                trackColor={{ false: colors.surfaceContainerHigh, true: colors.primary }}
                thumbColor={colors.white}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>PERMISSÕES DO SISTEMA</Text>
            <Text style={styles.sectionTagMuted}>
              {Platform.OS === 'web' ? 'Navegador' : 'Dispositivo'}
            </Text>
          </View>
          <View style={[styles.card, styles.permissionsCard]}>
            <PermissionRow
              icon="notification"
              title="Notificações do Android"
              description="Prioridade alta para lembretes"
              status={settings?.notificationPermission === 'PERMITIDO' ? 'Permitido' : 'Pendente'}
            />
            <PermissionRow
              icon="location"
              title="Acesso à Localização"
              description="Geocerca em baixa energia"
              status={
                settings?.locationPermission === 'SEMPRE_PERMITIDA'
                  ? 'Sempre permitida'
                  : settings?.locationPermission === 'APENAS_DURANTE_USO'
                    ? 'Durante o uso'
                    : 'Pendente'
              }
            />
            <Pressable
              accessibilityRole="button"
              onPress={() => void grantPermissions()}
              style={styles.previewLink}
            >
              <Text style={styles.previewLinkText}>Solicitar permissões</Text>
            </Pressable>
            <View style={styles.privacyBanner}>
              <ShieldIcon />
              <Text style={styles.privacyText}>
                A localização da residência e a posição atual são enviadas à API para avaliar o
                perímetro. A lista funciona mesmo sem acesso à localização.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>GERENCIAMENTO DA LISTA</Text>
            <TuneIcon />
          </View>
          <View style={styles.card}>
            <ActionRow
              icon="clean"
              title="Limpar itens comprados"
              description="Remove apenas os itens com checkmark"
              onPress={() => {
                void clearCompleted();
              }}
            />
            <Divider />
            <ActionRow
              icon="snooze"
              title={snooze?.active ? 'Reativar lembretes' : 'Pausar lembretes temporariamente'}
              description={
                snooze?.active
                  ? 'Monitoramento pausado; toque para reativar'
                  : 'Silencia avisos por 30 min, 1 hora ou até amanhã'
              }
              onPress={() => {
                if (snooze?.active) void reactivate();
                else setSnoozeSheet(true);
              }}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerBrand}>
            <Text style={styles.footerLeaf}>❧</Text> Lista Inteligente • v1.0.0
          </Text>
          <Text style={styles.footerText}>
            Itens, configurações e residência são armazenados na API vinculada a este dispositivo.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/notification-preview')}
            style={styles.previewLink}
          >
            <Text style={styles.previewLinkText}>Visualizar prévia da notificação</Text>
          </Pressable>
        </View>
      </ScrollView>

      {toast ? (
        <View accessibilityRole="alert" style={styles.toast}>
          <CheckIcon />
          <Text style={styles.toastText}>{toast}</Text>
          <Pressable accessibilityLabel="Fechar aviso" onPress={() => setToast('')}>
            <Text style={styles.toastClose}>×</Text>
          </Pressable>
        </View>
      ) : null}

      <Modal
        animationType="slide"
        onRequestClose={() => setRadiusSheet(false)}
        transparent
        visible={radiusSheet}
      >
        <View style={styles.modalRoot}>
          <Pressable
            accessibilityLabel="Fechar seletor de raio"
            onPress={() => setRadiusSheet(false)}
            style={styles.modalBackdrop}
          />
          <View style={styles.sheet}>
            <View style={styles.sheetHandle} />
            <View style={styles.sheetHeader}>
              <View>
                <Text style={styles.sheetTitle}>Raio do Perímetro</Text>
                <Text style={styles.sheetSubtitle}>
                  Selecione a distância ideal para acionar os avisos
                </Text>
              </View>
              <Pressable
                accessibilityLabel="Fechar"
                onPress={() => setRadiusSheet(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeText}>×</Text>
              </Pressable>
            </View>
            <View style={styles.miniMap}>
              <MiniRadar radius={draftRadius} />
              <Text style={styles.mapAddress}>{residence?.address}</Text>
            </View>
            <Text style={styles.distanceLabel}>DISTÂNCIA DO GATILHO</Text>
            <View style={styles.radiusOptions}>
              {radiusOptions.map((option) => (
                <Pressable
                  accessibilityRole="radio"
                  accessibilityState={{ selected: draftRadius === option }}
                  key={option}
                  onPress={() => setDraftRadius(option)}
                  style={[
                    styles.radiusOption,
                    draftRadius === option && styles.radiusOptionSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.radiusOptionText,
                      draftRadius === option && styles.radiusOptionTextSelected,
                    ]}
                  >
                    {option}m
                  </Text>
                </Pressable>
              ))}
            </View>
            <Pressable
              accessibilityRole="button"
              disabled={busy}
              onPress={() => {
                void confirmRadius();
              }}
              style={styles.confirmButton}
            >
              <CheckIcon />
              <Text style={styles.confirmText}>Confirmar Perímetro</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        onRequestClose={() => setSnoozeSheet(false)}
        transparent
        visible={snoozeSheet}
      >
        <View style={styles.modalRoot}>
          <Pressable
            accessibilityLabel="Fechar pausa de lembretes"
            onPress={() => setSnoozeSheet(false)}
            style={styles.modalBackdrop}
          />
          <View style={styles.sheet}>
            <View style={styles.sheetHandle} />
            <View style={styles.snoozeHero}>
              <View style={styles.snoozeIcon}>
                <SnoozeIcon />
                <View style={styles.notificationBadge}>
                  <BellIcon />
                </View>
              </View>
              <Text style={styles.sheetTitle}>Adiar Lembretes Residenciais</Text>
              <Text style={styles.snoozeIntro}>
                Vai dar uma volta rápida ou não vai ao mercado agora? Escolha por quanto tempo
                pausar os avisos de saída:
              </Text>
            </View>
            <View
              accessibilityLabel="Tempo de pausa do lembrete"
              accessibilityRole="radiogroup"
              style={styles.snoozeChoices}
            >
              {snoozeOptions.map((option) => {
                const selected = snoozeChoice === option.id;
                const badge = 'badge' in option ? option.badge : undefined;
                return (
                  <Pressable
                    accessibilityRole="radio"
                    accessibilityState={{ selected }}
                    key={option.id}
                    onPress={() => setSnoozeChoice(option.id)}
                    style={[styles.snoozeOption, selected && styles.snoozeOptionSelected]}
                  >
                    <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
                      {selected ? <View style={styles.radioInner} /> : null}
                    </View>
                    <View style={styles.snoozeOptionCopy}>
                      <View style={styles.snoozeOptionTitleRow}>
                        <Text
                          style={[
                            styles.snoozeOptionTitle,
                            selected && styles.snoozeOptionTitleSelected,
                          ]}
                        >
                          {option.title}
                        </Text>
                        {badge ? (
                          <Text style={styles.popularBadge}>{badge}</Text>
                        ) : (
                          <Text style={styles.optionMark}>
                            {option.id === '1h' ? '◷' : option.id === 'tomorrow' ? '☼' : 'Ⅱ'}
                          </Text>
                        )}
                      </View>
                      <Text style={styles.snoozeOptionDescription}>{option.detail}</Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
            <Pressable
              accessibilityRole="button"
              disabled={busy}
              onPress={() => {
                void chooseSnooze();
              }}
              style={styles.confirmButton}
            >
              <CheckIcon />
              <Text style={styles.confirmText}>Confirmar Soneca</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={() => setSnoozeSheet(false)}
              style={styles.cancelSnooze}
            >
              <Text style={styles.cancelSnoozeText}>Voltar sem pausar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
