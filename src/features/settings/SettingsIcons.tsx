import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { colors } from '../../constants/design-tokens';

export function UserIcon() {
  return (
    <Svg height="19" viewBox="0 0 24 24" width="19">
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
export function SettingsIcon() {
  return (
    <Svg height="24" viewBox="0 0 24 24" width="24">
      <Path
        d="m19.4 13.5 1.6 1.2-1.8 3.1-1.9-.8a7.5 7.5 0 0 1-2.1 1.2L15 20.3h-3.6l-.3-2.1a7.5 7.5 0 0 1-2.1-1.2l-1.9.8-1.8-3.1 1.6-1.2a7.7 7.7 0 0 1 0-2.4L5.3 9.9l1.8-3.1 1.9.8a7.5 7.5 0 0 1 2.1-1.2l.3-2.1H15l.3 2.1a7.5 7.5 0 0 1 2.1 1.2l1.9-.8 1.8 3.1-1.6 1.2a7.7 7.7 0 0 1-.1 2.4Z"
        fill="none"
        stroke={colors.onSurfaceVariant}
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <Circle
        cx="13.2"
        cy="12.3"
        fill="none"
        r="2.8"
        stroke={colors.onSurfaceVariant}
        strokeWidth="1.8"
      />
    </Svg>
  );
}
export function RadarIcon() {
  return (
    <Svg height="23" viewBox="0 0 24 24" width="23">
      <Circle cx="12" cy="12" fill="none" r="8" stroke={colors.primary} strokeWidth="2" />
      <Circle cx="12" cy="12" fill="none" r="4" stroke={colors.primary} strokeWidth="2" />
      <Path
        d="m12 12 6-6M12 4v2m8 6h-2"
        stroke={colors.primary}
        strokeLinecap="round"
        strokeWidth="2"
      />
    </Svg>
  );
}
export function VibrationIcon() {
  return (
    <Svg height="22" viewBox="0 0 24 24" width="22">
      <Rect
        fill="none"
        height="12"
        rx="2"
        stroke={colors.onSurfaceVariant}
        strokeWidth="1.8"
        width="9"
        x="7.5"
        y="6"
      />
      <Path
        d="M4 9v6m16-6v6M11 9v6m2-6v6"
        stroke={colors.onSurfaceVariant}
        strokeLinecap="round"
        strokeWidth="1.6"
      />
    </Svg>
  );
}
export function BellIcon() {
  return (
    <Svg height="21" viewBox="0 0 24 24" width="21">
      <Path
        d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4"
        fill="none"
        stroke={colors.primary}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <Path d="M3 5 5 3m16 2-2-2" stroke={colors.primary} strokeLinecap="round" strokeWidth="1.6" />
    </Svg>
  );
}
export function PinIcon() {
  return (
    <Svg height="21" viewBox="0 0 24 24" width="21">
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
export function ShieldIcon() {
  return (
    <Svg height="19" viewBox="0 0 24 24" width="19">
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
export function TrashIcon() {
  return (
    <Svg height="22" viewBox="0 0 24 24" width="22">
      <Path
        d="M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m3 4v6m6-6v6"
        fill="none"
        stroke={colors.error}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </Svg>
  );
}
export function SnoozeIcon() {
  return (
    <Svg height="22" viewBox="0 0 24 24" width="22">
      <Circle
        cx="12"
        cy="13"
        fill="none"
        r="7"
        stroke={colors.onSurfaceVariant}
        strokeWidth="1.8"
      />
      <Path
        d="M12 9v4l3 2M5 4 3 6m16-2 2 2M8 2h8"
        fill="none"
        stroke={colors.onSurfaceVariant}
        strokeLinecap="round"
        strokeWidth="1.7"
      />
    </Svg>
  );
}
export function ChevronIcon() {
  return (
    <Svg height="22" viewBox="0 0 24 24" width="22">
      <Path
        d="m9 5 7 7-7 7"
        fill="none"
        stroke={colors.onSurfaceVariant}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </Svg>
  );
}
export function ArrowIcon() {
  return (
    <Svg height="21" viewBox="0 0 24 24" width="21">
      <Path
        d="M4 12h15m-6-6 6 6-6 6"
        fill="none"
        stroke={colors.onSurfaceVariant}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </Svg>
  );
}
export function TuneIcon() {
  return (
    <Svg height="18" viewBox="0 0 24 24" width="18">
      <Path
        d="M4 7h10m4 0h2M4 17h2m4 0h10M14 4v6M8 14v6"
        fill="none"
        stroke={colors.onSurfaceVariant}
        strokeLinecap="round"
        strokeWidth="1.8"
      />
      <Circle
        cx="16"
        cy="7"
        fill={colors.surface}
        r="2"
        stroke={colors.onSurfaceVariant}
        strokeWidth="1.8"
      />
      <Circle
        cx="8"
        cy="17"
        fill={colors.surface}
        r="2"
        stroke={colors.onSurfaceVariant}
        strokeWidth="1.8"
      />
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
