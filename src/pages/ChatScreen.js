import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';

const TEMP_CHATS = [
  {
    id: 1,
    name: 'Ayşe Yılmaz',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    lastMessage: 'Yarın parkta buluşalım mı?',
    time: '14:30',
    unread: 2,
    online: true
  },
  {
    id: 2,
    name: 'Mehmet Demir',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    lastMessage: 'Luna çok tatlıymış!',
    time: '12:45',
    unread: 0,
    online: true
  },
  {
    id: 3,
    name: 'Zeynep Kaya',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    lastMessage: 'Eğitim hakkında konuşabilir miyiz?',
    time: 'Dün',
    unread: 1,
    online: false
  }
];

const ChatItem = ({ chat, onPress }) => (
  <TouchableOpacity style={styles.chatItem} onPress={() => onPress(chat)}>
    <View style={styles.avatarContainer}>
      <Image source={{ uri: chat.avatar }} style={styles.avatar} />
      {chat.online && <View style={styles.onlineIndicator} />}
    </View>
    <View style={styles.chatInfo}>
      <View style={styles.chatHeader}>
        <Text style={styles.name}>{chat.name}</Text>
        <Text style={styles.time}>{chat.time}</Text>
      </View>
      <View style={styles.chatFooter}>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {chat.lastMessage}
        </Text>
        {chat.unread > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{chat.unread}</Text>
          </View>
        )}
      </View>
    </View>
  </TouchableOpacity>
);

export const ChatScreen = ({ navigation }) => {
  const handleChatPress = (chat) => {
    navigation.navigate('ChatDetail', { chat });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <FontAwesome name="search" size={16} color={COLORS.text} />
          <Text style={styles.searchPlaceholder}>Sohbet ara...</Text>
        </View>
      </View>

      <ScrollView style={styles.container}>
        {TEMP_CHATS.map(chat => (
          <ChatItem key={chat.id} chat={chat} onPress={handleChatPress} />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.newChatButton}>
        <FontAwesome name="pencil" size={24} color={COLORS.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: SIZES.padding.medium,
    backgroundColor: COLORS.white,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: SIZES.padding.medium,
    borderRadius: SIZES.radius.large,
  },
  searchPlaceholder: {
    marginLeft: SIZES.padding.small,
    color: COLORS.text,
    fontSize: SIZES.medium,
  },
  chatItem: {
    flexDirection: 'row',
    padding: SIZES.padding.medium,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.success,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  chatInfo: {
    flex: 1,
    marginLeft: SIZES.padding.medium,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  time: {
    fontSize: SIZES.small,
    color: COLORS.text,
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginRight: SIZES.padding.small,
  },
  unreadBadge: {
    backgroundColor: COLORS.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: COLORS.white,
    fontSize: SIZES.small,
    fontWeight: 'bold',
  },
  newChatButton: {
    position: 'absolute',
    right: SIZES.padding.large,
    bottom: SIZES.padding.large,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
}); 