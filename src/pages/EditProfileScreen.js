import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, SIZES } from '../constants/theme';
import { Input } from '../atoms/Input';

export const EditProfileScreen = ({ navigation, route }) => {
  const [profileImage, setProfileImage] = useState(route.params?.profileImage || null);
  const [petImage, setPetImage] = useState(route.params?.petImage || null);
  const [name, setName] = useState(route.params?.name || '');
  const [location, setLocation] = useState(route.params?.location || '');
  const [bio, setBio] = useState(route.params?.bio || '');

  const pickImage = async (type) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Üzgünüz', 'Fotoğraf galerisine erişim izni gerekiyor.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      if (type === 'profile') {
        setProfileImage(result.assets[0].uri);
      } else {
        setPetImage(result.assets[0].uri);
      }
    }
  };

  const handleSave = () => {
    // Burada API çağrısı yapılabilir
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Profili Düzenle</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profil Fotoğrafı</Text>
          <TouchableOpacity onPress={() => pickImage('profile')} style={styles.imageUploadContainer}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.uploadedImage} />
            ) : (
              <View style={styles.placeholderContainer}>
                <FontAwesome name="user" size={40} color={COLORS.primary} />
                <Text style={styles.uploadText}>Profil Fotoğrafı Seç</Text>
              </View>
            )}
            <View style={styles.editIconContainer}>
              <FontAwesome name="camera" size={16} color={COLORS.white} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Köpek Fotoğrafı</Text>
          <TouchableOpacity onPress={() => pickImage('pet')} style={styles.imageUploadContainer}>
            {petImage ? (
              <Image source={{ uri: petImage }} style={styles.uploadedImage} />
            ) : (
              <View style={styles.placeholderContainer}>
                <FontAwesome name="paw" size={40} color={COLORS.primary} />
                <Text style={styles.uploadText}>Köpek Fotoğrafı Seç</Text>
              </View>
            )}
            <View style={styles.editIconContainer}>
              <FontAwesome name="camera" size={16} color={COLORS.white} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Input
            label="İsim"
            value={name}
            onChangeText={setName}
            placeholder="İsminizi girin"
          />
          <Input
            label="Konum"
            value={location}
            onChangeText={setLocation}
            placeholder="Konumunuzu girin"
          />
          <Input
            label="Hakkımda"
            value={bio}
            onChangeText={setBio}
            placeholder="Kendinizden bahsedin"
            multiline
            numberOfLines={4}
            style={{ height: 100 }}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Kaydet</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.cancelButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>İptal</Text>
          </TouchableOpacity>
        </View>
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
  header: {
    padding: SIZES.padding.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  section: {
    padding: SIZES.padding.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  sectionTitle: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: SIZES.padding.medium,
  },
  imageUploadContainer: {
    width: '100%',
    height: 200,
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius.medium,
    overflow: 'hidden',
    position: 'relative',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
  },
  uploadText: {
    marginTop: SIZES.padding.medium,
    color: COLORS.primary,
    fontSize: SIZES.medium,
    fontWeight: '500',
  },
  editIconContainer: {
    position: 'absolute',
    right: SIZES.padding.medium,
    bottom: SIZES.padding.medium,
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    padding: SIZES.padding.medium,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.padding.medium,
    borderRadius: SIZES.radius.medium,
    alignItems: 'center',
    marginBottom: SIZES.padding.small,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: COLORS.background,
    paddingVertical: SIZES.padding.medium,
    borderRadius: SIZES.radius.medium,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: COLORS.text,
    fontSize: SIZES.medium,
    fontWeight: '600',
  },
}); 