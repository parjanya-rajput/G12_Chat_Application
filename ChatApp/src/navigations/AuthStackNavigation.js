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
import UserListScreen from "../screens/UserListScreen";
import CreateProfileScreen from "../screens/CreateProfileScreen";
import AllUserScreen from "../screens/AllUserListScreen";
// import HomeScreen from '../screens/HomeScreen';
import GroupListScreen from "../screens/GroupListScreen";
import CreateGroup from "../screens/CreateGroup";
import GroupDetailsScreen from "../screens/GroupDetailScreen";
import AddMemberScreen from "../screens/AddMemberScreen";

import UserProfileScreen from "../screens/UserProfileScreen";
import ProfilePicView from "../screens/ProfilePicView";
import GroupChatScreen from "../screens/GroupChatScreen";

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
            {/* <Stack.Screen name="ChatList" component={ChatListScreen} options={{ headerShown: true }} /> */}
            {/* <Stack.Screen name="ProfilePicView" component={ProfilePicViewScreen} options={{ headerShown: false }}/> */}
            <Stack.Screen
                name="Chat"
                component={ChatScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="UserList"
                component={UserListScreen}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="CreateProfileScreen"
                component={CreateProfileScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AllUserScreen"
                component={AllUserScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CreateGroup"
                component={CreateGroup}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="GroupList"
                component={GroupListScreen}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="GroupDetails"
                component={GroupDetailsScreen}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="AddMember"
                component={AddMemberScreen}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="UserProfileScreen"
                component={UserProfileScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ProfilePicView"
                component={ProfilePicView}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="GroupChatScreen"
                component={GroupChatScreen}
                options={{ headerShown: true }}
            />

        </Stack.Navigator>

    );
};

export default AuthStackNavigation;
