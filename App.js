import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import TabNavigator from './src/navigation/TabNavigator';
import { COLORS } from './src/constants/theme';
import { SettingsScreen } from './src/pages/SettingsScreen';
import { ChatDetailScreen } from './src/pages/ChatDetailScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const SplashScreen = ({ onFinish }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.3));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(onFinish, 2000);
  }, []);

  return (
    <View style={styles.splashContainer}>
      <Animated.View
        style={[
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={styles.splashText}>PetLang</Text>
      </Animated.View>
    </View>
  );
};

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        {isLoading ? (
          <SplashScreen onFinish={() => setIsLoading(false)} />
        ) : (
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen 
                name="TabNavigator" 
                component={TabNavigator} 
                options={{ headerShown: false }}
              />
              <Stack.Screen 
                name="ChatDetail" 
                component={ChatDetailScreen}
                options={{ title: '' }}
              />
              <Stack.Screen 
                name="Settings" 
                component={SettingsScreen}
                options={{ title: 'Ayarlar' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#38D430',
  },
});
