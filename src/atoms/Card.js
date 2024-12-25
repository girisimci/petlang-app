import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

export const Card = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.medium,
    padding: SIZES.padding.medium,
    ...Platform.select({
      ios: {
        ...SHADOWS.light,
      },
      android: {
        elevation: 3,
      },
    }),
  },
}); 