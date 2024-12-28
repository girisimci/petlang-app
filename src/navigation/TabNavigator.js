import React from 'react';
import { Platform, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { HomeScreen } from '../pages/HomeScreen';
import { EventsScreen } from '../pages/EventsScreen';
import { ChatScreen } from '../pages/ChatScreen';
import { ChatDetailScreen } from '../pages/ChatDetailScreen';
import { LearnScreen } from '../pages/LearnScreen';
import { ProfileScreen } from '../pages/ProfileScreen';
import { EditProfileScreen } from '../pages/EditProfileScreen';

import { COLORS, SIZES } from '../constants/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ChatStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ChatList" 
        component={ChatScreen}
        options={{
          title: 'Sohbetler'
        }}
      />
      <Stack.Screen 
        name="ChatDetail" 
        component={ChatDetailScreen}
        options={{
          headerBackTitle: 'Geri'
        }}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ProfileMain" 
        component={ProfileScreen}
        options={{
          title: 'Profilim'
        }}
      />
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfileScreen}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Ana Sayfa':
              iconName = 'home';
              break;
            case 'Etkinlikler':
              iconName = 'calendar';
              break;
            case 'Sohbet':
              iconName = 'comments';
              break;
            case 'Eğitim':
              iconName = 'graduation-cap';
              break;
            case 'Profilim':
              iconName = 'user';
              break;
          }

          return (
            <View style={{ position: 'relative' }}>
              <FontAwesome 
                name={iconName} 
                size={focused ? size + 4 : size} 
                color={color}
                style={{
                  textShadowColor: 'rgba(0, 0, 0, 0.1)',
                  textShadowOffset: { width: 0, height: 2 },
                  textShadowRadius: 3
                }}
              />
              {route.name === 'Sohbet' && (
                <View style={{
                  position: 'absolute',
                  right: -6,
                  top: -3,
                  backgroundColor: COLORS.error,
                  borderRadius: 10,
                  width: 16,
                  height: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 2,
                  borderColor: COLORS.white,
                }}>
                  <Text style={{
                    color: COLORS.white,
                    fontSize: 10,
                    fontWeight: 'bold',
                  }}>3</Text>
                </View>
              )}
            </View>
          );
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.text,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopWidth: 0,
          height: Platform.select({
            ios: 80 + (insets.bottom > 0 ? insets.bottom - 20 : 0),
            android: 60,
          }),
          paddingBottom: Platform.select({
            ios: insets.bottom > 0 ? 20 : 20,
            android: 10,
          }),
          paddingTop: 10,
          elevation: 20,
          shadowColor: COLORS.black,
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        tabBarLabelStyle: {
          fontSize: SIZES.small,
          fontWeight: '600',
          marginTop: 2,
        },
        tabBarItemStyle: {
          padding: SIZES.padding.small / 2,
        },
        headerStyle: {
          backgroundColor: COLORS.white,
          elevation: 0,
          shadowOpacity: 0,
          height: Platform.select({
            ios: 44 + insets.top,
            android: 60,
          }),
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: SIZES.large,
          color: COLORS.black,
        },
        headerTitleAlign: 'center',
        headerStatusBarHeight: insets.top,
      })}
    >
      <Tab.Screen 
        name="Ana Sayfa" 
        component={HomeScreen}
        options={{
          title: 'PetLang'
        }}
      />
      <Tab.Screen 
        name="Etkinlikler" 
        component={EventsScreen}
        options={{
          title: 'Etkinlikler'
        }}
      />
      <Tab.Screen 
        name="Sohbet" 
        component={ChatStack}
        options={{
          headerShown: false
        }}
      />
      <Tab.Screen 
        name="Eğitim" 
        component={LearnScreen}
        options={{
          title: 'Eğitim'
        }}
      />
      <Tab.Screen 
        name="Profilim" 
        component={ProfileStack}
        options={{
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator; 