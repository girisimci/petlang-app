import React from 'react';
import { StyleSheet, View, Dimensions, Image, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';
import Swiper from 'react-native-deck-swiper';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

// Geçici test datası
const TEMP_PROFILES = [
  {
    id: 1,
    petName: "Luna",
    petAge: 2,
    breed: "Golden Retriever",
    petImage: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24",
    ownerName: "Ayşe Yılmaz",
    ownerImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    location: "Kadıköy, İstanbul",
    interests: "Parkta Koşu"
  },
  {
    id: 2,
    petName: "Max",
    petAge: 3,
    breed: "Husky",
    petImage: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea",
    ownerName: "Mehmet Demir",
    ownerImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    location: "Beşiktaş, İstanbul",
    interests: "Top Oyunu"
  }
];

export const HomeScreen = () => {
  const renderCard = (profile) => {
    return (
      <View style={styles.card}>
        <Image
          source={{ uri: profile.petImage }}
          style={styles.petImage}
          resizeMode="cover"
        />
        <View style={styles.ownerImageContainer}>
          <Image
            source={{ uri: profile.ownerImage }}
            style={styles.ownerImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.cardContent}>
          <View style={styles.mainInfo}>
            <Text style={styles.petName}>{profile.petName}, {profile.petAge} yaş</Text>
            <Text style={styles.breed}>{profile.breed}</Text>
          </View>
          <View style={styles.ownerInfo}>
            <FontAwesome name="user" size={16} color={COLORS.text} />
            <Text style={styles.ownerName}>{profile.ownerName}</Text>
          </View>
          <View style={styles.locationContainer}>
            <FontAwesome name="map-marker" size={16} color={COLORS.text} />
            <Text style={styles.location}>{profile.location}</Text>
          </View>
          <View style={styles.interestContainer}>
            <FontAwesome name="paw" size={16} color={COLORS.primary} />
            <Text style={styles.interest}>{profile.interests}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardsContainer}>
        <Swiper
          cards={TEMP_PROFILES}
          renderCard={(card) => renderCard(card)}
          onSwipedLeft={() => {}}
          onSwipedRight={() => {}}
          cardIndex={0}
          backgroundColor={COLORS.background}
          stackSize={2}
          containerStyle={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
          cardStyle={{top: 0}}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <View style={[styles.button, styles.buttonSecondary]}>
          <FontAwesome name="times" size={30} color={COLORS.error} />
        </View>
        <View style={[styles.button, styles.buttonPrimary]}>
          <FontAwesome name="heart" size={30} color={COLORS.white} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  cardsContainer: {
    flex: 1,
    position: 'relative',
    marginTop: 0,
  },
  card: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.7,
    borderRadius: SIZES.radius.large,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  petImage: {
    width: '100%',
    height: '70%',
    borderTopLeftRadius: SIZES.radius.large,
    borderTopRightRadius: SIZES.radius.large,
  },
  ownerImageContainer: {
    position: 'absolute',
    right: SIZES.padding.medium,
    top: '63%',
    borderWidth: 3,
    borderColor: COLORS.white,
    borderRadius: 35,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ownerImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  cardContent: {
    padding: SIZES.padding.medium,
  },
  mainInfo: {
    marginBottom: SIZES.padding.small,
  },
  petName: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  breed: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginTop: 2,
  },
  ownerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.padding.small / 2,
  },
  ownerName: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginLeft: SIZES.padding.small,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.padding.small / 2,
  },
  location: {
    fontSize: SIZES.small,
    color: COLORS.text,
    marginLeft: SIZES.padding.small,
  },
  interestContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '10',
    paddingHorizontal: SIZES.padding.medium,
    paddingVertical: SIZES.padding.small,
    borderRadius: SIZES.radius.medium,
    alignSelf: 'flex-start',
    marginTop: SIZES.padding.small,
  },
  interest: {
    fontSize: SIZES.small,
    color: COLORS.primary,
    marginLeft: SIZES.padding.small,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SIZES.padding.large,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
    marginHorizontal: SIZES.padding.medium,
  },
  buttonPrimary: {
    backgroundColor: COLORS.primary,
  },
  buttonSecondary: {
    backgroundColor: COLORS.white,
  },
}); 