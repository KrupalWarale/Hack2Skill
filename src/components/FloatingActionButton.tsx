import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../utils/theme';

interface FloatingActionButtonProps {
  onPress: () => void;
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  style?: ViewStyle;
  disabled?: boolean;
}

export const FloatingActionButton = ({ 
  onPress, 
  icon, 
  variant = 'primary',
  size = 'medium',
  position = 'bottom-right',
  style,
  disabled = false
}: FloatingActionButtonProps) => {
  const getVariantColor = () => {
    if (disabled) return theme.colors.text.disabled;
    switch (variant) {
      case 'secondary': return theme.colors.text.primary;
      case 'danger': return theme.colors.secondary;
      default: return theme.colors.primary;
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { width: 48, height: 48, borderRadius: 24 };
      case 'large':
        return { width: 64, height: 64, borderRadius: 32 };
      default:
        return { width: 56, height: 56, borderRadius: 28 };
    }
  };

  const getPositionStyles = () => {
    const basePosition = {
      position: 'absolute' as const,
      bottom: theme.spacing.m,
    };

    switch (position) {
      case 'bottom-left':
        return { ...basePosition, left: theme.spacing.m };
      case 'bottom-center':
        return { ...basePosition, alignSelf: 'center' as const };
      default:
        return { ...basePosition, right: theme.spacing.m };
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.fab,
        getSizeStyles(),
        getPositionStyles(),
        {
          backgroundColor: getVariantColor(),
          opacity: disabled ? 0.5 : 1,
        },
        style
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {React.cloneElement(icon as React.ReactElement, {
        color: theme.colors.text.inverted,
        size: size === 'small' ? 20 : size === 'large' ? 28 : 24,
      })}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.medium,
  },
});