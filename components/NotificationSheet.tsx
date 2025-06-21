import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Bell, TrendingUp, TrendingDown, Award, AlertCircle } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';

interface Notification {
  id: string;
  type: 'signal' | 'achievement' | 'announcement' | 'alert';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  data?: any;
}

interface NotificationSheetProps {
  visible: boolean;
  onClose: () => void;
}

export default function NotificationSheet({ visible, onClose }: NotificationSheetProps) {
  const { colors, fontSizes } = useTheme();

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'signal',
      title: 'Signal Closed - Profit!',
      message: 'XAU/USD BUY signal closed with +$245 profit',
      timestamp: '2 hours ago',
      read: false,
    },
    {
      id: '2',
      type: 'achievement',
      title: 'Streak Achievement!',
      message: 'You\'ve hit a 5-day winning streak!',
      timestamp: '1 day ago',
      read: false,
    },
    {
      id: '3',
      type: 'signal',
      title: 'New Signal Available',
      message: 'XAG/USD SELL signal just published',
      timestamp: '2 days ago',
      read: true,
    },
    {
      id: '4',
      type: 'announcement',
      title: 'Market Update',
      message: 'Gold showing strong bullish momentum this week',
      timestamp: '3 days ago',
      read: true,
    },
    {
      id: '5',
      type: 'alert',
      title: 'Stop Loss Hit',
      message: 'XAG/USD position closed at stop loss',
      timestamp: '1 week ago',
      read: true,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'signal':
        return <TrendingUp size={20} color={colors.primary} />;
      case 'achievement':
        return <Award size={20} color={colors.warning} />;
      case 'announcement':
        return <Bell size={20} color={colors.secondary} />;
      case 'alert':
        return <AlertCircle size={20} color={colors.error} />;
      default:
        return <Bell size={20} color={colors.textSecondary} />;
    }
  };

  const getTimeAgo = (timestamp: string) => {
    return timestamp; // In a real app, you'd calculate this
  };

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    container: {
      backgroundColor: colors.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      maxHeight: '80%',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: {
      fontSize: fontSizes.title,
      fontWeight: 'bold',
      color: colors.text,
      fontFamily: 'Inter-Bold',
    },
    closeButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      flex: 1,
    },
    notificationItem: {
      flexDirection: 'row',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    notificationItemUnread: {
      backgroundColor: `${colors.primary}10`,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    notificationContent: {
      flex: 1,
    },
    notificationTitle: {
      fontSize: fontSizes.medium,
      fontWeight: '600',
      color: colors.text,
      fontFamily: 'Inter-SemiBold',
      marginBottom: 4,
    },
    notificationMessage: {
      fontSize: fontSizes.small,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
      marginBottom: 4,
    },
    notificationTime: {
      fontSize: fontSizes.small - 2,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
    },
    unreadDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.primary,
      marginLeft: 8,
      marginTop: 4,
    },
    emptyState: {
      padding: 40,
      alignItems: 'center',
    },
    emptyText: {
      fontSize: fontSizes.medium,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
      textAlign: 'center',
    },
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable onPress={(e) => e.stopPropagation()}>
          <SafeAreaView style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>Notifications</Text>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <X size={18} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
              {notifications.length === 0 ? (
                <View style={styles.emptyState}>
                  <Bell size={48} color={colors.textSecondary} />
                  <Text style={styles.emptyText}>No notifications yet</Text>
                </View>
              ) : (
                notifications.map((notification) => (
                  <TouchableOpacity
                    key={notification.id}
                    style={[
                      styles.notificationItem,
                      !notification.read && styles.notificationItemUnread,
                    ]}
                  >
                    <View style={styles.iconContainer}>
                      {getNotificationIcon(notification.type)}
                    </View>
                    <View style={styles.notificationContent}>
                      <Text style={styles.notificationTitle}>
                        {notification.title}
                      </Text>
                      <Text style={styles.notificationMessage}>
                        {notification.message}
                      </Text>
                      <Text style={styles.notificationTime}>
                        {getTimeAgo(notification.timestamp)}
                      </Text>
                    </View>
                    {!notification.read && <View style={styles.unreadDot} />}
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          </SafeAreaView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}