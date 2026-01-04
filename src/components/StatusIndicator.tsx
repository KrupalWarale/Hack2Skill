import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../utils/theme';
import { Label } from './Typography';
import { RequestStatus } from '../models/types';

interface StatusIndicatorProps {
  status: RequestStatus | 'error' | 'warning' | 'info' | 'success';
  label?: string;
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  showLabel?: boolean;
}

export const StatusIndicator = ({ 
  status, 
  label, 
  size = 'medium', 
  style,
  showLabel = true 
}: StatusIndicatorProps) => {
  const getStatusColor = () => {
    return theme.colors.status[status] || theme.colors.text.secondary;
  };

  const getStatusLabel = () => {
    if (label) return label;
    
    const statusLabels = {
      created: 'Created',
      forwarded: 'In Transit',
      received: 'Received',
      acknowledged: 'Acknowledged',
      resolved: 'Resolved',
      error: 'Error',
      warning: 'Warning',
      info: 'Info',
      success: 'Success',
    };
    
    return statusLabels[status] || status;
  };

  const getDotSize = () => {
    switch (size) {
      case 'small': return 8;
      case 'large': return 16;
      default: return 12;
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View 
        style={[
          styles.dot, 
          { 
            backgroundColor: getStatusColor(),
            width: getDotSize(),
            height: getDotSize(),
          }
        ]} 
      />
      {showLabel && (
        <Label 
          size={size === 'large' ? 'medium' : 'small'}
          color={theme.colors.text.secondary}
          style={styles.label}
        >
          {getStatusLabel()}
        </Label>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    borderRadius: theme.borderRadius.round,
  },
  label: {
    marginLeft: theme.spacing.s,
  },
});