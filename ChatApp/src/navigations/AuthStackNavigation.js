import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import OnBoardingScreen from '../screens/OnBoardingScreen';
import HomeDrawerNavigation from './HomeDrawerNavigation';
import HomeStackNavigation from './HomeStackNavigation';
const Stack = createStackNavigator();

const AuthStackNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeDrawerNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default AuthStackNavigation;