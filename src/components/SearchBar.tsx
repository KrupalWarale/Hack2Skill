import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../utils/theme';
import { Search, X } from 'lucide-react-native';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onClear?: () => void;
  onSubmit?: (text: string) => void;
  style?: ViewStyle;
  autoFocus?: boolean;
}

export const SearchBar = ({ 
  placeholder = "Search...", 
  value = "",
  onChangeText,
  onClear,
  onSubmit,
  style,
  autoFocus = false
}: SearchBarProps) => {
  const [internalValue, setInternalValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  const currentValue = onChangeText ? value : internalValue;
  const handleChangeText = onChangeText || setInternalValue;

  const handleClear = () => {
    handleChangeText('');
    onClear?.();
  };

  const handleSubmit = () => {
    onSubmit?.(currentValue);
  };

  return (
    <View style={[
      styles.container, 
      isFocused && styles.containerFocused,
      style
    ]}>
      <Search size={20} color={theme.colors.text.tertiary} style={styles.searchIcon} />
      
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text.tertiary}
        value={currentValue}
        onChangeText={handleChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onSubmitEditing={handleSubmit}
        autoFocus={autoFocus}
        returnKeyType="search"
      />
      
      {currentValue.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <X size={20} color={theme.colors.text.tertiary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundAlt,
    borderRadius: theme.borderRadius.m,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    paddingHorizontal: theme.spacing.m,
    height: theme.layout.minTouchTarget,
  },
  containerFocused: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.surface,
  },
  searchIcon: {
    marginRight: theme.spacing.s,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text.primary,
    paddingVertical: 0, // Remove default padding
  },
  clearButton: {
    padding: theme.spacing.xs,
    marginLeft: theme.spacing.s,
  },
});