import React from 'react';
import { View, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../utils/theme';

interface LayoutProps {
  children: React.ReactNode;
  style?: ViewStyle;
  scrollable?: boolean;
  padding?: boolean;
  backgroundColor?: string;
}

export const Layout = ({ 
  children, 
  style, 
  scrollable = false, 
  padding = true,
  backgroundColor = theme.colors.background 
}: LayoutProps) => {
  const containerStyle = [
    styles.container,
    { backgroundColor },
    style
  ];

  const contentStyle = [
    padding && styles.padding
  ];

  if (scrollable) {
    return (
      <SafeAreaView style={containerStyle}>
        <ScrollView 
          contentContainerStyle={contentStyle}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={containerStyle}>
      <View style={[styles.content, ...contentStyle]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  padding: {
    padding: theme.layout.containerPadding,
  },
});