import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card } from '../atoms/Card';
import { COLORS, SIZES } from '../constants/theme';

export const ProfileCard = ({ profile, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles.card}>
        <Image source={{ uri: profile.image }} style={styles.image} />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.name}>{profile.name}, {profile.age}</Text>
            <View style={styles.locationContainer}>
              <Icon name="map-marker" size={16} color={COLORS.primary} />
              <Text style={styles.location}>{profile.location}</Text>
            </View>
          </View>
          
          <Text style={styles.bio}>{profile.bio}</Text>
          
          <View style={styles.interestContainer}>
            <View style={styles.interestTag}>
              <Icon name="heart" size={12} color={COLORS.primary} style={styles.interestIcon} />
              <Text style={styles.interestText}>{profile.interests}</Text>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: SIZES.padding.medium,
    padding: 0,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: SIZES.padding.medium,
  },
  header: {
    marginBottom: SIZES.padding.small,
  },
  name: {
    fontWeight: 'bold',
    fontSize: SIZES.large,
    color: COLORS.black,
    marginBottom: SIZES.padding.small / 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginLeft: SIZES.padding.small / 2,
  },
  bio: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginBottom: SIZES.padding.medium,
  },
  interestContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '10',
    paddingHorizontal: SIZES.padding.medium,
    paddingVertical: SIZES.padding.small,
    borderRadius: SIZES.radius.large,
    marginRight: SIZES.padding.small,
    marginBottom: SIZES.padding.small,
  },
  interestIcon: {
    marginRight: SIZES.padding.small / 2,
  },
  interestText: {
    fontWeight: '500',
    fontSize: SIZES.small,
    color: COLORS.primary,
  },
}); 