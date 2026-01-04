import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../utils/theme';
import { Card } from './Card';
import { Title, Body } from './Typography';

interface InfoCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  style?: ViewStyle;
}

export const InfoCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  variant = 'default',
  style 
}: InfoCardProps) => {
  const getVariantColor = () => {
    switch (variant) {
      case 'success': return theme.colors.status.success;
      case 'warning': return theme.colors.status.warning;
      case 'error': return theme.colors.status.error;
      case 'info': return theme.colors.status.info;
      default: return theme.colors.primary;
    }
  };

  const getVariantBackground = () => {
    switch (variant) {
      case 'success': return `${theme.colors.status.success}10`;
      case 'warning': return `${theme.colors.status.warning}10`;
      case 'error': return `${theme.colors.status.error}10`;
      case 'info': return `${theme.colors.status.info}10`;
      default: return theme.colors.surface;
    }
  };

  return (
    <Card 
      style={[
        styles.container, 
        { backgroundColor: getVariantBackground() },
        style
      ]}
      padding="small"
    >
      <View style={styles.content}>
        <Body size="small" color={theme.colors.text.secondary} numberOfLines={1}>
          {title}
        </Body>
        <Title 
          level="medium" 
          color={getVariantColor()}
          style={styles.value}
        >
          {value}
        </Title>
        {subtitle && (
          <Body size="small" color={theme.colors.text.tertiary} numberOfLines={1}>
            {subtitle}
          </Body>
        )}
      </View>
      {icon && (
        <View style={styles.iconContainer}>
          {icon}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 60,
  },
  content: {
    flex: 1,
  },
  value: {
    marginVertical: theme.spacing.xs,
  },
  iconContainer: {
    marginLeft: theme.spacing.s,
    opacity: 0.7,
  },
});