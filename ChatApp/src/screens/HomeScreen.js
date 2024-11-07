import React from 'react';
import { View, Text, Button } from 'react-native';
const HomeScreen = ({ navigation }) => {
    return (
        <View>
            <Text>Home Screen</Text>
            <Button title="Open Drawer" onPress={() => navigation.openDrawer()} />
            <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
            <Button title="Go to OnBoardingScreen" onPress={() => navigation.navigate('OnBoardingScreen')} />
        </View>
    );
};

export default HomeScreen;