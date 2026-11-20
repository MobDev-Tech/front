import { useEffect, useMemo } from 'react';
import { Animated, Text, View } from 'react-native';
import Svg, { Circle, G, Path, Rect } from 'react-native-svg';

import { colors } from '../../constants/design-tokens';
import { copy } from './onboarding.constants';
import { styles } from './onboarding.styles';

export function GeofenceHero() {
  const pulse = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { duration: 1500, toValue: 1, useNativeDriver: true }),
        Animated.timing(pulse, { duration: 1500, toValue: 0, useNativeDriver: true }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [pulse]);

  const pulseStyle = {
    opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.2, 0.02] }),
    transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.94, 1.08] }) }],
  };

  return (
    <View style={styles.hero}>
      <View style={styles.halo}>
        <Animated.View style={[styles.haloPulse, pulseStyle]} />
        <View style={styles.haloBackdrop} />
        <View style={styles.illustration}>
          <Svg height="120" viewBox="0 0 160 160" width="120">
            <Circle
              cx="80"
              cy="80"
              r="68"
              stroke={colors.outlineVariant}
              strokeDasharray="4 4"
              strokeWidth="1.5"
              opacity={0.6}
            />
            <Circle
              cx="80"
              cy="80"
              r="50"
              stroke={colors.primaryContainer}
              strokeWidth="2"
              opacity={0.3}
            />
            <Circle cx="80" cy="80" fill={colors.primaryContainer} opacity={0.15} r="32" />
            <Path
              d="M40 120 C60 110 70 95 80 80 C90 65 100 50 120 40"
              fill="none"
              stroke={colors.secondary}
              strokeDasharray="3 5"
              strokeLinecap="round"
              strokeWidth="2.5"
              opacity={0.35}
            />
            <G transform="translate(34 68)">
              <Rect fill={colors.surfaceContainerHigh} height="24" rx="4" width="28" x="2" y="14" />
              <Path d="M0 15L16 3L32 15Z" fill={colors.primary} />
              <Rect fill={colors.onSurfaceVariant} height="14" rx="2" width="10" x="11" y="24" />
              <Circle cx="16" cy="11" fill={colors.surfaceContainerLowest} r="3" />
            </G>
            <G transform="translate(94 64)">
              <Rect fill={colors.surfaceContainer} height="30" rx="6" width="28" x="4" y="14" />
              <Path
                d="M11 14V9C11 5.13 14.13 2 18 2C21.87 2 25 5.13 25 9V14"
                fill="none"
                stroke={colors.primary}
                strokeLinecap="round"
                strokeWidth="3"
              />
              <Circle cx="18" cy="27" fill={colors.primaryContainer} r="7" />
              <Path
                d="M16 27L17.5 28.5L20.5 25.5"
                fill="none"
                stroke={colors.onPrimary}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </G>
            <G transform="translate(71 38)">
              <Path
                d="M9 0C4.03 0 0 4.03 0 9C0 15.75 9 26 9 26C9 26 18 15.75 18 9C18 4.03 13.97 0 9 0Z"
                fill={colors.primary}
              />
              <Circle cx="9" cy="9" fill={colors.surfaceContainerLowest} r="4" />
              <Circle cx="9" cy="9" fill={colors.primary} r="2" />
            </G>
          </Svg>
          <View style={styles.autoBadge}>
            <View style={styles.autoDot} />
            <Text style={styles.autoText}>AUTO</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

type StepCardProps = (typeof copy.steps)[number];

export function StepCard({ label, title, description, icon, tone }: StepCardProps) {
  return (
    <View style={styles.stepCard}>
      <View style={styles.stepIconBox}>
        <StepIcon icon={icon} tone={tone} />
      </View>
      <View style={styles.stepCopy}>
        <Text style={[styles.stepLabel, tone === 'secondary' && styles.secondaryStepLabel]}>
          {label}
        </Text>
        <Text style={styles.stepTitle}>{title}</Text>
        <Text style={styles.stepDescription}>{description}</Text>
      </View>
    </View>
  );
}

function StepIcon({ icon, tone }: Pick<StepCardProps, 'icon' | 'tone'>) {
  const iconColor = tone === 'secondary' ? colors.secondary : colors.primary;

  if (icon === 'notification') {
    return (
      <Svg height="26" viewBox="0 0 26 26" width="26">
        <Path d="M6 17.5V11a7 7 0 0114 0v6.5l2 2H4l2-2Z" fill={iconColor} />
        <Path d="M10 22h6" stroke={iconColor} strokeLinecap="round" strokeWidth="2" />
        <Path
          d="M2 9a9 9 0 010 6M24 9a9 9 0 000 6"
          fill="none"
          stroke={iconColor}
          strokeWidth="2"
        />
      </Svg>
    );
  }

  if (icon === 'location') {
    return (
      <Svg height="26" viewBox="0 0 26 26" width="26">
        <Path
          d="M13 23s7-7.3 7-13a7 7 0 10-14 0c0 5.7 7 13 7 13Z"
          fill="none"
          stroke={iconColor}
          strokeWidth="2"
        />
        <Circle cx="13" cy="10" fill={iconColor} r="2.5" />
        <Path
          d="M3 21h5M18 21h5"
          stroke={iconColor}
          strokeLinecap="round"
          strokeWidth="2"
          opacity={0.45}
        />
      </Svg>
    );
  }

  return (
    <Svg height="26" viewBox="0 0 26 26" width="26">
      <Path d="M4 7h3M4 13h3M4 19h3" stroke={iconColor} strokeLinecap="round" strokeWidth="2" />
      <Path
        d="M10 7h12M10 13h12M10 19h12"
        stroke={iconColor}
        strokeLinecap="round"
        strokeWidth="2"
      />
      <Path
        d="M4.5 6.8l1.2 1.2L8 5.8"
        fill="none"
        stroke={iconColor}
        strokeLinecap="round"
        strokeWidth="1.6"
      />
    </Svg>
  );
}

export function PrivacyCard() {
  return (
    <View style={styles.privacyCard}>
      <View style={styles.privacyIcon}>
        <Svg height="18" viewBox="0 0 24 24" width="18">
          <Path
            d="M12 3l7 3v5c0 4.8-3 8.2-7 10-4-1.8-7-5.2-7-10V6l7-3Z"
            fill={colors.onSurfaceVariant}
          />
          <Path
            d="m8.5 12 2.2 2.2 4.8-5"
            fill="none"
            stroke={colors.surfaceContainerHighest}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </Svg>
      </View>
      <View style={styles.privacyCopy}>
        <Text style={styles.privacyTitle}>Sua privacidade em primeiro lugar</Text>
        <Text style={styles.privacyText}>
          Para configurar a residência e verificar a saída do perímetro, o aplicativo envia o
          endereço e as coordenadas à API Smart List. Você pode usar a lista normalmente sem ativar
          a localização.
        </Text>
      </View>
    </View>
  );
}

export function NearMeIcon() {
  return (
    <Svg height="20" viewBox="0 0 24 24" width="20">
      <Path
        d="m4 4 16 7-7 2-2 7L4 4Z"
        fill="none"
        stroke={colors.onPrimary}
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </Svg>
  );
}
