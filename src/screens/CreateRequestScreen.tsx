import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Modal } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import uuid from 'react-native-uuid';
import { DisasterRequest } from '../models/types';
import { theme } from '../utils/theme';
import {
  Layout,
  Button,
  Card,
  Title,
  Body,
  Badge
} from '../components';
import {
  AlertCircle,
  HeartPulse,
  Utensils,
  LifeBuoy,
  Radio,
  ChevronLeft,
  LogOut,
  MapPin,
  Signal,
  Camera,
  Mic,
  Activity
} from 'lucide-react-native';

const REQUEST_TYPES = [
  {
    id: 'medical',
    label: 'Medical',
    icon: HeartPulse,
    color: theme.colors.secondary,
    bgColor: theme.colors.secondaryLight,
  },
  {
    id: 'supplies',
    label: 'Food & Water', // Renamed to be more specific as per "food" hint
    icon: Utensils,
    color: theme.colors.status.warning,
    bgColor: '#FFF3E0',
  },
  {
    id: 'rescue',
    label: 'Rescue',
    icon: LifeBuoy,
    color: theme.colors.primary,
    bgColor: theme.colors.primaryLight,
  },
  {
    id: 'info',
    label: 'Broadcast',
    icon: Radio,
    color: theme.colors.status.info,
    bgColor: '#E3F2FD',
  }
];

const URGENCY_LEVELS = [
  { id: 'critical', label: 'Critical', color: theme.colors.secondary },
  { id: 'major', label: 'Major', color: theme.colors.status.warning },
  { id: 'moderate', label: 'Moderate', color: theme.colors.status.info },
];

export const CreateRequestScreen = ({ navigation }: any) => {
  const { addRequest, deviceId, setRole } = useAppStore();
  const [selectedType, setSelectedType] = useState('medical');
  const [urgency, setUrgency] = useState('major');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);

  const handleHome = async () => {
    await setRole(null as any);
    navigation.reset({
      index: 0,
      routes: [{ name: 'RoleSelection' }],
    });
  };

  const handleCreate = async () => {
    console.log('handleCreate triggered');
    Alert.alert('DEBUG', 'Button clicked! Triggering agreement...');
    Keyboard.dismiss();

    if (!description.trim()) {
      Alert.alert('Missing Details', 'Please describe the situation.');
      return;
    }
    if (description.trim().length < 5) {
      Alert.alert('Too Short', 'Please add more details.');
      return;
    }

    setShowAgreement(true);
  };

  const confirmBroadcast = async () => {
    setShowAgreement(false);
    setLoading(true);
    try {
      const newRequest: DisasterRequest = {
        id: uuid.v4() as string,
        timestamp: Date.now(),
        senderId: deviceId || 'unknown',
        type: selectedType,
        description: `[${urgency.toUpperCase()}] ${description.trim()}`,
        status: 'created',
        statusHistory: [{ status: 'created', timestamp: Date.now(), updatedBy: deviceId || 'unknown' }]
      };
      await addRequest(newRequest);
      Alert.alert(
        'BROADCAST SUCCESS [DEBUG]',
        'Help request sent to nearby responders. (v2 code)',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to send.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout padding={false} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>

            {/* Immersive Header - Transparent Actions */}
            <View style={styles.actionRow}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.circleBtn}
              >
                <ChevronLeft size={24} color={theme.colors.text.primary} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleHome}
                style={styles.circleBtn}
              >
                <LogOut size={20} color={theme.colors.text.primary} />
              </TouchableOpacity>
            </View>

            {/* Large Page Title */}
            <View style={styles.titleBlock}>
              <Title level="large" style={styles.pageTitle}>Request Help</Title>
              <Body size="medium" style={styles.pageSubtitle}>Emergency Broadcast System</Body>
            </View>

            {/* Location Context Card */}
            <Card variant="filled" style={styles.locationCard} padding="small">
              <View style={styles.locationRow}>
                <View style={styles.locationInfo}>
                  <MapPin size={16} color={theme.colors.primary} />
                  <Body size="small" style={styles.locationText}>Lat: 34.0522, Long: -118.2437</Body>
                </View>
                <View style={styles.signalInfo}>
                  <Signal size={14} color={theme.colors.status.success} />
                  <Body size="small" style={styles.signalText}>Strong Signal</Body>
                </View>
              </View>
            </Card>

            {/* Type Selection */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Title level="small" style={styles.label}>Emergency Type</Title>
              </View>

              <View style={styles.grid}>
                {REQUEST_TYPES.map((type) => {
                  const Icon = type.icon;
                  const isSelected = selectedType === type.id;
                  return (
                    <TouchableOpacity
                      key={type.id}
                      style={[
                        styles.typeCard,
                        isSelected ? {
                          backgroundColor: type.color,
                          borderWidth: 0,
                          ...theme.shadows.medium,
                          shadowColor: type.color // Colored shadow
                        } : {}
                      ]}
                      onPress={() => setSelectedType(type.id)}
                      activeOpacity={0.8}
                    >
                      <Icon size={24} color={isSelected ? 'white' : theme.colors.text.secondary} />
                      <Body size="small" style={StyleSheet.flatten([
                        styles.typeText,
                        isSelected && { color: 'white' }
                      ])}>
                        {type.label}
                      </Body>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Urgency Selector */}
            <View style={styles.section}>
              <Title level="small" style={styles.label}>Urgency Level</Title>
              <View style={styles.urgencyContainer}>
                {URGENCY_LEVELS.map((level) => {
                  const isSelected = urgency === level.id;
                  return (
                    <TouchableOpacity
                      key={level.id}
                      style={[
                        styles.urgencyBtn,
                        isSelected && {
                          backgroundColor: level.color,
                          ...theme.shadows.small,
                          shadowColor: level.color
                        }
                      ]}
                      onPress={() => setUrgency(level.id)}
                      activeOpacity={0.8}
                    >
                      <Body
                        size="small"
                        style={{
                          color: isSelected ? 'white' : theme.colors.text.secondary,
                          fontWeight: isSelected ? '700' : '500'
                        }}
                      >
                        {level.label}
                      </Body>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Input Area - Flexible */}
            <View style={styles.inputSection}>
              <Title level="small" style={styles.label}>Situation Details</Title>
              <Card variant="outlined" style={styles.inputCard} padding="none">
                <TextInput
                  style={styles.input}
                  multiline
                  placeholder="Describe situation, location, # of people..."
                  value={description}
                  onChangeText={setDescription}
                  textAlignVertical="top"
                />

                {/* Media Bar Placeholder */}
                <View style={styles.mediaBar}>
                  <View style={styles.mediaActions}>
                    <TouchableOpacity style={styles.mediaBtn}>
                      <Camera size={20} color={theme.colors.text.secondary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mediaBtn}>
                      <Mic size={20} color={theme.colors.text.secondary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mediaBtn}>
                      <MapPin size={20} color={theme.colors.text.secondary} />
                    </TouchableOpacity>
                  </View>
                  <Body size="small" color={theme.colors.text.tertiary}>
                    {description.length}/500
                  </Body>
                </View>
              </Card>
            </View>

            {/* Actions */}
            <View style={styles.footer}>
              <Button
                title="BROADCAST REQUEST"
                onPress={handleCreate}
                loading={loading}
                variant="danger"
                size="large"
                fullWidth
                icon={<Activity size={20} color="white" />}
                disabled={!description.trim()}
              />
            </View>

            {/* Premium Agreement Modal */}
            <Modal
              visible={showAgreement}
              transparent
              animationType="fade"
              onRequestClose={() => setShowAgreement(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <AlertCircle size={32} color={theme.colors.secondary} />
                    <Title level="medium" style={styles.modalTitle}>CRITICAL WARNING</Title>
                  </View>

                  <Body style={styles.modalMessage}>
                    This is a <Body style={{ fontWeight: 'bold', color: theme.colors.secondary }}>crucial emergency situation</Body>.
                    {"\n\n"}
                    PROVISION OF FALSE INFORMATION is strictly prohibited. Misleading responders may cause delayed help for someone in real need, potentially leading to critical injury or loss of life.
                  </Body>

                  <View style={[styles.locationCard, { marginTop: 16, backgroundColor: theme.colors.backgroundAlt, elevation: 0 }]}>
                    <Body size="small" style={{ fontWeight: 'bold', color: theme.colors.text.secondary }}>AGREEMENT TERMS:</Body>
                    <Body size="small" color={theme.colors.text.tertiary}>• I am in immediate need of assistance</Body>
                    <Body size="small" color={theme.colors.text.tertiary}>• I am providing accurate details</Body>
                  </View>

                  <View style={styles.modalActions}>
                    <Button
                      title="CANCEL"
                      onPress={() => setShowAgreement(false)}
                      variant="ghost"
                      style={{ flex: 1 }}
                    />
                    <Button
                      title="I AGREE"
                      onPress={confirmBroadcast}
                      variant="danger"
                      style={{ flex: 2 }}
                    />
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Layout>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: theme.spacing.m,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.l,
    paddingHorizontal: theme.spacing.xs,
  },
  circleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.small,
  },
  titleBlock: {
    marginBottom: theme.spacing.l,
    paddingHorizontal: theme.spacing.xs,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: '800', // Extra bold for impact
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  pageSubtitle: {
    color: theme.colors.text.secondary,
    fontSize: 16,
  },
  locationCard: {
    marginBottom: theme.spacing.l,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    ...theme.shadows.small,
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  signalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: theme.colors.status.success + '15',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  signalText: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.status.success,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  label: {
    marginBottom: theme.spacing.s,
    color: theme.colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontSize: 12,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  typeCard: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.l,
    // Default subtle border
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  typeText: {
    color: theme.colors.text.primary,
    fontWeight: '600',
    fontSize: 15,
  },
  urgencyContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.backgroundAlt,
    padding: 4,
    borderRadius: theme.borderRadius.l,
  },
  urgencyBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: theme.borderRadius.m,
  },
  inputSection: {
    flex: 1,
    marginBottom: theme.spacing.xl,
  },
  inputCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.l,
    // Soft lift instead of border
    ...theme.shadows.small,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    fontSize: 17,
    lineHeight: 24,
    padding: 16,
    color: theme.colors.text.primary,
  },
  mediaBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 16,
  },
  mediaActions: {
    flexDirection: 'row',
    gap: 20,
  },
  mediaBtn: {
    padding: 8,
    backgroundColor: theme.colors.backgroundAlt,
    borderRadius: theme.borderRadius.round,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: theme.spacing.m,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.m,
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.l,
    width: '100%',
    ...theme.shadows.large,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  modalTitle: {
    marginTop: 8,
    color: theme.colors.secondary,
    fontWeight: '800',
  },
  modalMessage: {
    textAlign: 'center',
    lineHeight: 22,
    color: theme.colors.text.primary,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: theme.spacing.l,
  },
});
