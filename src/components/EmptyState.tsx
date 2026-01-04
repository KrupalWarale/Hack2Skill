import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../utils/theme';
import { Title, Body } from './Typography';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  style?: ViewStyle;
}

export const EmptyState = ({ 
  icon, 
  title, 
  description, 
  actionLabel, 
  onAction, 
  style 
}: EmptyStateProps) => {
  return (
    <View style={[styles.container, style]}>
      {icon && (
        <View style={styles.iconContainer}>
          {icon}
        </View>
      )}
      
      <Title level="medium" textAlign="center" style={styles.title}>
        {title}
      </Title>
      
      {description && (
        <Body 
          size="medium" 
          color={theme.colors.text.secondary} 
          textAlign="center"
          style={styles.description}
        >
          {description}
        </Body>
      )}
      
      {actionLabel && onAction && (
        <Button
          title={actionLabel}
          onPress={onAction}
          variant="outline"
          style={styles.action}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  iconContainer: {
    marginBottom: theme.spacing.l,
    opacity: 0.6,
  },
  title: {
    marginBottom: theme.spacing.s,
  },
  description: {
    marginBottom: theme.spacing.l,
    lineHeight: 20,
  },
  action: {
    minWidth: 120,
  },
});