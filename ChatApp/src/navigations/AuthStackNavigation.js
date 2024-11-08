import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import OnBoardingScreen from '../screens/OnBoardingScreen';
import HomeDrawerNavigation from './HomeDrawerNavigation';
import HomeStackNavigation from './HomeStackNavigation';

import ChatListScreen from '../screens/ChatListScreen';
// import ProfilePicViewScreen from '../screens/ProfilePicViewScreen';
import ChatScreen from '../screens/ChatScreen';
// import ProfileScreen from '../screens/ChatScreen';


const Stack = createStackNavigator();

const AuthStackNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="OnBoardingScreen">
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true }} />
            <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: true }} />
            <Stack.Screen name="Home" component={HomeDrawerNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ChatList" component={ChatListScreen} options={{ headerShown: false }} />
            {/* <Stack.Screen name="ProfilePicView" component={ProfilePicViewScreen} options={{ headerShown: false }}/> */}
            <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
            {/* <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} /> */}
        </Stack.Navigator>
    );
};

export default AuthStackNavigation;