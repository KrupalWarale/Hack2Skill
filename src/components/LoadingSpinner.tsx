import React from 'react';
import { View, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../utils/theme';
import { Body } from './Typography';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  message?: string;
  style?: ViewStyle;
}

export const LoadingSpinner = ({ 
  size = 'large', 
  color = theme.colors.primary, 
  message,
  style 
}: LoadingSpinnerProps) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
      {message && (
        <Body 
          size="medium" 
          color={theme.colors.text.secondary} 
          textAlign="center"
          style={styles.message}
        >
          {message}
        </Body>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.l,
  },
  message: {
    marginTop: theme.spacing.m,
  },
});