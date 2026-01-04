import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../utils/theme';

interface GridProps {
  children: React.ReactNode;
  columns?: number;
  gap?: number;
  style?: ViewStyle;
}

interface GridItemProps {
  children: React.ReactNode;
  span?: number;
  style?: ViewStyle;
}

export const Grid = ({ children, columns = 2, gap = theme.layout.gridGap, style }: GridProps) => {
  return (
    <View style={[styles.grid, { gap }, style]}>
      {children}
    </View>
  );
};

export const GridItem = ({ children, span = 1, style }: GridItemProps) => {
  return (
    <View style={[styles.gridItem, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    flex: 1,
    minWidth: 0, // Prevents overflow
  },
});