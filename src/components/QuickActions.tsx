import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { theme } from '../utils/theme';
import { Card } from './Card';
import { Title, Body } from './Typography';

interface QuickAction {
  id: string;
  title: string;
  description?: string;
  icon: React.ReactNode;
  onPress: () => void;
  variant?: 'default' | 'primary' | 'danger' | 'warning';
  disabled?: boolean;
}

interface QuickActionsProps {
  actions: QuickAction[];
  title?: string;
  columns?: number;
  style?: ViewStyle;
}

export const QuickActions = ({ 
  actions, 
  title = "Quick Actions",
  columns = 2,
  style 
}: QuickActionsProps) => {
  const getVariantStyles = (variant: string = 'default', disabled: boolean = false) => {
    if (disabled) {
      return {
        backgroundColor: theme.colors.backgroundAlt,
        borderColor: theme.colors.border.light,
      };
    }

    switch (variant) {
      case 'primary':
        return {
          backgroundColor: `${theme.colors.primary}10`,
          borderColor: `${theme.colors.primary}30`,
        };
      case 'danger':
        return {
          backgroundColor: `${theme.colors.secondary}10`,
          borderColor: `${theme.colors.secondary}30`,
        };
      case 'warning':
        return {
          backgroundColor: `${theme.colors.status.warning}10`,
          borderColor: `${theme.colors.status.warning}30`,
        };
      default:
        return {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border.light,
        };
    }
  };

  const getIconColor = (variant: string = 'default', disabled: boolean = false) => {
    if (disabled) return theme.colors.text.disabled;

    switch (variant) {
      case 'primary': return theme.colors.primary;
      case 'danger': return theme.colors.secondary;
      case 'warning': return theme.colors.status.warning;
      default: return theme.colors.text.primary;
    }
  };

  const renderAction = (action: QuickAction) => {
    const variantStyles = getVariantStyles(action.variant, action.disabled);
    const iconColor = getIconColor(action.variant, action.disabled);

    return (
      <TouchableOpacity
        key={action.id}
        style={[
          styles.actionButton,
          {
            width: `${(100 / columns) - 2}%`,
            backgroundColor: variantStyles.backgroundColor,
            borderColor: variantStyles.borderColor,
          }
        ]}
        onPress={action.onPress}
        disabled={action.disabled}
        activeOpacity={0.7}
      >
        <View style={styles.actionIcon}>
          {React.cloneElement(action.icon as React.ReactElement, { 
            color: iconColor,
            size: 24 
          })}
        </View>
        
        <Title 
          level="small" 
          textAlign="center"
          color={action.disabled ? theme.colors.text.disabled : theme.colors.text.primary}
          numberOfLines={2}
          style={styles.actionTitle}
        >
          {action.title}
        </Title>
        
        {action.description && (
          <Body 
            size="small" 
            textAlign="center"
            color={action.disabled ? theme.colors.text.disabled : theme.colors.text.secondary}
            numberOfLines={2}
            style={styles.actionDescription}
          >
            {action.description}
          </Body>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Card style={[styles.container, style]} variant="elevated">
      <Title level="medium" style={styles.title}>
        {title}
      </Title>
      
      <View style={styles.actionsGrid}>
        {actions.map(renderAction)}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.m,
  },
  title: {
    marginBottom: theme.spacing.m,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: theme.spacing.s,
  },
  actionButton: {
    borderWidth: 1,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  actionIcon: {
    marginBottom: theme.spacing.s,
  },
  actionTitle: {
    marginBottom: theme.spacing.xs,
  },
  actionDescription: {
    lineHeight: 16,
  },
});