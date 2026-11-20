import Svg, { Circle, Path } from 'react-native-svg';

import { colors } from '../../constants/design-tokens';

export function SaveIcon() {
  return (
    <Svg height="18" viewBox="0 0 24 24" width="18">
      <Path
        d="M5 4h12l3 3v13H4V4h1Zm2 0v6h9V4M8 20v-7h8v7"
        fill="none"
        stroke={colors.onPrimary}
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <Circle cx="10" cy="16" fill={colors.onPrimary} r=".7" />
    </Svg>
  );
}

export function UserIcon() {
  return (
    <Svg height="18" viewBox="0 0 24 24" width="18">
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

export function CategoryIcon({ category }: { category: string }) {
  const common = {
    fill: 'none',
    stroke: colors.primary,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeWidth: 1.7,
  };

  switch (category) {
    case 'Padaria':
      return (
        <Svg height="14" viewBox="0 0 24 24" width="14">
          <Path
            d="M4 10h16v9H4zM4 10c0-3 2-5 4-5 1.5 0 2.5 1 4 1s2.5-1 4-1c2 0 4 2 4 5M8 13v3m4-3v3m4-3v3"
            {...common}
          />
        </Svg>
      );
    case 'Farmácia':
      return (
        <Svg height="14" viewBox="0 0 24 24" width="14">
          <Path d="M12 5v14M5 12h14" {...common} strokeWidth={2.5} />
        </Svg>
      );
    case 'Mercado':
      return (
        <Svg height="14" viewBox="0 0 24 24" width="14">
          <Path d="M4 9h16l-1.5 11h-13L4 9Zm3 0 2-5m8 5-2-5M8 12v5m4-5v5m4-5v5" {...common} />
        </Svg>
      );
    case 'Limpeza':
      return (
        <Svg height="14" viewBox="0 0 24 24" width="14">
          <Path d="M8 4h8v4l2 2v10H6V10l2-2V4Zm0 4h8m-4 3v5m-2-2 2 2 2-2" {...common} />
        </Svg>
      );
    case 'Papelaria':
      return (
        <Svg height="14" viewBox="0 0 24 24" width="14">
          <Path d="m5 17 10-10 4 4L9 21H5v-4Zm8-8 4 4M4 5h7M4 9h4" {...common} />
        </Svg>
      );
    default:
      return (
        <Svg height="14" viewBox="0 0 24 24" width="14">
          <Path
            d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"
            {...common}
          />
          <Path d="M12 7c-2 2-2 5 0 7m0-4c1-1 2-1 3-1" {...common} />
        </Svg>
      );
  }
}
