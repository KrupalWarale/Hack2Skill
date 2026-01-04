import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../utils/theme';
import { RequestStatus } from '../models/types';

interface StatusBadgeProps {
  status: RequestStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getColor = () => {
    return theme.colors.status[status] || theme.colors.text.secondary;
  };

  return (
    <View style={[styles.container, { backgroundColor: getColor() }]}>
      <Text style={styles.text}>{status.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: theme.borderRadius.s,
    alignSelf: 'flex-start',
  },
  text: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
