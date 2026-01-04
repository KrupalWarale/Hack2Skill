export const theme = {
  colors: {
    primary: '#1565C0', // Professional Blue (Government/Emergency)
    primaryLight: '#E3F2FD',
    primaryDark: '#0D47A1',
    secondary: '#C62828', // Emergency Red
    secondaryLight: '#FFEBEE',
    background: '#FAFAFA', // Neutral Light Grey
    backgroundAlt: '#F5F5F5',
    surface: '#FFFFFF', // Pure White
    surfaceVariant: '#F8F9FA',
    text: {
      primary: '#212121', // High contrast black
      secondary: '#757575', // Medium grey
      tertiary: '#9E9E9E', // Light grey
      inverted: '#FFFFFF',
      disabled: '#BDBDBD',
    },
    status: {
      created: '#D32F2F', // Red (Sent)
      forwarded: '#F57C00', // Orange (In Transit)
      received: '#FBC02D', // Yellow (Accepted/Received)
      acknowledged: '#388E3C', // Green (Acknowledged)
      resolved: '#1976D2', // Blue (Resolved/Fulfilled)
      error: '#D32F2F',
      warning: '#F57C00',
      info: '#1976D2',
      success: '#388E3C',
    },
    border: {
      light: '#E0E0E0',
      medium: '#BDBDBD',
      dark: '#757575',
    },
    overlay: 'rgba(0, 0, 0, 0.5)',
    divider: '#E0E0E0',
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    xs: 2,
    s: 4,
    m: 8,
    l: 12,
    xl: 16,
    round: 50,
  },
  typography: {
    // Material 3 Typography Scale
    displayLarge: { fontSize: 57, fontWeight: '400' as const, lineHeight: 64 },
    displayMedium: { fontSize: 45, fontWeight: '400' as const, lineHeight: 52 },
    displaySmall: { fontSize: 36, fontWeight: '400' as const, lineHeight: 44 },
    headlineLarge: { fontSize: 32, fontWeight: '600' as const, lineHeight: 40 },
    headlineMedium: { fontSize: 28, fontWeight: '600' as const, lineHeight: 36 },
    headlineSmall: { fontSize: 24, fontWeight: '600' as const, lineHeight: 32 },
    titleLarge: { fontSize: 22, fontWeight: '600' as const, lineHeight: 28 },
    titleMedium: { fontSize: 16, fontWeight: '600' as const, lineHeight: 24 },
    titleSmall: { fontSize: 14, fontWeight: '600' as const, lineHeight: 20 },
    bodyLarge: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
    bodyMedium: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
    bodySmall: { fontSize: 12, fontWeight: '400' as const, lineHeight: 16 },
    labelLarge: { fontSize: 14, fontWeight: '500' as const, lineHeight: 20 },
    labelMedium: { fontSize: 12, fontWeight: '500' as const, lineHeight: 16 },
    labelSmall: { fontSize: 11, fontWeight: '500' as const, lineHeight: 16 },
    // Legacy support
    h1: { fontSize: 28, fontWeight: '600' as const, lineHeight: 36 },
    h2: { fontSize: 22, fontWeight: '600' as const, lineHeight: 28 },
    h3: { fontSize: 18, fontWeight: '600' as const, lineHeight: 24 },
    body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
    caption: { fontSize: 12, fontWeight: '400' as const, lineHeight: 16, color: '#757575' },
    button: { fontSize: 14, fontWeight: '500' as const, lineHeight: 20 },
  },
  shadows: {
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.12,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.16,
      shadowRadius: 4,
      elevation: 4,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.20,
      shadowRadius: 8,
      elevation: 8,
    },
  },
  layout: {
    containerPadding: 16,
    sectionSpacing: 24,
    gridGap: 16,
    minTouchTarget: 44,
  },
};
