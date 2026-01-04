import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../utils/theme';

interface DividerProps {
  style?: ViewStyle;
  color?: string;
  thickness?: number;
  orientation?: 'horizontal' | 'vertical';
}

export const Divider = ({ 
  style, 
  color = theme.colors.divider, 
  thickness = 1,
  orientation = 'horizontal'
}: DividerProps) => {
  const dividerStyle = orientation === 'horizontal' 
    ? { height: thickness, backgroundColor: color }
    : { width: thickness, backgroundColor: color };

  return <View style={[dividerStyle, style]} />;
};