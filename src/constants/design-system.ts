/**
 * Design System v1.4
 * ==================
 * 主色: #D4A5A5 (Rose)
 * 次色: #B8A9C9 (Lavender)
 * 圓角: 24px
 * 標題字體: 獅尾四季春加糖 (400/500/700)
 * 內文字體: 獅尾四季春 (300/400/500/700)
 * 12px以下: Noto Sans TC
 * Icon: SVG 線條風格，禁止 Emoji
 */

export const COLORS = {
  primary: '#D4A5A5',
  secondary: '#B8A9C9',
  
  // Background
  bgPrimary: '#FFFCFA',
  bgSecondary: '#FDF6F0',
  bgCard: '#FFFFFF',
  
  // Text
  textPrimary: '#3D3535',
  textSecondary: '#6B5B5B',
  textMuted: '#A09090',
  
  // Accent variants
  rose: {
    50: '#FDF6F0',
    100: '#FCF0EA',
    200: '#F5D0C5',
    300: '#E8B4B8',
    400: '#D4A5A5',
    500: '#C9929A',
    600: '#9B7E93',
  },
  lavender: {
    300: '#C9B8D4',
    400: '#B8A9C9',
    500: '#9B7E93',
  },
  
  // Semantic colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
} as const;

export const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '48px',
} as const;

export const BORDER_RADIUS = {
  sm: '8px',
  md: '16px',
  lg: '24px',
  full: '9999px',
} as const;

export const TYPOGRAPHY = {
  heading: {
    fontFamily: "'SweiSpringCJKtc-Sugar', 'Noto Sans TC', sans-serif",
    weights: { normal: 400, medium: 500, bold: 700 },
  },
  body: {
    fontFamily: "'SweiSpringCJKtc', 'Noto Sans TC', sans-serif",
    weights: { light: 300, normal: 400, medium: 500, bold: 700 },
  },
  small: {
    fontFamily: "'Noto Sans TC', sans-serif",
  },
} as const;

export const SHADOWS = {
  sm: '0 2px 8px rgba(212, 165, 165, 0.08)',
  md: '0 4px 24px rgba(212, 165, 165, 0.12)',
  lg: '0 12px 48px rgba(212, 165, 165, 0.2)',
} as const;
