import React from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, ViewStyle } from 'react-native';
import { theme } from '../utils/theme';
import { Label } from './Typography';

interface FilterChip {
  id: string;
  label: string;
  count?: number;
  selected?: boolean;
}

interface FilterChipsProps {
  chips: FilterChip[];
  onChipPress: (chipId: string) => void;
  style?: ViewStyle;
  scrollable?: boolean;
}

export const FilterChips = ({ 
  chips, 
  onChipPress, 
  style,
  scrollable = true 
}: FilterChipsProps) => {
  const renderChip = (chip: FilterChip) => (
    <TouchableOpacity
      key={chip.id}
      style={[
        styles.chip,
        chip.selected && styles.chipSelected
      ]}
      onPress={() => onChipPress(chip.id)}
      activeOpacity={0.7}
    >
      <Label 
        size="medium"
        color={chip.selected ? theme.colors.text.inverted : theme.colors.text.primary}
      >
        {chip.label}
        {chip.count !== undefined && ` (${chip.count})`}
      </Label>
    </TouchableOpacity>
  );

  const content = (
    <View style={[styles.container, style]}>
      {chips.map(renderChip)}
    </View>
  );

  if (scrollable) {
    return (
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        style={style}
      >
        {chips.map(renderChip)}
      </ScrollView>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.s,
  },
  scrollContainer: {
    paddingHorizontal: theme.spacing.m,
    gap: theme.spacing.s,
  },
  chip: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.backgroundAlt,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  chipSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
});