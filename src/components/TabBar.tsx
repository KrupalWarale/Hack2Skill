import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../utils/theme';
import { Label } from './Typography';

interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number;
}

interface TabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabPress: (tabId: string) => void;
  style?: ViewStyle;
  variant?: 'default' | 'pills';
}

export const TabBar = ({ 
  tabs, 
  activeTab, 
  onTabPress, 
  style,
  variant = 'default'
}: TabBarProps) => {
  const renderTab = (tab: TabItem) => {
    const isActive = tab.id === activeTab;
    
    return (
      <TouchableOpacity
        key={tab.id}
        style={[
          styles.tab,
          variant === 'pills' && styles.pillTab,
          isActive && styles.activeTab,
          variant === 'pills' && isActive && styles.activePillTab,
        ]}
        onPress={() => onTabPress(tab.id)}
        activeOpacity={0.7}
      >
        {tab.icon && (
          <View style={styles.tabIcon}>
            {React.cloneElement(tab.icon as React.ReactElement, {
              color: isActive ? theme.colors.primary : theme.colors.text.secondary,
              size: 20,
            })}
          </View>
        )}
        
        <Label 
          size="medium"
          color={isActive ? theme.colors.primary : theme.colors.text.secondary}
          style={[
            styles.tabLabel,
            variant === 'pills' && isActive && { color: theme.colors.text.inverted }
          ]}
        >
          {tab.label}
        </Label>
        
        {tab.badge !== undefined && tab.badge > 0 && (
          <View style={styles.badge}>
            <Label size="small" color={theme.colors.text.inverted}>
              {tab.badge > 99 ? '99+' : tab.badge}
            </Label>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[
      styles.container,
      variant === 'pills' && styles.pillsContainer,
      style
    ]}>
      {tabs.map(renderTab)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  pillsContainer: {
    backgroundColor: theme.colors.backgroundAlt,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.xs,
    borderBottomWidth: 0,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.s,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  pillTab: {
    borderRadius: theme.borderRadius.s,
    borderBottomWidth: 0,
    marginHorizontal: theme.spacing.xs,
  },
  activeTab: {
    borderBottomColor: theme.colors.primary,
  },
  activePillTab: {
    backgroundColor: theme.colors.primary,
    borderBottomColor: 'transparent',
  },
  tabIcon: {
    marginRight: theme.spacing.xs,
  },
  tabLabel: {
    fontWeight: '500',
  },
  badge: {
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.round,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    marginLeft: theme.spacing.xs,
    minWidth: 18,
    alignItems: 'center',
  },
});