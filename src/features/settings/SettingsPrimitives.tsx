import type { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

import { colors } from '../../constants/design-tokens';
import { ArrowIcon, BellIcon, PinIcon, SnoozeIcon, TrashIcon } from './SettingsIcons';
import { styles } from './settings.styles';

export function Divider() {
  return <View style={styles.divider} />;
}
export function IconTile({ children }: { children: ReactNode }) {
  return <View style={styles.iconTile}>{children}</View>;
}
export function PermissionRow({
  icon,
  title,
  description,
  status,
}: {
  icon: 'notification' | 'location';
  title: string;
  description: string;
  status: string;
}) {
  const permitted = status === 'Permitido' || status === 'Sempre permitida';
  return (
    <View style={styles.permissionRow}>
      <View style={styles.permissionIcon}>
        {icon === 'notification' ? <BellIcon /> : <PinIcon />}
      </View>
      <View style={styles.rowCopy}>
        <Text style={styles.permissionTitle}>{title}</Text>
        <Text style={styles.rowDescription}>{description}</Text>
      </View>
      <View
        style={[styles.permissionStatus, !permitted && { backgroundColor: colors.warningSurface }]}
      >
        <View style={[styles.smallDot, !permitted && { backgroundColor: colors.warningText }]} />
        <Text style={[styles.permissionStatusText, !permitted && { color: colors.warningText }]}>
          {status}
        </Text>
      </View>
    </View>
  );
}
export function ActionRow({
  icon,
  title,
  description,
  onPress,
}: {
  icon: 'clean' | 'snooze';
  title: string;
  description: string;
  onPress: () => void;
}) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.actionRow}>
      <IconTile>{icon === 'clean' ? <TrashIcon /> : <SnoozeIcon />}</IconTile>
      <View style={styles.rowCopy}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowDescription}>{description}</Text>
      </View>
      <ArrowIcon />
    </Pressable>
  );
}
export function MiniRadar({ radius }: { radius: number }) {
  return (
    <View style={styles.radarWrap}>
      <View style={styles.radarOuter} />
      <View style={styles.radarInner} />
      <View style={styles.radarCenter} />
      <View style={styles.radarLabel}>
        <Text style={styles.radarLabelText}>{radius}m</Text>
      </View>
    </View>
  );
}
