import React from 'react';
import { View, Text, Button } from 'react-native';
import ReusableButton from '../components/atoms/ReusableButton';

import { logout } from '../firebase/authService';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigation from '../navigations/AuthStackNavigation';


const HomeScreen = ({ navigation }) => {

    const handleLogOut = () => {
        logout()
            .then(() => {
                // <NavigationContainer>
                //     <AuthStackNavigation />
                // </NavigationContainer>
                navigation.replace('OnBoardingScreen');
            })
            .catch((error) => alert(error.message.toString()));
    }

    return (
        <View>
            <ReusableButton
                text="Open Drawer"
                backgroundColor="#4CAF50"
                textColor="#FFFFFF"
                onPress={() => navigation.openDrawer()}
            />
            <ReusableButton
                text="Go to Login"
                backgroundColor="#4CAF50"
                textColor="#FFFFFF"
                onPress={() => navigation.navigate('Login')}
            />
            <ReusableButton
                text="Go to ChatList"
                backgroundColor="#4CAF50"
                textColor="#FFFFFF"
                onPress={() => navigation.navigate('ChatList')}
            />
            <ReusableButton
                text="Go to OnBoardingScreen"
                backgroundColor="#4CAF50"
                textColor="#FFFFFF"
                onPress={() => navigation.navigate('OnBoardingScreen')}
            />
            <ReusableButton
                text="Logout"
                backgroundColor="#4CAF50"
                textColor="#FFFFFF"
                onPress={handleLogOut}
            />
        </View>
    );
};

export default HomeScreen;