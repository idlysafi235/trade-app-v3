import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { TrendingUp, TrendingDown, Activity, Calendar } from 'lucide-react-native';
import { useTheme } from '../../contexts/ThemeContext';
import AssetSwitcher from '../../components/AssetSwitcher';
import TimeframeSwitcher from '../../components/TimeframeSwitcher';

const screenWidth = Dimensions.get('window').width;

export default function AnalysisScreen() {
  const { colors, fontSizes } = useTheme();
  const [selectedAsset, setSelectedAsset] = useState<'XAU/USD' | 'XAG/USD'>('XAU/USD');
  const [timeframe, setTimeframe] = useState('1H');

  const marketData = {
    'XAU/USD': {
      current: 2345.67,
      change: 12.34,
      changePercent: 0.53,
      high: 2356.89,
      low: 2334.12,
      volume: '2.4M',
    },
    'XAG/USD': {
      current: 29.45,
      change: -0.23,
      changePercent: -0.77,
      high: 29.78,
      low: 29.12,
      volume: '1.8M',
    },
  };

  const technicalIndicators = [
    { name: 'RSI (14)', value: '68.4', status: 'overbought', color: colors.error },
    { name: 'MACD', value: '0.0012', status: 'bullish', color: colors.success },
    { name: 'MA (20)', value: '2340.45', status: 'above', color: colors.success },
    { name: 'Bollinger', value: 'Upper', status: 'near upper', color: colors.warning },
  ];

  const economicEvents = [
    {
      id: 1,
      time: '14:30',
      currency: 'USD',
      event: 'Non-Farm Payrolls',
      impact: 'high',
      forecast: '180K',
      previous: '150K',
    },
    {
      id: 2,
      time: '16:00',
      currency: 'USD',
      event: 'Fed Interest Rate Decision',
      impact: 'high',
      forecast: '5.50%',
      previous: '5.50%',
    },
    {
      id: 3,
      time: '22:30',
      currency: 'USD',
      event: 'Gold Inventory Data',
      impact: 'medium',
      forecast: '-',
      previous: '-',
    },
  ];

  const currentData = marketData[selectedAsset];

  // TradingView widget HTML
  const getTradingViewHTML = (symbol: string) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { margin: 0; padding: 0; background: ${colors.background}; }
        #tradingview_widget { width: 100%; height: 100vh; }
      </style>
    </head>
    <body>
      <div id="tradingview_widget"></div>
      <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
      <script type="text/javascript">
        new TradingView.widget({
          "width": "100%",
          "height": "100%",
          "symbol": "OANDA:${symbol.replace('/', '')}",
          "interval": "${timeframe}",
          "timezone": "Etc/UTC",
          "theme": "${colors.background === '#0f0f23' ? 'dark' : 'light'}",
          "style": "1",
          "locale": "en",
          "toolbar_bg": "${colors.surface}",
          "enable_publishing": false,
          "hide_top_toolbar": false,
          "hide_legend": true,
          "save_image": false,
          "container_id": "tradingview_widget"
        });
      </script>
    </body>
    </html>
  `;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    title: {
      fontSize: fontSizes.title + 4,
      fontWeight: 'bold',
      color: colors.text,
      fontFamily: 'Inter-Bold',
    },
    calendarButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    content: {
      flex: 1,
    },
    priceCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      marginHorizontal: 20,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    priceHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    currentPair: {
      fontSize: fontSizes.subtitle,
      fontWeight: 'bold',
      color: colors.text,
      fontFamily: 'Inter-Bold',
    },
    changeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    changeText: {
      fontSize: fontSizes.medium,
      fontFamily: 'Inter-SemiBold',
    },
    profitText: {
      color: colors.success,
    },
    lossText: {
      color: colors.error,
    },
    currentPrice: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.text,
      fontFamily: 'Inter-Bold',
      marginBottom: 16,
    },
    priceDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    priceDetailItem: {
      alignItems: 'center',
    },
    priceDetailLabel: {
      fontSize: fontSizes.small,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
      marginBottom: 4,
    },
    priceDetailValue: {
      fontSize: fontSizes.medium,
      color: colors.text,
      fontFamily: 'Inter-Medium',
    },
    chartContainer: {
      height: 300,
      marginHorizontal: 20,
      marginBottom: 24,
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: colors.surface,
    },
    section: {
      paddingHorizontal: 20,
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: fontSizes.subtitle,
      fontWeight: 'bold',
      color: colors.text,
      fontFamily: 'Inter-Bold',
      marginBottom: 16,
    },
    indicatorsContainer: {
      gap: 12,
    },
    indicatorCard: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    indicatorHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    indicatorName: {
      fontSize: fontSizes.medium,
      color: colors.text,
      fontFamily: 'Inter-Medium',
    },
    indicatorValue: {
      fontSize: fontSizes.medium,
      fontFamily: 'Inter-SemiBold',
    },
    indicatorStatus: {
      fontSize: fontSizes.small,
      fontFamily: 'Inter-Regular',
    },
    eventsContainer: {
      gap: 12,
    },
    eventCard: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    eventHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    eventTime: {
      fontSize: fontSizes.medium,
      color: colors.primary,
      fontFamily: 'Inter-SemiBold',
    },
    impactBadge: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 4,
    },
    highImpact: {
      backgroundColor: `${colors.error}33`,
    },
    mediumImpact: {
      backgroundColor: `${colors.warning}33`,
    },
    lowImpact: {
      backgroundColor: `${colors.textSecondary}33`,
    },
    impactText: {
      fontSize: 10,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
    },
    eventDetails: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 8,
    },
    eventCurrency: {
      fontSize: fontSizes.small,
      color: colors.primary,
      fontFamily: 'Inter-SemiBold',
      backgroundColor: `${colors.primary}20`,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
    },
    eventName: {
      fontSize: fontSizes.medium,
      color: colors.text,
      fontFamily: 'Inter-Medium',
      flex: 1,
    },
    eventValues: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    eventForecast: {
      fontSize: fontSizes.small,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
    },
    eventPrevious: {
      fontSize: fontSizes.small,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Market Analysis</Text>
        <TouchableOpacity style={styles.calendarButton}>
          <Calendar size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Asset Switcher */}
        <AssetSwitcher
          selectedAsset={selectedAsset}
          onAssetChange={setSelectedAsset}
        />

        {/* Current Price Card */}
        <View style={styles.priceCard}>
          <View style={styles.priceHeader}>
            <Text style={styles.currentPair}>{selectedAsset}</Text>
            <View style={styles.changeContainer}>
              {currentData.change >= 0 ? (
                <TrendingUp size={16} color={colors.success} />
              ) : (
                <TrendingDown size={16} color={colors.error} />
              )}
              <Text style={[
                styles.changeText,
                currentData.change >= 0 ? styles.profitText : styles.lossText
              ]}>
                {currentData.change >= 0 ? '+' : ''}{currentData.changePercent.toFixed(2)}%
              </Text>
            </View>
          </View>
          <Text style={styles.currentPrice}>{currentData.current.toFixed(2)}</Text>
          <View style={styles.priceDetails}>
            <View style={styles.priceDetailItem}>
              <Text style={styles.priceDetailLabel}>High</Text>
              <Text style={styles.priceDetailValue}>{currentData.high.toFixed(2)}</Text>
            </View>
            <View style={styles.priceDetailItem}>
              <Text style={styles.priceDetailLabel}>Low</Text>
              <Text style={styles.priceDetailValue}>{currentData.low.toFixed(2)}</Text>
            </View>
            <View style={styles.priceDetailItem}>
              <Text style={styles.priceDetailLabel}>Volume</Text>
              <Text style={styles.priceDetailValue}>{currentData.volume}</Text>
            </View>
          </View>
        </View>

        {/* Timeframe Selector */}
        <TimeframeSwitcher
          selectedTimeframe={timeframe}
          onTimeframeChange={setTimeframe}
        />

        {/* Chart */}
        <View style={styles.chartContainer}>
          <WebView
            source={{ html: getTradingViewHTML(selectedAsset) }}
            style={{ flex: 1 }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            scalesPageToFit={true}
          />
        </View>

        {/* Technical Indicators */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Indicators</Text>
          <View style={styles.indicatorsContainer}>
            {technicalIndicators.map((indicator, index) => (
              <View key={index} style={styles.indicatorCard}>
                <View style={styles.indicatorHeader}>
                  <Text style={styles.indicatorName}>{indicator.name}</Text>
                  <Text style={[styles.indicatorValue, { color: indicator.color }]}>
                    {indicator.value}
                  </Text>
                </View>
                <Text style={[styles.indicatorStatus, { color: indicator.color }]}>
                  {indicator.status}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Economic Calendar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Economic Events</Text>
          <View style={styles.eventsContainer}>
            {economicEvents.map((event) => (
              <View key={event.id} style={styles.eventCard}>
                <View style={styles.eventHeader}>
                  <Text style={styles.eventTime}>{event.time}</Text>
                  <View style={[
                    styles.impactBadge,
                    event.impact === 'high' && styles.highImpact,
                    event.impact === 'medium' && styles.mediumImpact,
                    event.impact === 'low' && styles.lowImpact,
                  ]}>
                    <Text style={styles.impactText}>{event.impact.toUpperCase()}</Text>
                  </View>
                </View>
                <View style={styles.eventDetails}>
                  <Text style={styles.eventCurrency}>{event.currency}</Text>
                  <Text style={styles.eventName}>{event.event}</Text>
                </View>
                <View style={styles.eventValues}>
                  <Text style={styles.eventForecast}>Forecast: {event.forecast}</Text>
                  <Text style={styles.eventPrevious}>Previous: {event.previous}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}