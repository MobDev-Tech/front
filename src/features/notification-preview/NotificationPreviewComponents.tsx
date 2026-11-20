import { View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { colors } from '../../constants/design-tokens';
import { styles } from './notificationPreview.styles';

export function ProductArt({ kind }: { kind: string }) {
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

export function NavigationIcon() {
  return (
    <Svg height="13" viewBox="0 0 24 24" width="13">
      <Path d="m4 4 16 7-7 2-2 7L4 4Z" fill="#7FFC97" />
    </Svg>
  );
}
export function WifiIcon() {
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
export function SignalIcon() {
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
export function BatteryIcon() {
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
export function CalendarIcon() {
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
export function WeatherIcon() {
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
export function BagIcon() {
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
export function PinIcon() {
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
export function RadarIcon() {
  return (
    <Svg height="15" viewBox="0 0 24 24" width="15">
      <Circle cx="12" cy="12" fill="none" r="8" stroke="#3159A8" strokeWidth="2" />
      <Path d="m12 12 5-5" stroke="#3159A8" strokeLinecap="round" strokeWidth="2" />
    </Svg>
  );
}
export function ListIcon() {
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
export function SnoozeIcon() {
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
export function FlashIcon() {
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
export function CameraIcon() {
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
export function FingerprintIcon() {
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
export function CheckCircleIcon() {
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
