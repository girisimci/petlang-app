import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { COLORS, SIZES } from '../constants/theme';

const SettingItem = ({ icon, title, onPress, value }) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <View style={styles.settingLeft}>
      <FontAwesome name={icon} size={24} color={COLORS.primary} style={styles.settingIcon} />
      <Text style={styles.settingTitle}>{title}</Text>
    </View>
    {value && <Text style={styles.settingValue}>{value}</Text>}
    <FontAwesome name="chevron-right" size={16} color={COLORS.text} />
  </TouchableOpacity>
);

export default function SettingsScreen() {
  const { t, i18n } = useTranslation();

  const changeLanguage = () => {
    Alert.alert(
      t('settings.language'),
      t('settings.selectLanguage'),
      [
        {
          text: 'English',
          onPress: () => i18n.changeLanguage('en'),
        },
        {
          text: 'Türkçe',
          onPress: () => i18n.changeLanguage('tr'),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('settings.title')}</Text>
        
        <SettingItem
          icon="language"
          title={t('settings.language')}
          onPress={changeLanguage}
          value={i18n.language === 'tr' ? 'Türkçe' : 'English'}
        />
        
        <SettingItem
          icon="bell"
          title={t('settings.notifications')}
          onPress={() => {}}
        />
        
        <SettingItem
          icon="lock"
          title={t('settings.privacy')}
          onPress={() => {}}
        />
        
        <SettingItem
          icon="question-circle"
          title={t('settings.help')}
          onPress={() => {}}
        />
        
        <SettingItem
          icon="info-circle"
          title={t('settings.about')}
          onPress={() => {}}
        />
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>{t('settings.logout')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  section: {
    padding: SIZES.padding.medium,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SIZES.padding.large,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.padding.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  settingLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: SIZES.padding.medium,
    width: 24,
  },
  settingTitle: {
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  settingValue: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginRight: SIZES.padding.medium,
  },
  logoutButton: {
    margin: SIZES.padding.medium,
    padding: SIZES.padding.medium,
    backgroundColor: COLORS.error,
    borderRadius: SIZES.radius.medium,
    alignItems: 'center',
  },
  logoutText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: '600',
  },
}); 