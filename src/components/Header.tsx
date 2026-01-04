import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../utils/theme';
import { ArrowLeft } from 'lucide-react-native';
import { Title, Body } from './Typography';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  variant?: 'default' | 'prominent';
}

export const Header = ({ 
  title, 
  subtitle, 
  onBack, 
  rightAction,
  variant = 'default'
}: HeaderProps) => {
  return (
    <View style={[
      styles.container,
      variant === 'prominent' && styles.prominent
    ]}>
      <View style={styles.leftContainer}>
        {onBack && (
          <TouchableOpacity 
            onPress={onBack} 
            style={styles.backButton}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <ArrowLeft size={24} color={theme.colors.text.primary} />
          </TouchableOpacity>
        )}
        <View style={styles.titleContainer}>
          <Title 
            level={variant === 'prominent' ? 'large' : 'medium'}
            numberOfLines={1}
          >
            {title}
          </Title>
          {subtitle && (
            <Body 
              size="small" 
              color={theme.colors.text.secondary}
              numberOfLines={1}
              style={styles.subtitle}
            >
              {subtitle}
            </Body>
          )}
        </View>
      </View>
      {rightAction && (
        <View style={styles.rightContainer}>
          {rightAction}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.m,
    backgroundColor: theme.colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
    minHeight: 56,
  },
  prominent: {
    paddingVertical: theme.spacing.l,
    minHeight: 72,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: theme.spacing.m,
    padding: theme.spacing.xs,
  },
  titleContainer: {
    flex: 1,
  },
  subtitle: {
    marginTop: theme.spacing.xs,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: theme.spacing.m,
  },
});
