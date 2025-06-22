import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';
import { testSupabaseConnection } from '../lib/supabase';

export default function ConnectionStatus() {
  const { colors, fontSizes } = useTheme();
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkConnection = async () => {
    setIsChecking(true);
    try {
      const connected = await testSupabaseConnection();
      setIsConnected(connected);
    } catch (error) {
      setIsConnected(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  if (isConnected === null) {
    return null; // Still checking initial connection
  }

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      backgroundColor: isConnected ? `${colors.success}20` : `${colors.warning}20`,
      marginHorizontal: 20,
      marginBottom: 12,
    },
    icon: {
      marginRight: 8,
    },
    text: {
      flex: 1,
      fontSize: fontSizes.small,
      fontFamily: 'Inter-Medium',
      color: isConnected ? colors.success : colors.warning,
    },
    retryButton: {
      padding: 4,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        {isConnected ? (
          <Wifi size={16} color={colors.success} />
        ) : (
          <WifiOff size={16} color={colors.warning} />
        )}
      </View>
      <Text style={styles.text}>
        {isConnected ? 'Live Data Connected' : 'Using Demo Data'}
      </Text>
      <TouchableOpacity 
        style={styles.retryButton} 
        onPress={checkConnection}
        disabled={isChecking}
      >
        <RefreshCw 
          size={14} 
          color={colors.textSecondary} 
          style={{ 
            transform: [{ rotate: isChecking ? '180deg' : '0deg' }] 
          }} 
        />
      </TouchableOpacity>
    </View>
  );
}