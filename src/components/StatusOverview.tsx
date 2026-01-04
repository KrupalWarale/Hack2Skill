import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../utils/theme';
import { Card } from './Card';
import { Title, Body } from './Typography';
import { ProgressBar } from './ProgressBar';
import { StatusIndicator } from './StatusIndicator';

interface StatusData {
  label: string;
  count: number;
  percentage: number;
  status: string;
  color: string;
}

interface StatusOverviewProps {
  title: string;
  totalCount: number;
  statusData: StatusData[];
  showProgress?: boolean;
  style?: ViewStyle;
}

export const StatusOverview = ({ 
  title, 
  totalCount, 
  statusData, 
  showProgress = true,
  style 
}: StatusOverviewProps) => {
  return (
    <Card style={[styles.container, style]} variant="elevated">
      <View style={styles.header}>
        <Title level="medium">{title}</Title>
        <Body size="large" color={theme.colors.primary} style={styles.totalCount}>
          {totalCount}
        </Body>
      </View>
      
      <View style={styles.statusList}>
        {statusData.map((item, index) => (
          <View key={index} style={styles.statusItem}>
            <View style={styles.statusInfo}>
              <StatusIndicator 
                status={item.status as any} 
                label={item.label}
                size="small"
              />
              <Body size="medium" color={theme.colors.text.primary} style={styles.statusCount}>
                {item.count}
              </Body>
            </View>
            
            {showProgress && (
              <ProgressBar
                progress={item.percentage}
                color={item.color}
                height={6}
                showPercentage={false}
                style={styles.progressBar}
              />
            )}
          </View>
        ))}
      </View>
      
      {totalCount === 0 && (
        <View style={styles.emptyState}>
          <Body size="medium" color={theme.colors.text.secondary} textAlign="center">
            No data available
          </Body>
        </View>
      )}
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
  totalCount: {
    fontWeight: '600',
  },
  statusList: {
    gap: theme.spacing.m,
  },
  statusItem: {
    gap: theme.spacing.s,
  },
  statusInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusCount: {
    fontWeight: '500',
  },
  progressBar: {
    marginTop: theme.spacing.xs,
  },
  emptyState: {
    paddingVertical: theme.spacing.l,
  },
});