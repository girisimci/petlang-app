import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';

const TEMP_COURSES = [
  {
    id: 1,
    title: 'Temel İtaat Eğitimi',
    instructor: 'Ahmet Yılmaz',
    level: 'Başlangıç',
    duration: '4 Hafta',
    rating: 4.8,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb',
    price: 'Premium'
  },
  {
    id: 2,
    title: 'Köpek Davranışlarını Anlama',
    instructor: 'Zeynep Kaya',
    level: 'Orta',
    duration: '3 Hafta',
    rating: 4.9,
    reviews: 256,
    image: 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd',
    price: 'Ücretsiz'
  },
  {
    id: 3,
    title: 'Agility Eğitimi',
    instructor: 'Can Demir',
    level: 'İleri',
    duration: '6 Hafta',
    rating: 4.7,
    reviews: 94,
    image: 'https://images.unsplash.com/photo-1626858144150-06ba054ffe49',
    price: 'Premium'
  }
];

const TEMP_ARTICLES = [
  {
    id: 1,
    title: 'Köpeklerde Stres Belirtileri',
    author: 'Dr. Ayşe Yılmaz',
    readTime: '5 dk',
    image: 'https://images.unsplash.com/photo-1544568100-847a948585b9'
  },
  {
    id: 2,
    title: 'Yavru Köpek Bakımı',
    author: 'Veteriner Mehmet Demir',
    readTime: '8 dk',
    image: 'https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a'
  }
];

const CourseCard = ({ course }) => (
  <TouchableOpacity style={styles.courseCard}>
    <Image source={{ uri: course.image }} style={styles.courseImage} />
    <View style={styles.priceTag}>
      <Text style={styles.priceText}>{course.price}</Text>
    </View>
    <View style={styles.courseContent}>
      <View style={styles.courseHeader}>
        <Text style={styles.courseTitle}>{course.title}</Text>
        <View style={styles.ratingContainer}>
          <FontAwesome name="star" size={14} color={COLORS.warning} />
          <Text style={styles.rating}>{course.rating}</Text>
          <Text style={styles.reviews}>({course.reviews})</Text>
        </View>
      </View>
      <Text style={styles.instructor}>{course.instructor}</Text>
      <View style={styles.courseInfo}>
        <View style={styles.infoItem}>
          <FontAwesome name="signal" size={14} color={COLORS.text} />
          <Text style={styles.infoText}>{course.level}</Text>
        </View>
        <View style={styles.infoItem}>
          <FontAwesome name="clock-o" size={14} color={COLORS.text} />
          <Text style={styles.infoText}>{course.duration}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const ArticleCard = ({ article }) => (
  <TouchableOpacity style={styles.articleCard}>
    <Image source={{ uri: article.image }} style={styles.articleImage} />
    <View style={styles.articleContent}>
      <Text style={styles.articleTitle}>{article.title}</Text>
      <View style={styles.articleInfo}>
        <Text style={styles.articleAuthor}>{article.author}</Text>
        <View style={styles.readTime}>
          <FontAwesome name="clock-o" size={12} color={COLORS.text} />
          <Text style={styles.readTimeText}>{article.readTime}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

export const LearnScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Önerilen Kurslar</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Tümünü Gör</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {TEMP_COURSES.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Faydalı Makaleler</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Tümünü Gör</Text>
            </TouchableOpacity>
          </View>
          {TEMP_ARTICLES.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </View>
      </ScrollView>
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
  section: {
    padding: SIZES.padding.medium,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding.medium,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  seeAll: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
    fontWeight: '600',
  },
  courseCard: {
    width: 280,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.large,
    marginRight: SIZES.padding.medium,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  courseImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: SIZES.radius.large,
    borderTopRightRadius: SIZES.radius.large,
  },
  priceTag: {
    position: 'absolute',
    top: SIZES.padding.medium,
    right: SIZES.padding.medium,
    backgroundColor: COLORS.primary + 'CC',
    paddingHorizontal: SIZES.padding.medium,
    paddingVertical: SIZES.padding.small / 2,
    borderRadius: SIZES.radius.medium,
  },
  priceText: {
    color: COLORS.white,
    fontSize: SIZES.small,
    fontWeight: '600',
  },
  courseContent: {
    padding: SIZES.padding.medium,
  },
  courseHeader: {
    marginBottom: SIZES.padding.small,
  },
  courseTitle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: SIZES.small,
    fontWeight: '600',
    color: COLORS.black,
  },
  reviews: {
    marginLeft: 4,
    fontSize: SIZES.small,
    color: COLORS.text,
  },
  instructor: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginBottom: SIZES.padding.small,
  },
  courseInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 4,
    fontSize: SIZES.small,
    color: COLORS.text,
  },
  articleCard: {
    flexDirection: 'row',
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
    overflow: 'hidden',
  },
  articleImage: {
    width: 100,
    height: 100,
  },
  articleContent: {
    flex: 1,
    padding: SIZES.padding.medium,
  },
  articleTitle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SIZES.padding.small,
  },
  articleInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  articleAuthor: {
    fontSize: SIZES.small,
    color: COLORS.text,
  },
  readTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readTimeText: {
    marginLeft: 4,
    fontSize: SIZES.small,
    color: COLORS.text,
  },
}); 