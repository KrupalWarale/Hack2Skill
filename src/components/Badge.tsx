import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../utils/theme';
import { Label } from './Typography';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium';
  style?: ViewStyle;
}

export const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'medium',
  style 
}: BadgeProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          backgroundColor: theme.colors.status.success,
          color: theme.colors.text.inverted,
        };
      case 'warning':
        return {
          backgroundColor: theme.colors.status.warning,
          color: theme.colors.text.inverted,
        };
      case 'error':
        return {
          backgroundColor: theme.colors.status.error,
          color: theme.colors.text.inverted,
        };
      case 'info':
        return {
          backgroundColor: theme.colors.status.info,
          color: theme.colors.text.inverted,
        };
      default:
        return {
          backgroundColor: theme.colors.text.tertiary,
          color: theme.colors.text.inverted,
        };
    }
  };

  const getSizeStyles = () => {
    return size === 'small' 
      ? { paddingHorizontal: theme.spacing.s, paddingVertical: theme.spacing.xs }
      : { paddingHorizontal: theme.spacing.m, paddingVertical: theme.spacing.s };
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <View style={[
      styles.container,
      { backgroundColor: variantStyles.backgroundColor },
      sizeStyles,
      style
    ]}>
      <Label 
        size={size === 'small' ? 'small' : 'medium'}
        color={variantStyles.color}
      >
        {children}
      </Label>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.s,
    alignSelf: 'flex-start',
  },
});