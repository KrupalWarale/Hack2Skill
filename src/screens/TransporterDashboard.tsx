import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Animated, Easing } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import {
  Layout,
  MetricCard,
  NetworkStatus,
  QuickActions,
  ActivityFeed,
  StatusOverview,
  Grid,
  GridItem,
  Title,
  Body,
  Card
} from '../components';
import { theme } from '../utils/theme';
import {
  LogOut,
  Radio,
  Send,
  Upload,
  MapPin,
  Users,
  Zap,
  Navigation,
  MessageCircle,
  Truck
} from 'lucide-react-native';

const PulseIndicator = ({ size, color, interval }: { size: number, color: string, interval: number }) => {
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animValue, {
          toValue: 1,
          duration: interval,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(animValue, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, [interval]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        top: -(size - 12) / 2, // Center relative to 12px dot
        left: -(size - 12) / 2,
        zIndex: -1,
        opacity: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.6, 0], // Fade out
        }),
        transform: [{
          scale: animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1.5], // Expand
          })
        }]
      }}
    />
  );
};

export const TransporterDashboard = ({ navigation }: any) => {
  const { setRole } = useAppStore();
  const [isTransporting, setIsTransporting] = useState(true);
  const [messagesForwarded] = useState(47);
  const [routesCovered] = useState(12);

  const handleLogout = async () => {
    await setRole(null as any);
    navigation.reset({
      index: 0,
      routes: [{ name: 'RoleSelection' }],
    });
  };

  const getQuickActions = () => [
    {
      id: 'toggle_transport',
      title: isTransporting ? 'Stop Transport' : 'Start Transport',
      description: isTransporting ? 'Pause forwarding' : 'Begin forwarding',
      icon: <Radio color={isTransporting ? theme.colors.status.warning : theme.colors.primary} />,
      onPress: () => setIsTransporting(!isTransporting),
      variant: (isTransporting ? 'warning' : 'primary') as 'warning' | 'primary',
    },
    {
      id: 'optimize_route',
      title: 'Optimize Route',
      description: 'Find best path',
      icon: <Navigation color={theme.colors.text.primary} />,
      onPress: () => { },
      variant: 'default' as const,
    },
    {
      id: 'broadcast_status',
      title: 'Broadcast Status',
      description: 'Share location',
      icon: <MapPin color={theme.colors.text.primary} />,
      onPress: () => { },
      variant: 'default' as const,
    },
    {
      id: 'emergency_relay',
      title: 'Emergency Relay',
      description: 'Priority mode',
      icon: <Zap color={theme.colors.secondary} />,
      onPress: () => { },
      variant: 'danger' as const,
    },
  ];

  const getActivityFeedData = () => [
    {
      id: '1',
      title: 'Message Forwarded',
      description: 'Medical emergency request relayed to Handler-7',
      timestamp: Date.now() - 300000,
      type: 'status_update' as const,
      status: 'forwarded',
    },
    {
      id: '2',
      title: 'Route Completed',
      description: 'Successfully covered Zone-A to Zone-B corridor',
      timestamp: Date.now() - 900000,
      type: 'system' as const,
    },
    {
      id: '4',
      title: 'Message Received',
      description: 'Supply request from Sender-23 queued for relay',
      timestamp: Date.now() - 1800000,
      type: 'request' as const,
      status: 'received',
    },
  ];

  const getStatusOverviewData = () => [
    {
      label: 'Queued',
      count: 3,
      percentage: 25,
      status: 'created',
      color: theme.colors.status.created,
    },
    {
      label: 'In Transit',
      count: 5,
      percentage: 42,
      status: 'forwarded',
      color: theme.colors.status.forwarded,
    },
    {
      label: 'Accepted',
      count: 4,
      percentage: 33,
      status: 'received',
      color: theme.colors.status.received,
    },
  ];

  return (
    <Layout padding={false} style={styles.container}>
      {/* Premium Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Title level="large" style={styles.headerTitle}>Transporter</Title>
            <Body size="medium" style={styles.headerSubtitle}>Message Relay Network</Body>
          </View>
          <TouchableOpacity
            onPress={handleLogout}
            style={styles.logoutButton}
          >
            <LogOut size={20} color={theme.colors.surface} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerDecoration}>
          <Truck size={100} color="rgba(255,255,255,0.1)" />
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Status Card */}
        <View style={styles.statusSection}>
          <Card variant="elevated" style={styles.statusCard}>
            <View style={styles.statusHeader}>
              <View style={[styles.statusIcon, {
                backgroundColor: isTransporting ? theme.colors.status.success + '20' : theme.colors.backgroundAlt
              }]}>
                <Radio
                  size={32}
                  color={isTransporting ? theme.colors.status.success : theme.colors.text.tertiary}
                />
              </View>
              <View style={styles.statusContent}>
                <Title level="medium" color={theme.colors.text.primary}>
                  {isTransporting ? 'Transport Active' : 'Transport Paused'}
                </Title>
                <Body size="small" color={theme.colors.text.secondary}>
                  {isTransporting
                    ? 'Relaying messages...'
                    : 'System is standby'
                  }
                </Body>
              </View>
              <View style={[styles.indicatorRaw, { backgroundColor: isTransporting ? theme.colors.status.success : theme.colors.text.disabled }]} />
            </View>
          </Card>
        </View>

        {/* Live Map Visualization */}
        <View style={styles.section}>
          <Card variant="outlined" style={styles.mapCard}>
            <View style={styles.mapHeader}>
              <MapPin size={20} color={theme.colors.primary} />
              <Title level="small" style={{ marginLeft: 8 }}>Live Request Map</Title>
            </View>
            <View style={styles.mapContainer}>
              {/* Dummy Map Background */}
              <View style={styles.mapGrid}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <View key={i} style={styles.mapGridLine} />
                ))}
              </View>

              {/* Random Street Map Pattern */}
              {/* Main Roads */}
              <View style={[styles.mapRouteLine, { top: '0%', left: '30%', height: '100%', width: 4, opacity: 0.2 }]} />
              <View style={[styles.mapRouteLine, { top: '40%', left: '0%', width: '100%', height: 4, opacity: 0.2 }]} />

              {/* Secondary Streets */}
              <View style={[styles.mapRouteLine, { top: '0%', left: '60%', height: '100%', width: 2, opacity: 0.15 }]} />
              <View style={[styles.mapRouteLine, { top: '20%', left: '0%', width: '60%', height: 2, opacity: 0.15 }]} />
              <View style={[styles.mapRouteLine, { top: '70%', left: '30%', width: '70%', height: 2, opacity: 0.15 }]} />

              {/* Random Connectors */}
              <View style={[styles.mapRouteLine, { top: '20%', left: '20%', height: '20%', width: 2, opacity: 0.15 }]} />
              <View style={[styles.mapRouteLine, { top: '50%', left: '50%', height: '30%', width: 2, opacity: 0.15 }]} />
              <View style={[styles.mapRouteLine, { top: '60%', left: '80%', height: '40%', width: 2, opacity: 0.15 }]} />
              <View style={[styles.mapRouteLine, { top: '10%', left: '10%', width: '20%', height: 2, transform: [{ rotate: '45deg' }], opacity: 0.15 }]} />
              <View style={[styles.mapRouteLine, { top: '80%', left: '60%', width: '30%', height: 2, transform: [{ rotate: '-15deg' }], opacity: 0.15 }]} />

              {/* Hardcoded Dummy Requests */}
              {[
                { id: '1', x: '20%', y: '30%', status: 'received', intensity: 'medium' },      // Yellow (Handler Taken)
                { id: '2', x: '50%', y: '60%', status: 'resolved', intensity: 'low' },      // Blue (Handler Fulfilled)
                { id: '3', x: '80%', y: '20%', status: 'acknowledged', intensity: 'high' },  // Green (Sender Acknowledged)
                { id: '4', x: '40%', y: '80%', status: 'created', intensity: 'critical' },       // Red (Default/New)
              ].map((req, index) => {
                const dotColor = (theme.colors.status as any)[req.status] || theme.colors.status.error;

                // Calculate intensity circle size
                let intensitySize = 0;
                let intensityOpacity = 0;

                switch (req.intensity) {
                  case 'critical': intensitySize = 40; intensityOpacity = 0.4; break;
                  case 'high': intensitySize = 30; intensityOpacity = 0.3; break;
                  case 'medium': intensitySize = 24; intensityOpacity = 0.2; break;
                  case 'low': intensitySize = 0; intensityOpacity = 0; break;
                }

                return (
                  <View
                    key={req.id}
                    style={[
                      styles.mapDot,
                      { left: req.x as any, top: req.y as any, backgroundColor: dotColor }
                    ]}
                  >
                    {/* Intensity Circle - Pulsing Animation */}
                    {req.intensity !== 'low' && (
                      <PulseIndicator
                        size={intensitySize}
                        color={theme.colors.status.error}
                        interval={req.intensity === 'critical' ? 1000 : 2000}
                      />
                    )}
                    <View style={[styles.mapDotPulse, { borderColor: dotColor }]} />
                  </View>
                );
              })}
            </View>
            <View style={styles.mapLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: theme.colors.status.created }]} />
                <Body size="small" color={theme.colors.text.secondary}>Sent</Body>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: theme.colors.status.received }]} />
                <Body size="small" color={theme.colors.text.secondary}>Accepted</Body>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: theme.colors.status.resolved }]} />
                <Body size="small" color={theme.colors.text.secondary}>Fulfilled</Body>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: theme.colors.status.acknowledged }]} />
                <Body size="small" color={theme.colors.text.secondary}>Finalized</Body>
              </View>
            </View>
          </Card>
        </View>

        {/* Performance Metrics */}
        <View style={styles.section}>
          <Grid columns={2}>
            <GridItem>
              <MetricCard
                title="Forwarded"
                value={messagesForwarded}
                subtitle="Today"
                icon={<Send size={20} color={theme.colors.primary} />}
                variant="info"
              />
            </GridItem>
            <GridItem>
              <MetricCard
                title="Coverage"
                value={routesCovered}
                subtitle="Zones"
                icon={<MapPin size={20} color={theme.colors.status.success} />}
                variant="success"
              />
            </GridItem>
          </Grid>

          <View style={{ height: 16 }} />

          <Grid columns={2}>
            <GridItem>
              <MetricCard
                title="Data"
                value="2.4 MB"
                subtitle="Transfer"
                icon={<Upload size={20} color={theme.colors.status.info} />}
                variant="info"
              />
            </GridItem>
            <GridItem>
              <MetricCard
                title="Peers"
                value={8}
                subtitle="Connected"
                icon={<Users size={20} color={theme.colors.status.warning} />}
                variant="warning"
              />
            </GridItem>
          </Grid>
        </View>

        {/* Network Status */}
        <View style={styles.section}>
          <NetworkStatus
            isOnline={isTransporting}
            connectedPeers={8}
            signalStrength={92}
            meshNodes={15}
            lastSync={Date.now() - 30000}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <QuickActions
            title="Controls"
            actions={getQuickActions()}
            columns={2}
          />
        </View>

        {/* Message Queue Status */}
        <View style={styles.section}>
          <StatusOverview
            title="Queue"
            totalCount={12}
            statusData={getStatusOverviewData()}
          />
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <ActivityFeed
            items={getActivityFeedData()}
            maxItems={6}
          />
        </View>

        {/* Transport Instructions */}
        <View style={styles.section}>
          <Card variant="outlined" style={styles.instructionsCard}>
            <View style={styles.instructionsHeader}>
              <MessageCircle size={20} color={theme.colors.primary} />
              <Title level="small" style={styles.instructionsTitle}>
                Instructions
              </Title>
            </View>

            <View style={styles.instructionsList}>
              <Body size="small" color={theme.colors.text.secondary} style={styles.instruction}>
                • Move between zones to relay messages
              </Body>
              <Body size="small" color={theme.colors.text.secondary} style={styles.instruction}>
                • Keep transport active while mobile
              </Body>
            </View>
          </Card>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.primary,
    paddingTop: theme.spacing.xl * 1.5,
    paddingBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.m,
    borderBottomLeftRadius: theme.borderRadius.l,
    borderBottomRightRadius: theme.borderRadius.l,
    ...theme.shadows.medium,
    overflow: 'hidden',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  headerTitle: {
    color: theme.colors.surface,
    marginBottom: 2,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
  },
  headerDecoration: {
    position: 'absolute',
    right: -20,
    bottom: -20,
    transform: [{ rotate: '-15deg' }],
    opacity: 0.2,
  },
  logoutButton: {
    padding: theme.spacing.s,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: theme.borderRadius.round,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: theme.spacing.xl,
    paddingTop: theme.spacing.m,
  },
  statusSection: {
    padding: theme.spacing.m,
  },
  statusCard: {
    padding: theme.spacing.m,
    ...theme.shadows.small,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    marginRight: theme.spacing.m,
    padding: theme.spacing.s,
    borderRadius: theme.borderRadius.round,
  },
  statusContent: {
    flex: 1,
  },
  indicatorRaw: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  section: {
    padding: theme.spacing.m,
    paddingTop: 0,
    marginBottom: theme.spacing.s,
  },
  instructionsCard: {
    padding: theme.spacing.m,
  },
  instructionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  instructionsTitle: {
    marginLeft: theme.spacing.s,
  },
  instructionsList: {
    gap: theme.spacing.s,
  },
  instruction: {
    lineHeight: 18,
  },
  mapCard: {
    padding: theme.spacing.m,
    overflow: 'hidden',
  },
  mapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  mapContainer: {
    height: 200,
    backgroundColor: '#DCEDC8', // Light Green (Material Light Green 100)
    borderRadius: theme.borderRadius.m,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#33691E', // Dark Green border
  },
  mapGrid: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-evenly',
    opacity: 0.3,
  },
  mapGridLine: {
    height: 1,
    backgroundColor: '#000000', // Black lines
    width: '100%',
  },
  mapRouteLine: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#000000', // Black route path
    opacity: 0.5,
    zIndex: 1,
  },
  mapDot: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    transform: [{ translateX: -6 }, { translateY: -6 }],
    zIndex: 2,
    ...theme.shadows.small,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  mapDotPulse: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: 10,
    borderWidth: 2,
    opacity: 0.5,
  },
  mapLegend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.m,
    flexWrap: 'wrap',
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
