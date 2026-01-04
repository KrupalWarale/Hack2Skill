import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { theme } from '../utils/theme';

type TypographyVariant = 
  | 'displayLarge' | 'displayMedium' | 'displaySmall'
  | 'headlineLarge' | 'headlineMedium' | 'headlineSmall'
  | 'titleLarge' | 'titleMedium' | 'titleSmall'
  | 'bodyLarge' | 'bodyMedium' | 'bodySmall'
  | 'labelLarge' | 'labelMedium' | 'labelSmall';

interface TypographyProps {
  variant: TypographyVariant;
  children: React.ReactNode;
  color?: string;
  style?: TextStyle;
  numberOfLines?: number;
  textAlign?: 'left' | 'center' | 'right';
}

export const Typography = ({ 
  variant, 
  children, 
  color = theme.colors.text.primary,
  style,
  numberOfLines,
  textAlign = 'left'
}: TypographyProps) => {
  return (
    <Text 
      style={[
        theme.typography[variant],
        { color, textAlign },
        style
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
};

// Convenience components for common use cases
export const Headline = ({ children, level = 'medium', ...props }: { 
  children: React.ReactNode; 
  level?: 'large' | 'medium' | 'small';
} & Omit<TypographyProps, 'variant' | 'children'>) => (
  <Typography variant={`headline${level.charAt(0).toUpperCase() + level.slice(1)}` as TypographyVariant} {...props}>
    {children}
  </Typography>
);

export const Title = ({ children, level = 'medium', ...props }: { 
  children: React.ReactNode; 
  level?: 'large' | 'medium' | 'small';
} & Omit<TypographyProps, 'variant' | 'children'>) => (
  <Typography variant={`title${level.charAt(0).toUpperCase() + level.slice(1)}` as TypographyVariant} {...props}>
    {children}
  </Typography>
);

export const Body = ({ children, size = 'medium', ...props }: { 
  children: React.ReactNode; 
  size?: 'large' | 'medium' | 'small';
} & Omit<TypographyProps, 'variant' | 'children'>) => (
  <Typography variant={`body${size.charAt(0).toUpperCase() + size.slice(1)}` as TypographyVariant} {...props}>
    {children}
  </Typography>
);

export const Label = ({ children, size = 'medium', ...props }: { 
  children: React.ReactNode; 
  size?: 'large' | 'medium' | 'small';
} & Omit<TypographyProps, 'variant' | 'children'>) => (
  <Typography variant={`label${size.charAt(0).toUpperCase() + size.slice(1)}` as TypographyVariant} {...props}>
    {children}
  </Typography>
);