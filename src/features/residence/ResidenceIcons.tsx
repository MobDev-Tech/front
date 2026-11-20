import Svg, { Circle, Path } from 'react-native-svg';

import { colors } from '../../constants/design-tokens';

export function UserIcon() {
  return (
    <Svg height="20" viewBox="0 0 24 24" width="20">
      <Circle cx="12" cy="8" fill="none" r="3" stroke={colors.onPrimary} strokeWidth="1.8" />
      <Path
        d="M5.5 19c.8-3.1 3-4.7 6.5-4.7s5.7 1.6 6.5 4.7"
        fill="none"
        stroke={colors.onPrimary}
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </Svg>
  );
}
export function BackIcon() {
  return (
    <Svg height="22" viewBox="0 0 24 24" width="22">
      <Path
        d="m15 18-6-6 6-6M9 12h11"
        fill="none"
        stroke={colors.onSurface}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </Svg>
  );
}
export function NavigationIcon() {
  return (
    <Svg height="21" viewBox="0 0 24 24" width="21">
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
export function HomeIcon() {
  return (
    <Svg height="23" viewBox="0 0 24 24" width="23">
      <Path
        d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1v-9Z"
        fill={colors.onPrimary}
        stroke={colors.onPrimary}
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
    </Svg>
  );
}
export function PinIcon() {
  return (
    <Svg height="23" viewBox="0 0 24 24" width="23">
      <Path
        d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"
        fill="none"
        stroke={colors.primary}
        strokeWidth="2"
      />
      <Circle cx="12" cy="10" fill="none" r="2.5" stroke={colors.primary} strokeWidth="2" />
    </Svg>
  );
}
export function EditIcon() {
  return (
    <Svg height="20" viewBox="0 0 24 24" width="20">
      <Path
        d="m4 16.5-.8 4.3 4.3-.8L20 7.5 16.5 4 4 16.5Z"
        fill="none"
        stroke={colors.onSurfaceVariant}
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <Path d="m14.5 6 3.5 3.5" stroke={colors.onSurfaceVariant} strokeWidth="1.8" />
    </Svg>
  );
}
export function TargetIcon({ spinning }: { spinning: boolean }) {
  return (
    <Svg
      height="20"
      style={spinning ? { transform: [{ rotate: '30deg' }] } : undefined}
      viewBox="0 0 24 24"
      width="20"
    >
      <Circle cx="12" cy="12" fill="none" r="8" stroke={colors.primary} strokeWidth="2" />
      <Circle cx="12" cy="12" fill="none" r="3" stroke={colors.primary} strokeWidth="2" />
      <Path d="M12 1v3m0 16v3M1 12h3m16 0h3" stroke={colors.primary} strokeWidth="2" />
    </Svg>
  );
}
export function CheckIcon() {
  return (
    <Svg height="18" viewBox="0 0 24 24" width="18">
      <Path
        d="m5 12 4 4L19 6"
        fill="none"
        stroke={colors.onPrimary}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
    </Svg>
  );
}
export function ShieldIcon() {
  return (
    <Svg height="21" viewBox="0 0 24 24" width="21">
      <Path
        d="M12 3 20 6v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3Z"
        fill="none"
        stroke={colors.primary}
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </Svg>
  );
}
