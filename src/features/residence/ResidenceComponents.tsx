import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import { colors } from '../../constants/design-tokens';
import { HomeIcon, ShieldIcon } from './ResidenceIcons';
import { styles } from './residence.styles';

export function MapStreets() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Svg height="100%" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 280" width="100%">
        <Rect fill="#EAEDFF" height="280" width="400" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Rect fill="#FAF8FF" height="12" key={`h${i}`} width="400" y={i * 54 + 13} />
        ))}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <Rect fill="#FAF8FF" height="280" key={`v${i}`} width="12" x={i * 64 + 12} />
        ))}
        <Path d="M0 0 400 280" fill="none" stroke="#DAE2FD" strokeDasharray="8 6" strokeWidth="6" />
        <Rect fill="#DAE2FD" fillOpacity=".18" height="156" rx="16" width="258" x="72" y="60" />
      </Svg>
    </View>
  );
}

export function DiagnosticRow({
  icon,
  title,
  detail,
  status,
  home = false,
}: {
  icon: 'shield' | 'home';
  title: string;
  detail: string;
  status: string;
  home?: boolean;
}) {
  const positive = ['Permitido', 'Em casa', 'Configurada'].includes(status);
  return (
    <View style={styles.diagnosticRow}>
      <View style={styles.diagnosticIcon}>{icon === 'shield' ? <ShieldIcon /> : <HomeIcon />}</View>
      <View style={styles.diagnosticCopy}>
        <Text style={styles.diagnosticRowTitle}>{title}</Text>
        <Text style={styles.diagnosticDetail}>{detail}</Text>
      </View>
      {home ? (
        <View style={[styles.homeStatus, !positive && { backgroundColor: colors.warningSurface }]}>
          <View
            style={[styles.homeStatusDot, !positive && { backgroundColor: colors.warningText }]}
          />
          <Text style={[styles.homeStatusText, !positive && { color: colors.warningText }]}>
            {status}
          </Text>
        </View>
      ) : (
        <View style={styles.allowedStatus}>
          <Text style={[styles.allowedText, !positive && { color: colors.warningText }]}>
            {positive ? '✓' : '!'} {status}
          </Text>
        </View>
      )}
    </View>
  );
}
