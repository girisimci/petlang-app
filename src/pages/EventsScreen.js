import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';

const TEMP_EVENTS = [
  {
    id: 1,
    title: 'Köpek Parkı Buluşması',
    date: '24 Mart 2024',
    time: '14:00',
    location: 'Maçka Parkı',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1',
    attendees: 15,
    description: 'Haftalık köpek parkı buluşmamızda köpeklerimizle birlikte eğlenceli vakit geçiriyoruz.',
    type: 'Sosyal'
  },
  {
    id: 2,
    title: 'Temel İtaat Eğitimi',
    date: '25 Mart 2024',
    time: '11:00',
    location: 'PetLang Eğitim Merkezi',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb',
    attendees: 8,
    description: 'Profesyonel eğitmenimiz ile temel itaat komutlarını öğreniyoruz.',
    type: 'Eğitim'
  },
  {
    id: 3,
    title: 'Veteriner Semineri',
    date: '26 Mart 2024',
    time: '16:00',
    location: 'Online',
    image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def',
    attendees: 30,
    description: 'Köpek sağlığı ve bakımı hakkında uzman veterinerimizden bilgiler.',
    type: 'Seminer'
  }
];

const EventCard = ({ event }) => (
  <TouchableOpacity style={styles.eventCard}>
    <Image source={{ uri: event.image }} style={styles.eventImage} />
    <View style={styles.eventTypeTag}>
      <Text style={styles.eventTypeText}>{event.type}</Text>
    </View>
    <View style={styles.eventContent}>
      <Text style={styles.eventTitle}>{event.title}</Text>
      <View style={styles.eventInfo}>
        <FontAwesome name="calendar" size={14} color={COLORS.text} />
        <Text style={styles.eventInfoText}>{event.date} - {event.time}</Text>
      </View>
      <View style={styles.eventInfo}>
        <FontAwesome name="map-marker" size={14} color={COLORS.text} />
        <Text style={styles.eventInfoText}>{event.location}</Text>
      </View>
      <View style={styles.eventInfo}>
        <FontAwesome name="users" size={14} color={COLORS.text} />
        <Text style={styles.eventInfoText}>{event.attendees} Katılımcı</Text>
      </View>
      <Text style={styles.eventDescription} numberOfLines={2}>
        {event.description}
      </Text>
      <TouchableOpacity style={styles.joinButton}>
        <Text style={styles.joinButtonText}>Katıl</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

export const EventsScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={[styles.filterButton, styles.filterButtonActive]}>
              <Text style={[styles.filterButtonText, styles.filterButtonTextActive]}>Tümü</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterButtonText}>Sosyal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterButtonText}>Eğitim</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterButtonText}>Seminer</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={styles.eventsContainer}>
          {TEMP_EVENTS.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.createEventButton}>
        <FontAwesome name="plus" size={24} color={COLORS.white} />
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
  filterContainer: {
    paddingVertical: SIZES.padding.medium,
    paddingHorizontal: SIZES.padding.medium,
    backgroundColor: COLORS.white,
  },
  filterButton: {
    paddingHorizontal: SIZES.padding.medium,
    paddingVertical: SIZES.padding.small,
    borderRadius: SIZES.radius.large,
    backgroundColor: COLORS.background,
    marginRight: SIZES.padding.small,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
  },
  filterButtonText: {
    color: COLORS.text,
    fontSize: SIZES.medium,
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: COLORS.white,
  },
  eventsContainer: {
    padding: SIZES.padding.medium,
  },
  eventCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.large,
    marginBottom: SIZES.padding.medium,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  eventImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: SIZES.radius.large,
    borderTopRightRadius: SIZES.radius.large,
  },
  eventTypeTag: {
    position: 'absolute',
    top: SIZES.padding.medium,
    right: SIZES.padding.medium,
    backgroundColor: COLORS.primary + 'CC',
    paddingHorizontal: SIZES.padding.medium,
    paddingVertical: SIZES.padding.small / 2,
    borderRadius: SIZES.radius.medium,
  },
  eventTypeText: {
    color: COLORS.white,
    fontSize: SIZES.small,
    fontWeight: '600',
  },
  eventContent: {
    padding: SIZES.padding.medium,
  },
  eventTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SIZES.padding.small,
  },
  eventInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.padding.small / 2,
  },
  eventInfoText: {
    fontSize: SIZES.small,
    color: COLORS.text,
    marginLeft: SIZES.padding.small,
  },
  eventDescription: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginTop: SIZES.padding.small,
    marginBottom: SIZES.padding.medium,
  },
  joinButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.padding.small,
    borderRadius: SIZES.radius.medium,
    alignItems: 'center',
  },
  joinButtonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: '600',
  },
  createEventButton: {
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