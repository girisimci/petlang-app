import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';

const TEMP_MESSAGES = [
  {
    id: 1,
    text: 'Merhaba! Luna ile parkta buluşmak ister misiniz?',
    time: '14:30',
    sender: 'other',
  },
  {
    id: 2,
    text: 'Evet, harika olur! Saat kaçta uygun olursunuz?',
    time: '14:32',
    sender: 'me',
  },
  {
    id: 3,
    text: 'Yarın öğleden sonra 15:00 nasıl olur?',
    time: '14:33',
    sender: 'other',
  },
  {
    id: 4,
    text: 'Maçka Parkı\'nda buluşabiliriz.',
    time: '14:33',
    sender: 'other',
  },
  {
    id: 5,
    text: 'Tamam, çok iyi olur. Max ile birlikte orada olacağız!',
    time: '14:35',
    sender: 'me',
  },
];

const Message = ({ message }) => (
  <View
    style={[
      styles.messageContainer,
      message.sender === 'me' ? styles.myMessage : styles.otherMessage,
    ]}
  >
    <Text style={[
      styles.messageText,
      message.sender === 'me' ? styles.myMessageText : styles.otherMessageText
    ]}>
      {message.text}
    </Text>
    <Text style={[
      styles.messageTime,
      message.sender === 'me' ? styles.myMessageTime : styles.otherMessageTime
    ]}>
      {message.time}
    </Text>
  </View>
);

export const ChatDetailScreen = ({ route, navigation }) => {
  const { chat } = route.params;
  const [message, setMessage] = useState('');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerTitle}>
          <Image source={{ uri: chat.avatar }} style={styles.headerAvatar} />
          <View>
            <Text style={styles.headerName}>{chat.name}</Text>
            {chat.online && <Text style={styles.onlineStatus}>Çevrimiçi</Text>}
          </View>
        </View>
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <FontAwesome name="video-camera" size={20} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <FontAwesome name="phone" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, chat]);

  const sendMessage = () => {
    if (message.trim()) {
      // Mesaj gönderme işlemi burada yapılacak
      setMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView style={styles.messagesContainer}>
          {TEMP_MESSAGES.map(msg => (
            <Message key={msg.id} message={msg} />
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <FontAwesome name="plus" size={20} color={COLORS.primary} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Mesaj yazın..."
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
            onPress={sendMessage}
            disabled={!message.trim()}
          >
            <FontAwesome
              name="send"
              size={20}
              color={message.trim() ? COLORS.white : COLORS.text}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: SIZES.padding.small,
  },
  headerName: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  onlineStatus: {
    fontSize: SIZES.small,
    color: COLORS.success,
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: SIZES.padding.small,
    marginLeft: SIZES.padding.small,
  },
  messagesContainer: {
    flex: 1,
    padding: SIZES.padding.medium,
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: SIZES.padding.small / 2,
    padding: SIZES.padding.medium,
    borderRadius: SIZES.radius.large,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.white,
  },
  messageText: {
    fontSize: SIZES.medium,
    marginBottom: 4,
  },
  myMessageText: {
    color: COLORS.white,
  },
  otherMessageText: {
    color: COLORS.text,
  },
  messageTime: {
    fontSize: SIZES.small,
    alignSelf: 'flex-end',
  },
  myMessageTime: {
    color: COLORS.white + '99',
  },
  otherMessageTime: {
    color: COLORS.text + '99',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding.medium,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.background,
  },
  attachButton: {
    padding: SIZES.padding.small,
  },
  input: {
    flex: 1,
    marginHorizontal: SIZES.padding.small,
    padding: SIZES.padding.small,
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius.large,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.background,
  },
}); 