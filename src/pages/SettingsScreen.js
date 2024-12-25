import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';

const SettingItem = ({ icon, title, value, onPress, type = 'arrow' }) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <View style={styles.settingLeft}>
      <View style={styles.settingIcon}>
        <FontAwesome name={icon} size={20} color={COLORS.primary} />
      </View>
      <Text style={styles.settingTitle}>{title}</Text>
    </View>
    <View style={styles.settingRight}>
      {type === 'arrow' && (
        <FontAwesome name="chevron-right" size={16} color={COLORS.text} />
      )}
      {type === 'switch' && (
        <Switch
          value={value}
          onValueChange={onPress}
          trackColor={{ false: COLORS.background, true: COLORS.primary + '50' }}
          thumbColor={value ? COLORS.primary : COLORS.text}
        />
      )}
      {type === 'text' && (
        <Text style={styles.settingValue}>{value}</Text>
      )}
    </View>
  </TouchableOpacity>
);

const SettingSection = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

export const SettingsScreen = () => {
  const [notifications, setNotifications] = React.useState(true);
  const [emailNotifications, setEmailNotifications] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <SettingSection title="Hesap">
          <SettingItem
            icon="user"
            title="Profil Bilgileri"
            onPress={() => {}}
          />
          <SettingItem
            icon="lock"
            title="Güvenlik"
            onPress={() => {}}
          />
          <SettingItem
            icon="credit-card"
            title="Ödeme Yöntemleri"
            onPress={() => {}}
          />
        </SettingSection>

        <SettingSection title="Bildirimler">
          <SettingItem
            icon="bell"
            title="Uygulama Bildirimleri"
            type="switch"
            value={notifications}
            onPress={() => setNotifications(!notifications)}
          />
          <SettingItem
            icon="envelope"
            title="E-posta Bildirimleri"
            type="switch"
            value={emailNotifications}
            onPress={() => setEmailNotifications(!emailNotifications)}
          />
        </SettingSection>

        <SettingSection title="Görünüm">
          <SettingItem
            icon="moon-o"
            title="Karanlık Mod"
            type="switch"
            value={darkMode}
            onPress={() => setDarkMode(!darkMode)}
          />
          <SettingItem
            icon="language"
            title="Dil"
            type="text"
            value="Türkçe"
            onPress={() => {}}
          />
        </SettingSection>

        <SettingSection title="Destek">
          <SettingItem
            icon="question-circle"
            title="Yardım Merkezi"
            onPress={() => {}}
          />
          <SettingItem
            icon="info-circle"
            title="Hakkında"
            onPress={() => {}}
          />
          <SettingItem
            icon="file-text-o"
            title="Kullanım Koşulları"
            onPress={() => {}}
          />
          <SettingItem
            icon="shield"
            title="Gizlilik Politikası"
            onPress={() => {}}
          />
        </SettingSection>

        <TouchableOpacity style={styles.logoutButton}>
          <FontAwesome name="sign-out" size={20} color={COLORS.error} />
          <Text style={styles.logoutText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
  },
  section: {
    paddingVertical: SIZES.padding.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  sectionTitle: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.padding.small,
    paddingHorizontal: SIZES.padding.medium,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SIZES.padding.medium,
    paddingHorizontal: SIZES.padding.medium,
    backgroundColor: COLORS.white,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.padding.medium,
  },
  settingTitle: {
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginRight: SIZES.padding.small,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.padding.large,
    marginTop: SIZES.padding.medium,
  },
  logoutText: {
    fontSize: SIZES.medium,
    color: COLORS.error,
    fontWeight: '600',
    marginLeft: SIZES.padding.small,
  },
}); 