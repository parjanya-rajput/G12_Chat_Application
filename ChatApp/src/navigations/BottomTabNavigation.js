import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import ChatListScreen from '../screens/ChatListScreen';
import { Animated } from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'ChatList') {
            iconName = 'chatbubble-ellipses-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          }

          const animatedSize = focused ? size + 5 : size;
          return (
            <Animated.View style={{ transform: [{ scale: focused ? 1.1 : 1 }] }}>
              <Ionicons
                name={iconName}
                size={animatedSize}
                color={color}
                style={{
                  textShadowColor: focused ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
                  textShadowRadius: 8,
                  textShadowOffset: { width: 1, height: 1 },
                }}
              />
            </Animated.View>
          );
        },
        tabBarActiveTintColor: '#4CAF50', // A lively green color for active tab
        tabBarInactiveTintColor: '#757575', // Gray for inactive tabs
        tabBarStyle: {
          backgroundColor: '#ffffff', // Lighter background color
          borderTopWidth: 0,
          elevation: 8,
          height: 70,
          paddingBottom: 5,
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowOffset: { width: 0, height: -1 },
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarItemStyle: {
          paddingVertical: 5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="ChatList" component={ChatListScreen} options={{ tabBarLabel: 'Chats' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
