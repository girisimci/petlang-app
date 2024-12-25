import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

export const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry,
  keyboardType = 'default',
  style,
  inputStyle,
  labelStyle,
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          inputStyle,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.text}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.padding.medium,
  },
  label: {
    fontWeight: '500',
    color: COLORS.black,
    marginBottom: SIZES.padding.small,
    fontSize: SIZES.medium,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.background,
    borderRadius: SIZES.radius.small,
    padding: SIZES.padding.medium,
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    fontSize: SIZES.small,
    color: COLORS.error,
    marginTop: SIZES.padding.small,
  },
}); 