import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ProfileCard } from '../molecules/ProfileCard';
import { COLORS, SIZES } from '../constants/theme';

// Örnek veri
const profiles = Array.from({ length: 20 }, (_, index) => ({
  id: index.toString(),
  name: `Kullanıcı ${index + 1}`,
  age: Math.floor(Math.random() * 30) + 18,
  location: ['İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa'][Math.floor(Math.random() * 5)],
  image: `https://picsum.photos/seed/${index + 100}/400/400`,
  bio: 'Evcil hayvan sever 🐶 🐱',
  interests: ['Köpekler', 'Kediler', 'Yürüyüş', 'Doğa'][Math.floor(Math.random() * 4)]
}));

export const ExploreScreen = () => {
  const handleProfilePress = (profile) => {
    console.log('Profile pressed:', profile);
  };

  const renderItem = ({ item }) => (
    <ProfileCard
      profile={item}
      onPress={() => handleProfilePress(item)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={profiles}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContainer: {
    padding: SIZES.padding.medium,
  },
}); 