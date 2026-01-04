import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { Plus, LogOut, AlertTriangle, Clock, CheckCircle } from 'lucide-react-native';
import { DisasterRequest } from '../models/types';
import {
  Layout,
  Card,
  EmptyState,
  MetricCard,
  Grid,
  GridItem,
  Title,
  Body,
  Button,
  FloatingActionButton,
  Badge
} from '../components';
import { theme } from '../utils/theme';

export const SenderDashboard = ({ navigation }: any) => {
  const { requests, loadRequests, setRole, updateRequestStatus } = useAppStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadRequests();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: any) => {
    await updateRequestStatus(id, newStatus);
  };

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

  const getRequestStats = () => {
    const total = requests.length;
    const pending = requests.filter(r => r.status === 'created').length;
    const accepted = requests.filter(r => r.status === 'received').length;
    const resolved = requests.filter(r => r.status === 'resolved').length;
    const acknowledged = requests.filter(r => r.status === 'acknowledged').length;

    return { total, pending, accepted, resolved, acknowledged };
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
        numberOfLines={2}
        style={styles.requestDescription}
      >
        {item.description}
      </Body>

      <View style={styles.requestFooter}>
        <View style={styles.timeContainer}>
          <Clock size={12} color={theme.colors.text.tertiary} style={{ marginRight: 4 }} />
          <Body size="small" color={theme.colors.text.tertiary}>
            {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Body>
        </View>
        {item.status === 'resolved' && (
          <Button
            title="Acknowledge"
            onPress={() => handleStatusUpdate(item.id, 'acknowledged')}
            variant="secondary"
            size="small"
            style={{ paddingVertical: 4, height: 32 }}
          />
        )}
      </View>
    </Card>
  );

  const renderEmptyState = () => (
    <EmptyState
      icon={<AlertTriangle size={40} color={theme.colors.text.tertiary} />}
      title="No Emergency Requests"
      description="You haven't created any requests yet. Tap + to create one."
      actionLabel="Create Request"
      onAction={() => navigation.navigate('CreateRequest')}
    />
  );

  return (
    <Layout padding={false} style={styles.container}>
      {/* Premium Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Title level="large" style={styles.headerTitle}>My Requests</Title>
            <Body size="medium" style={styles.headerSubtitle}>Sender Dashboard</Body>
          </View>
          <TouchableOpacity
            onPress={handleLogout}
            style={styles.logoutButton}
          >
            <LogOut size={20} color={theme.colors.surface} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Overview */}
      {/* Stats Overview - Premium Layout synced with Responder Dashboard (2x2 Grid) */}
      <View style={styles.statsContainer}>
        <Grid columns={2}>
          <GridItem>
            <MetricCard
              title="New"
              value={stats.pending}
              icon={<Clock size={20} color={theme.colors.status.error} />}
              variant="error"
              style={styles.metricCard}
            />
          </GridItem>
          <GridItem>
            <MetricCard
              title="Accepted"
              value={stats.accepted}
              icon={<Plus size={20} color={theme.colors.status.warning} />}
              variant="warning"
              style={styles.metricCard}
            />
          </GridItem>
        </Grid>

        <View style={{ height: 16 }} />

        <Grid columns={2}>
          <GridItem>
            <MetricCard
              title="Resolved"
              value={stats.resolved}
              icon={<CheckCircle size={20} color={theme.colors.status.info} />}
              variant="info"
              style={styles.metricCard}
            />
          </GridItem>
          <GridItem>
            <MetricCard
              title="Finalized"
              value={stats.acknowledged}
              icon={<CheckCircle size={20} color={theme.colors.status.success} />}
              variant="success"
              style={styles.metricCard}
            />
          </GridItem>
        </Grid>
      </View>

      {/* Requests List */}
      <View style={styles.listContainer}>
        <FlatList
          data={requests}
          renderItem={renderRequestCard}
          keyExtractor={item => item.id}
          contentContainerStyle={[
            styles.listContent,
            requests.length === 0 && styles.emptyListContent
          ]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[theme.colors.secondary]}
              tintColor={theme.colors.secondary}
            />
          }
          ListEmptyComponent={renderEmptyState}
        />
      </View>

      {/* Floating Action Button */}
      <FloatingActionButton
        onPress={() => navigation.navigate('CreateRequest')}
        icon={<Plus color="white" />}
        variant="danger"
        size="large"
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.secondary,
    paddingTop: theme.spacing.xl * 1.5,
    paddingBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.m,
    borderBottomLeftRadius: theme.borderRadius.l,
    borderBottomRightRadius: theme.borderRadius.l,
    ...theme.shadows.medium,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: theme.colors.surface,
    marginBottom: 2,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
  },
  logoutButton: {
    padding: theme.spacing.s,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: theme.borderRadius.round,
  },
  statsContainer: {
    padding: theme.spacing.m,
    marginTop: -theme.spacing.l,
  },
  metricCard: {
    ...theme.shadows.small,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: theme.spacing.m,
    paddingBottom: 80,
  },
  emptyListContent: {
    flexGrow: 1,
  },
  requestCard: {
    marginBottom: theme.spacing.m,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.s,
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
  requestFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.s,
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
