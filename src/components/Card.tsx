import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../utils/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export const Card = ({ 
  children, 
  style, 
  variant = 'elevated',
  padding = 'medium'
}: CardProps) => {
  
  const getPaddingStyle = () => {
    switch (padding) {
      case 'none': return {};
      case 'small': return { padding: theme.spacing.s };
      case 'large': return { padding: theme.spacing.l };
      default: return { padding: theme.spacing.m };
    }
  };

  const getVariantStyle = () => {
    switch (variant) {
      case 'outlined':
        return {
          backgroundColor: theme.colors.surface,
          borderWidth: 1,
          borderColor: theme.colors.border.light,
        };
      case 'filled':
        return {
          backgroundColor: theme.colors.surfaceVariant,
        };
      default: // elevated
        return {
          backgroundColor: theme.colors.surface,
          ...theme.shadows.small,
        };
    }
  };

  return (
    <View style={[
      styles.container, 
      getVariantStyle(),
      getPaddingStyle(),
      style
    ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.m,
  },
});
