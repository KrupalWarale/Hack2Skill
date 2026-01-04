import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../utils/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium',
  loading = false, 
  disabled = false,
  style,
  textStyle,
  icon,
  fullWidth = false
}: ButtonProps) => {
  
  const getBackgroundColor = () => {
    if (disabled) return theme.colors.text.disabled;
    switch (variant) {
      case 'primary': return theme.colors.primary;
      case 'secondary': return theme.colors.surfaceVariant;
      case 'danger': return theme.colors.secondary;
      case 'outline': 
      case 'ghost': 
        return 'transparent';
      default: return theme.colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return theme.colors.text.tertiary;
    switch (variant) {
      case 'primary': 
      case 'danger': 
        return theme.colors.text.inverted;
      case 'secondary': return theme.colors.text.primary;
      case 'outline': 
      case 'ghost': 
        return theme.colors.primary;
      default: return theme.colors.text.inverted;
    }
  };

  const getBorderStyle = () => {
    if (variant === 'outline') {
      return {
        borderWidth: 1,
        borderColor: disabled ? theme.colors.border.light : theme.colors.primary,
      };
    }
    return {};
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: theme.spacing.s,
          paddingHorizontal: theme.spacing.m,
          minHeight: 36,
        };
      case 'large':
        return {
          paddingVertical: theme.spacing.m,
          paddingHorizontal: theme.spacing.l,
          minHeight: 52,
        };
      default:
        return {
          paddingVertical: theme.spacing.m - 2,
          paddingHorizontal: theme.spacing.l,
          minHeight: theme.layout.minTouchTarget,
        };
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { 
          backgroundColor: getBackgroundColor(),
          width: fullWidth ? '100%' : undefined,
        },
        getBorderStyle(),
        getSizeStyles(),
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
      ) : (
        <>
          {icon}
          <Text style={[
            styles.text, 
            { 
              color: getTextColor(), 
              marginLeft: icon ? theme.spacing.s : 0,
              fontSize: size === 'small' ? 12 : size === 'large' ? 16 : 14,
            },
            textStyle
          ]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.m,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...theme.typography.labelLarge,
    textAlign: 'center',
    fontWeight: '500',
  },
});
