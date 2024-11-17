import React from 'react';
import { View, Text, Button } from 'react-native';
import ReusableButton from '../components/atoms/ReusableButton';

import { logout } from '../firebase/authService';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigation from '../navigations/BottomTabNavigation';

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
        <View style={{ padding: 20 }}>
            {/* <ReusableButton
                text="Open Drawer"
                backgroundColor="#4CAF50"
                textColor="#FFFFFF"
                onPress={() => navigation.openDrawer()}
            /> */}
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
                text="Go to ForgotPasswordScreen"
                backgroundColor="#4CAF50"
                textColor="#FFFFFF"
                onPress={() => navigation.navigate('ForgetPassword')}
            />
            <ReusableButton
                text="Logout"
                backgroundColor="#4CAF50"
                textColor="#FFFFFF"
                onPress={handleLogOut}
            />
            <ReusableButton
                text="User List"
                backgroundColor="#4CAF50"
                textColor="#FFFFFF"
                onPress={() => navigation.navigate('UserList')}
            />
            <ReusableButton
                text="CreateProfile"
                backgroundColor="#4CAF50"
                textColor="#FFFFFF"
                onPress={() => navigation.navigate('CreateProfileScreen')}
            />
            <ReusableButton
                text="Group list"
                backgroundColor="#4CAF50"
                textColor="#FFFFFF"
                onPress={() => navigation.navigate('GroupList')}
            />
        </View>
    );
};

export default HomeScreen;