import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, RefreshControl, ScrollView } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { DisasterRequest } from '../models/types';
import {
  Layout,
  Card,
  StatusIndicator,
  EmptyState,
  MetricCard,
  QuickActions,
  StatusOverview,
  ActivityFeed,
  NetworkStatus,
  Grid,
  GridItem,
  Title,
  Body,
  Button,
  Badge
} from '../components';
import { theme } from '../utils/theme';
import {
  LogOut,
  CheckCircle,
  CheckSquare,
  AlertTriangle,
  Clock,
  Shield,
  RefreshCw,
  MessageSquare,
  MapPin
} from 'lucide-react-native';

export const HandlerDashboard = ({ navigation }: any) => {
  const { requests, loadRequests, setRole, updateRequestStatus } = useAppStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadRequests();
  }, []);

  const handleLogout = async () => {
    await setRole(null as any);
    navigation.reset({
      index: 0,
      routes: [{ name: 'RoleSelection' }],
    });
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadRequests();
    setRefreshing(false);
  };

  const handleStatusUpdate = async (id: string, newStatus: any) => {
    await updateRequestStatus(id, newStatus);
  };

  const getRequestStats = () => {
    const total = requests.length;
    const pending = requests.filter(r => ['created', 'forwarded'].includes(r.status)).length;
    const acknowledged = requests.filter(r => r.status === 'acknowledged').length;
    const resolved = requests.filter(r => r.status === 'resolved').length;

    return { total, pending, acknowledged, resolved };
  };

  const getStatusOverviewData = () => {
    const stats = getRequestStats();
    const total = stats.total || 1;

    return [
      {
        label: 'New',
        count: stats.pending,
        percentage: (stats.pending / total) * 100,
        status: 'created',
        color: theme.colors.status.created,
      },
      {
        label: 'Accepted',
        count: stats.acknowledged,
        percentage: (stats.acknowledged / total) * 100,
        status: 'acknowledged',
        color: theme.colors.status.acknowledged,
      },
      {
        label: 'Resolved',
        count: stats.resolved,
        percentage: (stats.resolved / total) * 100,
        status: 'resolved',
        color: theme.colors.status.resolved,
      },
    ];
  };

  const getQuickActions = () => [
    {
      id: 'refresh',
      title: 'Refresh Data',
      description: 'Update requests',
      icon: <RefreshCw color={theme.colors.primary} />,
      onPress: handleRefresh,
      variant: 'primary' as const,
    },
    {
      id: 'broadcast',
      title: 'Broadcast Status',
      description: 'Send update',
      icon: <MessageSquare color={theme.colors.text.primary} />,
      onPress: () => { },
      variant: 'default' as const,
    },
    {
      id: 'location',
      title: 'Share Location',
      description: 'Update position',
      icon: <MapPin color={theme.colors.text.primary} />,
      onPress: () => { },
      variant: 'default' as const,
    },
    {
      id: 'emergency',
      title: 'Emergency Mode',
      description: 'Priority alerts',
      icon: <AlertTriangle color={theme.colors.secondary} />,
      onPress: () => { },
      variant: 'danger' as const,
    },
  ];

  const getActivityFeedData = () => {
    return requests.slice(0, 5).map(request => ({
      id: request.id,
      title: `${request.type.toUpperCase()} Request`,
      description: request.description.substring(0, 80) + '...',
      timestamp: request.timestamp,
      type: 'request' as const,
      status: request.status,
    }));
  };

  const stats = getRequestStats();

  const renderRequestCard = ({ item }: { item: DisasterRequest }) => (
    <Card style={styles.requestCard} variant="elevated" padding="medium">
      <View style={styles.requestHeader}>
        <View style={styles.requestTypeContainer}>
          <View style={[styles.typeIconBox, { backgroundColor: theme.colors.secondaryLight }]}>
            <AlertTriangle
              size={16}
              color={theme.colors.secondary}
            />
          </View>
          <View>
            <Title level="small" color={theme.colors.text.primary}>
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </Title>
            <Body size="small" color={theme.colors.text.tertiary}>
              {new Date(item.timestamp).toLocaleDateString()}
            </Body>
          </View>
        </View>
        <Badge
          variant={item.status === 'acknowledged' ? 'success' : item.status === 'created' ? 'error' : item.status === 'received' ? 'warning' : 'info'}
          size="small"
        >
          {item.status.toUpperCase()}
        </Badge>
      </View>

      <Body
        size="medium"
        color={theme.colors.text.secondary}
        numberOfLines={3}
        style={styles.requestDescription}
      >
        {item.description}
      </Body>

      {item.status !== 'resolved' && item.status !== 'acknowledged' && (
        <View style={styles.actions}>
          {item.status === 'created' ? (
            <Button
              title="Accept"
              onPress={() => handleStatusUpdate(item.id, 'received')}
              variant="outline"
              size="small"
              icon={<CheckSquare size={16} color={theme.colors.status.received} />}
              style={styles.actionButton}
            />
          ) : item.status === 'received' ? (
            <Button
              title="Resolve"
              onPress={() => handleStatusUpdate(item.id, 'resolved')}
              variant="primary"
              size="small"
              icon={<CheckCircle size={16} color={theme.colors.text.inverted} />}
              style={styles.actionButton}
            />
          ) : null}
        </View>
      )}
    </Card>
  );

  const renderEmptyState = () => (
    <EmptyState
      icon={<Shield size={48} color={theme.colors.text.tertiary} />}
      title="No Active Requests"
      description="All emergency requests have been handled. You're doing great work!"
      actionLabel="Refresh"
      onAction={handleRefresh}
    />
  );

  return (
    <Layout padding={false} style={styles.container}>
      {/* Premium Header - Green for Responder */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Title level="large" style={styles.headerTitle}>Responder</Title>
            <Body size="medium" style={styles.headerSubtitle}>Emergency Response Center</Body>
          </View>
          <TouchableOpacity
            onPress={handleLogout}
            style={styles.logoutButton}
          >
            <LogOut size={20} color={theme.colors.surface} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerDecoration}>
          <Shield size={100} color="rgba(255,255,255,0.1)" />
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[theme.colors.status.success]}
            tintColor={theme.colors.status.success}
          />
        }
      >
        {/* Overview Metrics */}
        <View style={styles.metricsContainer}>
          <Grid columns={2}>
            <GridItem>
              <MetricCard
                title="Total Requests"
                value={stats.total}
                icon={<AlertTriangle size={20} color={theme.colors.primary} />}
                variant="info"
              />
            </GridItem>
            <GridItem>
              <MetricCard
                title="Pending"
                value={stats.pending}
                icon={<Clock size={20} color={theme.colors.status.warning} />}
                variant="warning"
              />
            </GridItem>
          </Grid>

          <View style={{ height: 16 }} />

          <Grid columns={2}>
            <GridItem>
              <MetricCard
                title="Acknowledged"
                value={stats.acknowledged}
                icon={<CheckSquare size={20} color={theme.colors.status.acknowledged} />}
                variant="success"
              />
            </GridItem>
            <GridItem>
              <MetricCard
                title="Resolved"
                value={stats.resolved}
                icon={<CheckCircle size={20} color={theme.colors.status.resolved} />}
                variant="info"
              />
            </GridItem>
          </Grid>
        </View>

        {/* Network Status */}
        <View style={styles.section}>
          <NetworkStatus
            isOnline={true}
            connectedPeers={12}
            signalStrength={85}
            meshNodes={8}
            lastSync={Date.now() - 120000}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <QuickActions
            title="Handler Actions"
            actions={getQuickActions()}
            columns={2}
          />
        </View>

        {/* Status Overview */}
        <View style={styles.section}>
          <StatusOverview
            title="Request Status Breakdown"
            totalCount={stats.total}
            statusData={getStatusOverviewData()}
          />
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <ActivityFeed
            items={getActivityFeedData()}
            maxItems={5}
          />
        </View>

        {/* Active Requests */}
        <View style={styles.requestsSection}>
          <Title level="medium" style={styles.sectionTitle}>
            Active Requests
          </Title>

          {requests.length === 0 ? (
            renderEmptyState()
          ) : (
            <FlatList
              data={requests.filter(r => r.status !== 'resolved')}
              renderItem={renderRequestCard}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          )}
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
    backgroundColor: theme.colors.status.success,
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
  metricsContainer: {
    padding: theme.spacing.m,
    gap: theme.spacing.m,
  },
  section: {
    padding: theme.spacing.m,
    paddingTop: 0,
    marginBottom: theme.spacing.s,
  },
  requestsSection: {
    padding: theme.spacing.m,
  },
  sectionTitle: {
    marginBottom: theme.spacing.m,
  },
  requestCard: {
    marginBottom: theme.spacing.m,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.m,
  },
  requestTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeIconBox: {
    padding: 8,
    borderRadius: theme.borderRadius.m,
    marginRight: theme.spacing.s,
  },
  requestDescription: {
    marginBottom: theme.spacing.m,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: theme.spacing.s,
    marginTop: theme.spacing.s,
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
    paddingTop: theme.spacing.m,
  },
  actionButton: {
    flex: 1,
  },
});
