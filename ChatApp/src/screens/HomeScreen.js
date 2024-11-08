import React from 'react';
import { View, Text, Button } from 'react-native';
import ReusableButton from '../components/atoms/ReusableButton';


const HomeScreen = ({ navigation }) => {
    return (
        <View>

            <View>
                <Text>Home Screen</Text>
            </View>
            <View style={{ paddingTop: 10}}>
                <ReusableButton
                    text="Open Drawer"
                    backgroundColor="#4CAF50"
                    textColor="#FFFFFF"
                    onPress={() => navigation.openDrawer()}
                />
            </View>
            <View style={{ paddingTop: 10}}>
                <ReusableButton
                    text="Go to Login"
                    backgroundColor="#4CAF50"
                    textColor="#FFFFFF"
                    onPress={() => navigation.navigate('Login')}
                />
            </View>
            <View style={{ paddingTop: 10}}>
                <ReusableButton
                    text="Go to ChatList"
                    backgroundColor="#4CAF50"
                    textColor="#FFFFFF"
                    onPress={() => navigation.navigate('ChatList')}
                />
            </View>                     
            <Button title="Go to OnBoardingScreen" onPress={() => navigation.navigate('OnBoardingScreen')} />
        </View>
    );
};

export default HomeScreen;