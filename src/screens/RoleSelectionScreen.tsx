import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { Role } from '../models/types';
import { Layout, Card, Title, Body } from '../components';
import { theme } from '../utils/theme';
import { ShieldAlert, Radio, Shield, ChevronRight, Trash2 } from 'lucide-react-native';

export const RoleSelectionScreen = ({ navigation }: any) => {
  const setRole = useAppStore(state => state.setRole);

  const handleSelectRole = async (role: Role) => {
    await setRole(role);
    if (role === 'request_sender') {
      navigation.navigate('SenderDashboard');
    } else if (role === 'request_transporter') {
      navigation.navigate('TransporterDashboard');
    } else {
      navigation.navigate('HandlerDashboard');
    }
  };

  const roles = [
    {
      id: 'request_sender' as Role,
      title: 'I Need Help',
      subtitle: 'Request Sender',
      description: 'Report an incident or request immediate assistance.',
      icon: <ShieldAlert size={32} color={theme.colors.secondary} />,
      iconBg: theme.colors.secondaryLight,
    },
    {
      id: 'request_handler' as Role,
      title: 'I Can Help',
      subtitle: 'Emergency Responder',
      description: 'Respond to emergency requests and coordinate rescue.',
      icon: <Shield size={32} color={theme.colors.status.success} />,
      iconBg: '#E8F5E9', // Light green
    },
    {
      id: 'request_transporter' as Role,
      title: 'Transport Messages',
      subtitle: 'Message Transporter',
      description: 'Carry encrypted messages between disconnected areas.',
      icon: <Radio size={32} color={theme.colors.primary} />,
      iconBg: theme.colors.primaryLight,
    },
  ];

  return (
    <Layout padding={false} style={styles.container}>
      {/* Premium Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Shield size={40} color={theme.colors.surface} />
        </View>
        <Title level="large" style={styles.appTitle}>
          ResQLink
        </Title>
        <Body size="medium" style={styles.appSubtitle}>
          Decentralized Emergency Response
        </Body>
      </View>

      {/* Role Selection Content */}
      <View style={styles.contentContainer}>
        <View style={styles.sectionHeader}>
          <Title level="medium" style={styles.sectionTitle}>
            Who are you?
          </Title>
          <Body size="small" color={theme.colors.text.secondary}>
            Select your role to continue
          </Body>
        </View>

        <View style={styles.rolesList}>
          {roles.map((role) => (
            <TouchableOpacity
              key={role.id}
              activeOpacity={0.7}
              onPress={() => handleSelectRole(role.id)}
            >
              <Card
                style={styles.roleCard}
                variant="elevated"
                padding="medium"
              >
                <View style={styles.roleRow}>
                  {/* Icon */}
                  <View style={[styles.iconBox, { backgroundColor: role.iconBg }]}>
                    {role.icon}
                  </View>

                  {/* Text Content */}
                  <View style={styles.textContainer}>
                    <Title level="small" style={styles.roleTitle}>
                      {role.title}
                    </Title>
                    <Body size="small" color={theme.colors.primary} style={styles.roleSubtitle}>
                      {role.subtitle}
                    </Body>
                    <Body
                      size="small"
                      color={theme.colors.text.secondary}
                      style={styles.roleDescription}
                    >
                      {role.description}
                    </Body>
                  </View>

                  {/* Navigation Arrow */}
                  <ChevronRight size={20} color={theme.colors.text.tertiary} />
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Body size="small" color={theme.colors.text.tertiary} textAlign="center">
          Tap a role to get started
        </Body>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.primary,
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.l,
    alignItems: 'center',
    borderBottomLeftRadius: theme.borderRadius.xl,
    borderBottomRightRadius: theme.borderRadius.xl,
    ...theme.shadows.medium,
    zIndex: 1,
  },
  logoContainer: {
    marginBottom: theme.spacing.m,
    padding: theme.spacing.s,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: theme.borderRadius.round,
  },
  appTitle: {
    color: theme.colors.surface,
    marginBottom: theme.spacing.xs,
    fontSize: 32, // Larger custom size for branding
  },
  appSubtitle: {
    color: 'rgba(255,255,255,0.8)',
  },
  contentContainer: {
    flex: 1,
    padding: theme.spacing.m,
    marginTop: theme.spacing.m,
  },
  sectionHeader: {
    marginBottom: theme.spacing.l,
    paddingHorizontal: theme.spacing.s,
  },
  sectionTitle: {
    marginBottom: theme.spacing.xs,
  },
  rolesList: {
    gap: theme.spacing.m,
  },
  roleCard: {
    borderWidth: 1,
    borderColor: 'transparent',
  },
  roleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: theme.borderRadius.l,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.m,
  },
  textContainer: {
    flex: 1,
    marginRight: theme.spacing.s,
  },
  roleTitle: {
    marginBottom: 2,
  },
  roleSubtitle: {
    marginBottom: 4,
    fontWeight: '600',
  },
  roleDescription: {
    lineHeight: 18,
  },
  footer: {
    padding: theme.spacing.l,
    alignItems: 'center',
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: theme.colors.secondaryLight,
    borderRadius: theme.borderRadius.m,
  },
});
