import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TrendingUp, TrendingDown, Clock, Target, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { Signal } from '../lib/supabase';
import { useTheme } from '../contexts/ThemeContext';

interface SignalCardProps {
  signal: Signal;
}

export default function SignalCard({ signal }: SignalCardProps) {
  const { colors, fontSizes } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return colors.success;
      case 'closed':
        return colors.textSecondary;
      case 'pending':
        return colors.warning;
      default:
        return colors.textSecondary;
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const signalTime = new Date(timestamp);
    const diff = now.getTime() - signalTime.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const formatPrice = (price: number) => {
    // Format based on pair type
    if (signal.pair.includes('XAU') || signal.pair.includes('XAG')) {
      return price.toFixed(2);
    }
    return price.toFixed(4);
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    pairContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    pair: {
      fontSize: fontSizes.subtitle,
      fontWeight: 'bold',
      color: colors.text,
      fontFamily: 'Inter-Bold',
    },
    typeLabel: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
    },
    buyLabel: {
      backgroundColor: `${colors.success}20`,
    },
    sellLabel: {
      backgroundColor: `${colors.error}20`,
    },
    typeLabelText: {
      fontSize: fontSizes.small,
      fontFamily: 'Inter-SemiBold',
    },
    buyLabelText: {
      color: colors.success,
    },
    sellLabelText: {
      color: colors.error,
    },
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    statusDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    statusText: {
      fontSize: fontSizes.small,
      fontFamily: 'Inter-SemiBold',
    },
    priceSection: {
      marginBottom: 12,
    },
    priceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    priceItem: {
      flex: 1,
    },
    priceLabel: {
      fontSize: fontSizes.small,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
      marginBottom: 2,
    },
    priceValue: {
      fontSize: fontSizes.medium,
      color: colors.text,
      fontFamily: 'Inter-SemiBold',
    },
    levelsSection: {
      gap: 8,
      marginBottom: 12,
    },
    levelItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    levelLabel: {
      fontSize: fontSizes.small,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
      minWidth: 80,
    },
    levelValue: {
      fontSize: fontSizes.small,
      color: colors.text,
      fontFamily: 'Inter-Medium',
      flex: 1,
    },
    pnlSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    pnlLabel: {
      fontSize: fontSizes.medium,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
    },
    pnlValue: {
      fontSize: fontSizes.medium,
      fontFamily: 'Inter-SemiBold',
    },
    profitText: {
      color: colors.success,
    },
    lossText: {
      color: colors.error,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    metaInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    timeText: {
      fontSize: fontSizes.small,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
    },
    separator: {
      fontSize: fontSizes.small,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
    },
    accuracyText: {
      fontSize: fontSizes.small,
      color: colors.success,
      fontFamily: 'Inter-Medium',
    },
    riskReward: {
      fontSize: fontSizes.small,
      color: colors.secondary,
      fontFamily: 'Inter-Medium',
    },
    descriptionSection: {
      marginTop: 12,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    description: {
      fontSize: fontSizes.medium,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
      lineHeight: 20,
    },
  });

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.header}>
        <View style={styles.pairContainer}>
          <Text style={styles.pair}>{signal.pair}</Text>
          <View style={[
            styles.typeLabel,
            signal.type === 'BUY' ? styles.buyLabel : styles.sellLabel
          ]}>
            <Text style={[
              styles.typeLabelText,
              signal.type === 'BUY' ? styles.buyLabelText : styles.sellLabelText
            ]}>
              {signal.type}
            </Text>
          </View>
        </View>
        <View style={styles.statusContainer}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(signal.status) }]} />
          <Text style={[styles.statusText, { color: getStatusColor(signal.status) }]}>
            {signal.status.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.priceSection}>
        <View style={styles.priceRow}>
          <View style={styles.priceItem}>
            <Text style={styles.priceLabel}>Entry Price</Text>
            <Text style={styles.priceValue}>{formatPrice(signal.entry_price)}</Text>
          </View>
          {signal.current_price && (
            <View style={styles.priceItem}>
              <Text style={styles.priceLabel}>Current Price</Text>
              <Text style={styles.priceValue}>{formatPrice(signal.current_price)}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.levelsSection}>
        <View style={styles.levelItem}>
          <Target size={16} color={colors.success} />
          <Text style={styles.levelLabel}>Take Profit</Text>
          <Text style={styles.levelValue}>
            {signal.take_profit_levels.map(level => formatPrice(level)).join(' | ')}
          </Text>
        </View>
        <View style={styles.levelItem}>
          <AlertTriangle size={16} color={colors.error} />
          <Text style={styles.levelLabel}>Stop Loss</Text>
          <Text style={styles.levelValue}>{formatPrice(signal.stop_loss)}</Text>
        </View>
      </View>

      {signal.pnl !== undefined && signal.pnl !== null && (
        <View style={styles.pnlSection}>
          <Text style={styles.pnlLabel}>P&L:</Text>
          <Text style={[
            styles.pnlValue,
            signal.pnl >= 0 ? styles.profitText : styles.lossText
          ]}>
            {signal.pnl >= 0 ? '+' : ''}${signal.pnl.toFixed(2)}
          </Text>
        </View>
      )}

      <View style={styles.footer}>
        <View style={styles.metaInfo}>
          <Clock size={14} color={colors.textSecondary} />
          <Text style={styles.timeText}>{getTimeAgo(signal.timestamp)}</Text>
          <Text style={styles.separator}>•</Text>
          <Text style={styles.accuracyText}>{signal.accuracy}% accuracy</Text>
        </View>
        {signal.risk_reward && (
          <Text style={styles.riskReward}>R:R {signal.risk_reward}</Text>
        )}
      </View>

      {signal.description && (
        <View style={styles.descriptionSection}>
          <Text style={styles.description}>{signal.description}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}