import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import OnBoardingScreen from "../screens/OnBoardingScreen";
// import HomeDrawerNavigation from './HomeDrawerNavigation';
// import HomeStackNavigation from './HomeStackNavigation';
import ForgetPassword from "../screens/ForgotPasswordScreen";
import ChatListScreen from "../screens/ChatListScreen";
// import ProfilePicViewScreen from '../screens/ProfilePicViewScreen';
import ChatScreen from "../screens/ChatScreen";
// import ProfileScreen from '../screens/ChatScreen';
import BottomTabNavigation from "./BottomTabNavigation";
import EditProfileScreen from "../screens/EditProfileScreen";
import CreatProfileScreen from "../screens/CreatProfileScreen"
// import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const AuthStackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="OnBoardingScreen">
      <Stack.Screen
        name="OnBoardingScreen"
        component={OnBoardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={BottomTabNavigation}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name="ChatList" component={ChatListScreen} options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="ProfilePicView" component={ProfilePicViewScreen} options={{ headerShown: false }}/> */}
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} /> */}
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreatProfileScreen"
        component={CreatProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigation;