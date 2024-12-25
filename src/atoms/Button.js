import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryButton;
      case 'outline':
        return styles.outlineButton;
      default:
        return styles.primaryButton;
    }
  };

  const getButtonSize = () => {
    switch (size) {
      case 'small':
        return styles.smallButton;
      case 'large':
        return styles.largeButton;
      default:
        return styles.mediumButton;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        getButtonSize(),
        disabled && styles.disabledButton,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.buttonText,
          variant === 'outline' && styles.outlineButtonText,
          disabled && styles.disabledButtonText,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: SIZES.radius.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  secondaryButton: {
    backgroundColor: COLORS.text,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  smallButton: {
    paddingVertical: SIZES.padding.small,
    paddingHorizontal: SIZES.padding.medium,
  },
  mediumButton: {
    paddingVertical: SIZES.padding.medium,
    paddingHorizontal: SIZES.padding.large,
  },
  largeButton: {
    paddingVertical: SIZES.padding.large,
    paddingHorizontal: SIZES.padding.large * 1.5,
  },
  disabledButton: {
    backgroundColor: COLORS.background,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '500',
    fontSize: SIZES.medium,
  },
  outlineButtonText: {
    color: COLORS.primary,
  },
  disabledButtonText: {
    color: COLORS.text,
  },
}); 