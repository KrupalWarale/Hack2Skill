import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../utils/theme';
import { Card } from './Card';
import { Title, Body, Label } from './Typography';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    label: string;
    direction: 'up' | 'down' | 'neutral';
  };
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  style?: ViewStyle;
}

export const MetricCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend,
  variant = 'default',
  style 
}: MetricCardProps) => {
  const getVariantColor = () => {
    switch (variant) {
      case 'success': return theme.colors.status.success;
      case 'warning': return theme.colors.status.warning;
      case 'error': return theme.colors.status.error;
      case 'info': return theme.colors.status.info;
      default: return theme.colors.primary;
    }
  };

  const getTrendColor = () => {
    if (!trend) return theme.colors.text.tertiary;
    switch (trend.direction) {
      case 'up': return theme.colors.status.success;
      case 'down': return theme.colors.status.error;
      default: return theme.colors.text.tertiary;
    }
  };

  return (
    <Card style={[styles.container, style]} variant="elevated">
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Label size="medium" color={theme.colors.text.secondary}>
            {title}
          </Label>
          {subtitle && (
            <Body size="small" color={theme.colors.text.tertiary} style={styles.subtitle}>
              {subtitle}
            </Body>
          )}
        </View>
        {icon && (
          <View style={[styles.iconContainer, { backgroundColor: `${getVariantColor()}15` }]}>
            {icon}
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Title 
          level="large" 
          color={getVariantColor()}
          style={styles.value}
        >
          {value}
        </Title>
        
        {trend && (
          <View style={styles.trendContainer}>
            <Label 
              size="small" 
              color={getTrendColor()}
              style={styles.trendValue}
            >
              {trend.direction === 'up' ? '↗' : trend.direction === 'down' ? '↘' : '→'} {trend.value}%
            </Label>
            <Body size="small" color={theme.colors.text.tertiary}>
              {trend.label}
            </Body>
          </View>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.s,
  },
  titleContainer: {
    flex: 1,
  },
  subtitle: {
    marginTop: theme.spacing.xs,
  },
  iconContainer: {
    padding: theme.spacing.s,
    borderRadius: theme.borderRadius.s,
    marginLeft: theme.spacing.s,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  value: {
    flex: 1,
  },
  trendContainer: {
    alignItems: 'flex-end',
  },
  trendValue: {
    marginBottom: theme.spacing.xs,
  },
});