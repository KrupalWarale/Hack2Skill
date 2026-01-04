import React from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { theme } from '../utils/theme';
import { Title, Body } from './Typography';
import { Button } from './Button';
import { X } from 'lucide-react-native';

interface ActionSheetOption {
  label: string;
  onPress: () => void;
  variant?: 'default' | 'destructive';
  icon?: React.ReactNode;
}

interface ActionSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  options: ActionSheetOption[];
}

const { height: screenHeight } = Dimensions.get('window');

export const ActionSheet = ({ 
  visible, 
  onClose, 
  title, 
  description, 
  options 
}: ActionSheetProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1} 
          onPress={onClose} 
        />
        <View style={styles.container}>
          <View style={styles.header}>
            {title && (
              <Title level="medium" style={styles.title}>
                {title}
              </Title>
            )}
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color={theme.colors.text.secondary} />
            </TouchableOpacity>
          </View>
          
          {description && (
            <Body size="medium" color={theme.colors.text.secondary} style={styles.description}>
              {description}
            </Body>
          )}
          
          <View style={styles.options}>
            {options.map((option, index) => (
              <Button
                key={index}
                title={option.label}
                onPress={() => {
                  option.onPress();
                  onClose();
                }}
                variant={option.variant === 'destructive' ? 'danger' : 'outline'}
                icon={option.icon}
                style={styles.option}
              />
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.overlay,
  },
  container: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.borderRadius.l,
    borderTopRightRadius: theme.borderRadius.l,
    maxHeight: screenHeight * 0.7,
    paddingBottom: theme.spacing.l,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  title: {
    flex: 1,
  },
  closeButton: {
    padding: theme.spacing.s,
    marginRight: -theme.spacing.s,
  },
  description: {
    padding: theme.spacing.m,
    paddingTop: 0,
  },
  options: {
    padding: theme.spacing.m,
    gap: theme.spacing.s,
  },
  option: {
    marginBottom: 0,
  },
});