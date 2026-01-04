import React from 'react';
import { View, StyleSheet, FlatList, ViewStyle } from 'react-native';
import { theme } from '../utils/theme';
import { Card } from './Card';
import { Title, Body, Label } from './Typography';
import { StatusIndicator } from './StatusIndicator';

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: number;
  type: 'request' | 'status_update' | 'system' | 'alert';
  status?: string;
  icon?: React.ReactNode;
}

interface ActivityFeedProps {
  items: ActivityItem[];
  maxItems?: number;
  showHeader?: boolean;
  style?: ViewStyle;
}

export const ActivityFeed = ({ 
  items, 
  maxItems = 10, 
  showHeader = true,
  style 
}: ActivityFeedProps) => {
  const displayItems = items.slice(0, maxItems);

  const getTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'request': return theme.colors.primary;
      case 'status_update': return theme.colors.status.info;
      case 'alert': return theme.colors.status.error;
      default: return theme.colors.text.tertiary;
    }
  };

  const renderActivityItem = ({ item, index }: { item: ActivityItem; index: number }) => (
    <View style={[styles.activityItem, index === displayItems.length - 1 && styles.lastItem]}>
      <View style={styles.timeline}>
        <View style={[
          styles.timelineDot, 
          { backgroundColor: getTypeColor(item.type) }
        ]} />
        {index < displayItems.length - 1 && <View style={styles.timelineLine} />}
      </View>
      
      <View style={styles.activityContent}>
        <View style={styles.activityHeader}>
          <Title level="small" style={styles.activityTitle}>
            {item.title}
          </Title>
          <Label size="small" color={theme.colors.text.tertiary}>
            {getTimeAgo(item.timestamp)}
          </Label>
        </View>
        
        <Body size="small" color={theme.colors.text.secondary} style={styles.activityDescription}>
          {item.description}
        </Body>
        
        {item.status && (
          <View style={styles.statusContainer}>
            <StatusIndicator status={item.status as any} size="small" />
          </View>
        )}
      </View>
    </View>
  );

  return (
    <Card style={[styles.container, style]} variant="elevated">
      {showHeader && (
        <View style={styles.header}>
          <Title level="medium">Recent Activity</Title>
          <Label size="small" color={theme.colors.text.secondary}>
            Last {displayItems.length} events
          </Label>
        </View>
      )}
      
      <FlatList
        data={displayItems}
        renderItem={renderActivityItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
    paddingBottom: theme.spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  activityItem: {
    flexDirection: 'row',
    marginBottom: theme.spacing.m,
  },
  lastItem: {
    marginBottom: 0,
  },
  timeline: {
    alignItems: 'center',
    marginRight: theme.spacing.m,
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: theme.spacing.xs,
  },
  timelineLine: {
    width: 1,
    flex: 1,
    backgroundColor: theme.colors.divider,
    marginTop: theme.spacing.xs,
  },
  activityContent: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xs,
  },
  activityTitle: {
    flex: 1,
    marginRight: theme.spacing.s,
  },
  activityDescription: {
    lineHeight: 18,
    marginBottom: theme.spacing.xs,
  },
  statusContainer: {
    marginTop: theme.spacing.xs,
  },
});