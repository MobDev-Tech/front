import { router } from 'expo-router';
import { Animated, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../../constants/design-tokens';
import { DiagnosticRow, MapStreets } from './ResidenceComponents';
import {
  BackIcon,
  CheckIcon,
  EditIcon,
  HomeIcon,
  NavigationIcon,
  PinIcon,
  ShieldIcon,
  TargetIcon,
  UserIcon,
} from './ResidenceIcons';
import { radiusOptions } from './residence.constants';
import { styles } from './residence.styles';
import { useResidenceController } from './useResidenceController';

export default function ResidenceScreen() {
  const {
    address,
    addressEditing,
    complement,
    coordinates,
    diagnostic,
    geofence,
    locationLoading,
    radius,
    ringScale,
    saving,
    saveResidence,
    setAddress,
    setAddressEditing,
    setComplement,
    setRadius,
    toastMessage,
    toastVisible,
    useCurrentLocation,
  } = useResidenceController();

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable
          accessibilityLabel="Voltar"
          accessibilityRole="button"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <BackIcon />
        </Pressable>
        <Text style={styles.headerTitle}>Configuração da Residência</Text>
        <View style={styles.avatar}>
          <UserIcon />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.statusBanner}>
          <View style={styles.locationBadge}>
            <NavigationIcon />
            <View style={styles.onlineDot} />
          </View>
          <View style={styles.statusCopy}>
            <View style={styles.statusTitleLine}>
              <Text style={styles.statusTitle}>
                {diagnostic?.isSystemReady
                  ? 'Monitoramento Geofence Ativo'
                  : 'Monitoramento aguardando configuração'}
              </Text>
              <Text
                style={[
                  styles.onlinePill,
                  !diagnostic?.isSystemReady && {
                    backgroundColor: colors.warningSurface,
                    color: colors.warningText,
                  },
                ]}
              >
                {diagnostic?.isSystemReady ? 'Pronto' : 'Pendente'}
              </Text>
            </View>
            <Text style={styles.statusDescription}>
              {diagnostic?.residenceStatusMessage ??
                'Defina sua residência e permita a localização'}
            </Text>
          </View>
          <View style={styles.statusCheck}>
            <CheckIcon />
          </View>
        </View>

        <View style={styles.mapCard}>
          <View style={styles.map}>
            <MapStreets />
            <Animated.View style={[styles.geofenceRing, { transform: [{ scale: ringScale }] }]}>
              <View style={styles.ringMiddle}>
                <View style={styles.ringCore} />
              </View>
            </Animated.View>
            <View style={styles.homePin}>
              <HomeIcon />
              <View style={styles.pinShadow} />
            </View>
            <View style={styles.mapRadiusBadge}>
              <View style={styles.mapDot} />
              <Text style={styles.mapRadiusText}>Raio: {radius}m • mapa ilustrativo</Text>
            </View>
          </View>
          <View style={styles.addressSection}>
            <View style={styles.addressIcon}>
              <PinIcon />
            </View>
            <View style={styles.addressCopy}>
              <Text style={styles.addressLabel}>ENDEREÇO RESIDENCIAL</Text>
              {addressEditing || !address ? (
                <TextInput
                  accessibilityLabel="Endereço residencial"
                  autoCapitalize="words"
                  onChangeText={setAddress}
                  placeholder="Rua, número, cidade e estado"
                  style={styles.addressInput}
                  value={address}
                />
              ) : (
                <Text style={styles.addressTitle}>{address}</Text>
              )}
              {addressEditing || !address ? (
                <TextInput
                  accessibilityLabel="Complemento do endereço"
                  onChangeText={setComplement}
                  placeholder="Complemento (opcional)"
                  style={styles.addressInput}
                  value={complement}
                />
              ) : complement ? (
                <Text style={styles.addressDescription}>{complement}</Text>
              ) : null}
            </View>
            <Pressable
              accessibilityLabel="Editar endereço"
              accessibilityRole="button"
              onPress={() => setAddressEditing((value) => !value)}
              style={styles.editButton}
            >
              <EditIcon />
            </Pressable>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={useCurrentLocation}
            style={styles.currentLocationButton}
          >
            <TargetIcon spinning={locationLoading} />
            <Text style={styles.currentLocationText}>
              {locationLoading ? 'Localizando...' : 'Usar minha localização atual'}
            </Text>
          </Pressable>
          {coordinates ? (
            <Text style={styles.addressDescription}>
              Centro: {coordinates.latitude.toFixed(5)}, {coordinates.longitude.toFixed(5)}{' '}
              {geofence ? `• ${geofence.insidePerimeter ? 'Dentro' : 'Fora'} do perímetro` : ''}
            </Text>
          ) : (
            <Text style={styles.addressDescription}>
              Use sua localização estando em casa para registrar o centro do perímetro.
            </Text>
          )}
        </View>

        <View style={styles.radiusCard}>
          <View style={styles.radiusTitleRow}>
            <Text style={styles.cardTitle}>Raio de monitoramento</Text>
            <Text style={styles.radiusValue}>{radius} metros</Text>
          </View>
          <Text style={styles.radiusDescription}>
            No Android, o aplicativo pode avisar ao sair deste perímetro se houver itens pendentes e
            as permissões estiverem ativas.
          </Text>
          <View style={styles.radiusOptions}>
            {radiusOptions.map((option) => (
              <Pressable
                accessibilityRole="radio"
                accessibilityState={{ selected: option === radius }}
                key={option}
                onPress={() => setRadius(option)}
                style={[styles.radiusOption, radius === option && styles.radiusOptionSelected]}
              >
                <Text
                  style={[
                    styles.radiusOptionNumber,
                    radius === option && styles.radiusOptionTextSelected,
                  ]}
                >
                  {option}m
                </Text>
                <Text
                  style={[
                    styles.radiusOptionHint,
                    radius === option && styles.radiusOptionHintSelected,
                  ]}
                >
                  {option === 100
                    ? 'Perto'
                    : option === 150
                      ? 'Padrão'
                      : option === 200
                        ? 'Médio'
                        : 'Amplo'}
                </Text>
                {radius === option ? (
                  <View style={styles.radiusSelectedCheck}>
                    <CheckIcon />
                  </View>
                ) : null}
              </Pressable>
            ))}
          </View>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${({ 100: 15, 150: 35, 200: 65, 300: 100 } as Record<number, number>)[radius]}%`,
                },
              ]}
            />
          </View>
        </View>

        <View style={styles.diagnosticCard}>
          <View style={styles.diagnosticHeading}>
            <View style={styles.shield}>
              <ShieldIcon />
            </View>
            <Text style={styles.diagnosticTitle}>Diagnóstico do Sistema</Text>
            <Text
              style={[
                styles.readyPill,
                !diagnostic?.isSystemReady && {
                  backgroundColor: colors.warningSurface,
                  color: colors.warningText,
                },
              ]}
            >
              {diagnostic?.isSystemReady ? 'Pronto' : 'Pendente'}
            </Text>
          </View>
          <DiagnosticRow
            icon="shield"
            title="Permissão de Localização"
            detail="Acesso em segundo plano"
            status={
              diagnostic?.locationPermission === 'SEMPRE_PERMITIDA'
                ? 'Permitido'
                : diagnostic?.locationPermission === 'APENAS_DURANTE_USO'
                  ? 'Durante o uso'
                  : 'Pendente'
            }
          />
          <DiagnosticRow
            icon="home"
            title="Status da Residência"
            detail={diagnostic?.residenceStatusMessage ?? 'Não configurada'}
            status={
              geofence
                ? geofence.insidePerimeter
                  ? 'Em casa'
                  : 'Fora'
                : diagnostic?.isResidenceConfigured
                  ? 'Configurada'
                  : 'Pendente'
            }
            home
          />
          <Text style={styles.diagnosticDetail}>
            Ao salvar, o Android poderá pedir localização em segundo plano e autorização para
            mostrar notificações.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.bottomAction}>
        <Pressable
          accessibilityRole="button"
          disabled={saving}
          onPress={() => {
            void saveResidence();
          }}
          style={({ pressed }) => [styles.saveButton, pressed && styles.pressed]}
        >
          <CheckIcon />
          <Text style={styles.saveButtonText}>
            {saving ? 'Salvando...' : 'Salvar Configuração de Residência'}
          </Text>
        </Pressable>
      </View>
      {toastVisible ? (
        <View accessibilityRole="alert" style={styles.toast}>
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
}
