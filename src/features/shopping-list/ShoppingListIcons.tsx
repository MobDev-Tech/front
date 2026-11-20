import Svg, { Circle, Path } from 'react-native-svg';

import { colors } from '../../constants/design-tokens';

export function GearIcon({ color }: { color: string }) {
  return (
    <Svg height="24" viewBox="0 0 24 24" width="24">
      <Path
        d="m19.4 13.5 1.6 1.2-1.8 3.1-1.9-.8a7.5 7.5 0 0 1-2.1 1.2L15 20.3h-3.6l-.3-2.1a7.5 7.5 0 0 1-2.1-1.2l-1.9.8-1.8-3.1 1.6-1.2a7.7 7.7 0 0 1 0-2.4L5.3 9.9l1.8-3.1 1.9.8a7.5 7.5 0 0 1 2.1-1.2l.3-2.1H15l.3 2.1a7.5 7.5 0 0 1 2.1 1.2l1.9-.8 1.8 3.1-1.6 1.2a7.7 7.7 0 0 1-.1 2.4Z"
        fill="none"
        stroke={color}
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <Circle cx="13.2" cy="12.3" fill="none" r="2.8" stroke={color} strokeWidth="1.8" />
    </Svg>
  );
}

export function UserIcon() {
  return (
    <Svg height="24" viewBox="0 0 24 24" width="24">
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

export function SnoozeIcon({ color }: { color: string }) {
  return (
    <Svg height="18" viewBox="0 0 24 24" width="18">
      <Circle cx="11" cy="13" fill="none" r="6" stroke={color} strokeWidth="1.7" />
      <Path
        d="M11 10v3l2 1M7 4h4M8 2h2M17 8h4l-4 4h4"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
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

export function MoreIcon() {
  return (
    <Svg height="24" viewBox="0 0 24 24" width="24">
      <Circle cx="12" cy="5" fill={colors.onSurfaceVariant} r="1.5" />
      <Circle cx="12" cy="12" fill={colors.onSurfaceVariant} r="1.5" />
      <Circle cx="12" cy="19" fill={colors.onSurfaceVariant} r="1.5" />
    </Svg>
  );
}

export function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <Svg height="18" viewBox="0 0 24 24" width="18">
      <Path
        d={expanded ? 'm7 14 5-5 5 5' : 'm7 10 5 5 5-5'}
        fill="none"
        stroke={colors.onSurfaceVariant}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </Svg>
  );
}

export function PlusIcon() {
  return (
    <Svg height="28" viewBox="0 0 24 24" width="28">
      <Path
        d="M12 5v14M5 12h14"
        stroke={colors.onPrimary}
        strokeLinecap="round"
        strokeWidth="2.2"
      />
    </Svg>
  );
}
