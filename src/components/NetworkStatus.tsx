import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../utils/theme';
import { Card } from './Card';
import { Title, Body, Label } from './Typography';
import { Wifi, WifiOff, Radio, Users, Signal } from 'lucide-react-native';

interface NetworkStatusProps {
  isOnline: boolean;
  connectedPeers: number;
  signalStrength: number; // 0-100
  meshNodes: number;
  lastSync?: number;
  style?: ViewStyle;
}

export const NetworkStatus = ({ 
  isOnline, 
  connectedPeers, 
  signalStrength, 
  meshNodes,
  lastSync,
  style 
}: NetworkStatusProps) => {
  const getSignalIcon = () => {
    if (!isOnline) return <WifiOff size={20} color={theme.colors.status.error} />;
    if (signalStrength > 70) return <Wifi size={20} color={theme.colors.status.success} />;
    if (signalStrength > 30) return <Signal size={20} color={theme.colors.status.warning} />;
    return <Signal size={20} color={theme.colors.status.error} />;
  };

  const getStatusColor = () => {
    if (!isOnline) return theme.colors.status.error;
    if (signalStrength > 70) return theme.colors.status.success;
    if (signalStrength > 30) return theme.colors.status.warning;
    return theme.colors.status.error;
  };

  const getStatusText = () => {
    if (!isOnline) return 'Offline';
    if (signalStrength > 70) return 'Excellent';
    if (signalStrength > 30) return 'Good';
    return 'Poor';
  };

  const formatLastSync = () => {
    if (!lastSync) return 'Never';
    const now = Date.now();
    const diff = now - lastSync;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <Card style={[styles.container, style]} variant="elevated">
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Title level="medium">Network Status</Title>
          <View style={styles.statusIndicator}>
            {getSignalIcon()}
            <Label size="medium" color={getStatusColor()} style={styles.statusText}>
              {getStatusText()}
            </Label>
          </View>
        </View>
      </View>
      
      <View style={styles.metrics}>
        <View style={styles.metricRow}>
          <View style={styles.metric}>
            <View style={styles.metricIcon}>
              <Users size={16} color={theme.colors.primary} />
            </View>
            <View style={styles.metricContent}>
              <Body size="large" color={theme.colors.text.primary} style={styles.metricValue}>
                {connectedPeers}
              </Body>
              <Label size="small" color={theme.colors.text.secondary}>
                Connected Peers
              </Label>
            </View>
          </View>
          
          <View style={styles.metric}>
            <View style={styles.metricIcon}>
              <Radio size={16} color={theme.colors.primary} />
            </View>
            <View style={styles.metricContent}>
              <Body size="large" color={theme.colors.text.primary} style={styles.metricValue}>
                {meshNodes}
              </Body>
              <Label size="small" color={theme.colors.text.secondary}>
                Mesh Nodes
              </Label>
            </View>
          </View>
        </View>
        
        <View style={styles.signalContainer}>
          <View style={styles.signalInfo}>
            <Label size="small" color={theme.colors.text.secondary}>
              Signal Strength
            </Label>
            <Label size="small" color={getStatusColor()}>
              {signalStrength}%
            </Label>
          </View>
          <View style={styles.signalBar}>
            <View style={[
              styles.signalFill,
              {
                width: `${signalStrength}%`,
                backgroundColor: getStatusColor(),
              }
            ]} />
          </View>
        </View>
        
        {lastSync && (
          <View style={styles.syncInfo}>
            <Label size="small" color={theme.colors.text.tertiary}>
              Last sync: {formatLastSync()}
            </Label>
          </View>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.m,
  },
  header: {
    marginBottom: theme.spacing.m,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    marginLeft: theme.spacing.xs,
  },
  metrics: {
    gap: theme.spacing.m,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  metricIcon: {
    marginRight: theme.spacing.s,
    padding: theme.spacing.xs,
    backgroundColor: `${theme.colors.primary}15`,
    borderRadius: theme.borderRadius.s,
  },
  metricContent: {
    alignItems: 'flex-start',
  },
  metricValue: {
    fontWeight: '600',
    lineHeight: 20,
  },
  signalContainer: {
    gap: theme.spacing.xs,
  },
  signalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signalBar: {
    height: 6,
    backgroundColor: theme.colors.backgroundAlt,
    borderRadius: 3,
    overflow: 'hidden',
  },
  signalFill: {
    height: '100%',
    borderRadius: 3,
  },
  syncInfo: {
    alignItems: 'center',
    paddingTop: theme.spacing.s,
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
  },
});