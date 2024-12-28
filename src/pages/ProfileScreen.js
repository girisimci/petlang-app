import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, SIZES } from '../constants/theme';

const ProfileSection = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const PetCard = ({ pet }) => (
  <View style={styles.petCard}>
    <Image source={{ uri: pet.image }} style={styles.petImage} />
    <View style={styles.petInfo}>
      <Text style={styles.petName}>{pet.name}</Text>
      <Text style={styles.petBreed}>{pet.breed}</Text>
      <Text style={styles.petAge}>{pet.age} yaş</Text>
    </View>
  </View>
);

const PremiumFeature = ({ icon, title, description }) => (
  <View style={styles.premiumFeature}>
    <View style={styles.premiumFeatureIcon}>
      <FontAwesome name={icon} size={24} color={COLORS.primary} />
    </View>
    <View style={styles.premiumFeatureContent}>
      <Text style={styles.premiumFeatureTitle}>{title}</Text>
      <Text style={styles.premiumFeatureDescription}>{description}</Text>
    </View>
  </View>
);

export const ProfileScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1500648767791-00dcc994a43e');
  const [petImage, setPetImage] = useState(null);

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

  const userPets = [
    {
      id: 1,
      name: 'Max',
      breed: 'Golden Retriever',
      age: 3,
      image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24'
    },
    {
      id: 2,
      name: 'Luna',
      breed: 'Husky',
      age: 2,
      image: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea'
    }
  ];

  const isPremium = false;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <FontAwesome name="cog" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => pickImage('profile')} style={styles.avatarContainer}>
            <Image
              source={{ uri: profileImage }}
              style={styles.avatar}
            />
            <View style={styles.editIconContainer}>
              <FontAwesome name="camera" size={16} color={COLORS.white} />
            </View>
          </TouchableOpacity>
          <Text style={styles.name}>Mehmet Demir</Text>
          <Text style={styles.location}>Beşiktaş, İstanbul</Text>
          {!isPremium && (
            <TouchableOpacity style={styles.premiumBadge}>
              <FontAwesome name="star" size={16} color={COLORS.warning} />
              <Text style={styles.premiumBadgeText}>Premium'a Geç</Text>
            </TouchableOpacity>
          )}
        </View>

        <ProfileSection title="Köpek Fotoğrafı Ekle">
          <TouchableOpacity 
            style={styles.petImageUpload} 
            onPress={() => pickImage('pet')}
          >
            {petImage ? (
              <Image source={{ uri: petImage }} style={styles.uploadedPetImage} />
            ) : (
              <>
                <FontAwesome name="plus" size={24} color={COLORS.primary} />
                <Text style={styles.uploadText}>Köpek Fotoğrafı Yükle</Text>
              </>
            )}
          </TouchableOpacity>
        </ProfileSection>

        <ProfileSection title="Köpeklerim">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {userPets.map(pet => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </ScrollView>
        </ProfileSection>

        <ProfileSection title="Hakkımda">
          <Text style={styles.bio}>
            Profesyonel köpek eğitmeniyim ve iki harika dostum var. 5 yıldır köpek eğitimi veriyorum. Köpeklerle vakit geçirmeyi, onlara yeni şeyler öğretmeyi ve diğer köpek severlerle tanışmayı seviyorum.
          </Text>
        </ProfileSection>

        <ProfileSection title="İlgi Alanları">
          <View style={styles.interestsContainer}>
            {['Köpek Eğitimi', 'Agility', 'Köpek Parkı', 'Yürüyüş'].map((interest, index) => (
              <View key={index} style={styles.interestTag}>
                <FontAwesome name="paw" size={14} color={COLORS.primary} style={styles.interestIcon} />
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
          </View>
        </ProfileSection>

        <ProfileSection title="İstatistikler">
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>150</Text>
              <Text style={styles.statLabel}>Eşleşme</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>45</Text>
              <Text style={styles.statLabel}>Arkadaş</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Etkinlik</Text>
            </View>
          </View>
        </ProfileSection>

        {!isPremium && (
          <ProfileSection title="Premium Özellikler">
            <PremiumFeature
              icon="heart"
              title="Sınırsız Eşleşme"
              description="Günlük eşleşme limitini kaldırın"
            />
            <PremiumFeature
              icon="filter"
              title="Gelişmiş Filtreler"
              description="Detaylı arama ve filtreleme özellikleri"
            />
            <PremiumFeature
              icon="trophy"
              title="Özel Rozet"
              description="Premium üyelere özel rozet"
            />
            <TouchableOpacity style={styles.premiumButton}>
              <Text style={styles.premiumButtonText}>Premium'a Geç</Text>
            </TouchableOpacity>
          </ProfileSection>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => navigation.navigate('EditProfile', {
              profileImage,
              petImage,
              name: 'Mehmet Demir',
              location: 'Beşiktaş, İstanbul',
              bio: 'Profesyonel köpek eğitmeniyim ve iki harika dostum var. 5 yıldır köpek eğitimi veriyorum. Köpeklerle vakit geçirmeyi, onlara yeni şeyler öğretmeyi ve diğer köpek severlerle tanışmayı seviyorum.'
            })}
          >
            <Text style={styles.editButtonText}>Profili Düzenle</Text>
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
  settingsButton: {
    padding: SIZES.padding.medium,
  },
  header: {
    alignItems: 'center',
    paddingVertical: SIZES.padding.large,
    backgroundColor: COLORS.white,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: SIZES.padding.medium,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  name: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SIZES.padding.small,
  },
  location: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginBottom: SIZES.padding.medium,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.warning + '20',
    paddingHorizontal: SIZES.padding.medium,
    paddingVertical: SIZES.padding.small,
    borderRadius: SIZES.radius.large,
  },
  premiumBadgeText: {
    marginLeft: SIZES.padding.small,
    color: COLORS.warning,
    fontWeight: '600',
    fontSize: SIZES.medium,
  },
  section: {
    padding: SIZES.padding.medium,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderColor: COLORS.background,
  },
  sectionTitle: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: SIZES.padding.medium,
  },
  petCard: {
    width: 160,
    marginRight: SIZES.padding.medium,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.medium,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  petImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: SIZES.radius.medium,
    borderTopRightRadius: SIZES.radius.medium,
  },
  petInfo: {
    padding: SIZES.padding.medium,
  },
  petName: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  petBreed: {
    fontSize: SIZES.small,
    color: COLORS.text,
    marginTop: 2,
  },
  petAge: {
    fontSize: SIZES.small,
    color: COLORS.primary,
    marginTop: 2,
  },
  bio: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    lineHeight: 24,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SIZES.padding.small / 2,
  },
  interestTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '10',
    paddingHorizontal: SIZES.padding.medium,
    paddingVertical: SIZES.padding.small,
    borderRadius: SIZES.radius.medium,
    margin: SIZES.padding.small / 2,
  },
  interestIcon: {
    marginRight: SIZES.padding.small / 2,
  },
  interestText: {
    color: COLORS.primary,
    fontSize: SIZES.small,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: SIZES.padding.medium,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SIZES.padding.small / 2,
  },
  statLabel: {
    fontSize: SIZES.small,
    color: COLORS.text,
  },
  premiumFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.padding.medium,
  },
  premiumFeatureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.padding.medium,
  },
  premiumFeatureContent: {
    flex: 1,
  },
  premiumFeatureTitle: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: 2,
  },
  premiumFeatureDescription: {
    fontSize: SIZES.small,
    color: COLORS.text,
  },
  premiumButton: {
    backgroundColor: COLORS.warning,
    paddingVertical: SIZES.padding.medium,
    borderRadius: SIZES.radius.medium,
    alignItems: 'center',
    marginTop: SIZES.padding.medium,
  },
  premiumButtonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: '600',
  },
  buttonContainer: {
    padding: SIZES.padding.medium,
  },
  editButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.padding.medium,
    borderRadius: SIZES.radius.medium,
    alignItems: 'center',
  },
  editButtonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: '600',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: SIZES.padding.medium,
  },
  editIconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  petImageUpload: {
    width: '100%',
    height: 200,
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: COLORS.primary,
  },
  uploadedPetImage: {
    width: '100%',
    height: '100%',
    borderRadius: SIZES.radius.medium,
  },
  uploadText: {
    marginTop: SIZES.padding.small,
    color: COLORS.primary,
    fontSize: SIZES.medium,
    fontWeight: '500',
  },
}); 