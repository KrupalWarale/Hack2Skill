import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../utils/theme';
import { Body } from './Typography';

interface ProgressBarProps {
  progress: number; // 0-100
  label?: string;
  showPercentage?: boolean;
  color?: string;
  backgroundColor?: string;
  height?: number;
  style?: ViewStyle;
}

export const ProgressBar = ({ 
  progress, 
  label, 
  showPercentage = true,
  color = theme.colors.primary,
  backgroundColor = theme.colors.backgroundAlt,
  height = 8,
  style 
}: ProgressBarProps) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <View style={[styles.container, style]}>
      {(label || showPercentage) && (
        <View style={styles.labelContainer}>
          {label && (
            <Body size="small" color={theme.colors.text.secondary}>
              {label}
            </Body>
          )}
          {showPercentage && (
            <Body size="small" color={theme.colors.text.secondary}>
              {Math.round(clampedProgress)}%
            </Body>
          )}
        </View>
      )}
      
      <View style={[
        styles.track, 
        { backgroundColor, height, borderRadius: height / 2 }
      ]}>
        <View style={[
          styles.fill,
          {
            width: `${clampedProgress}%`,
            backgroundColor: color,
            height,
            borderRadius: height / 2,
          }
        ]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
  },
  track: {
    overflow: 'hidden',
  },
  fill: {
    transition: 'width 0.3s ease',
  },
});