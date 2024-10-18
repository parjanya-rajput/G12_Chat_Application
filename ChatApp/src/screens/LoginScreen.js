import React from 'react';
import { View, Text, Button } from 'react-native';

const LoginScreen = ({ navigation }) => {
    return (
        <View>
            <Text>Login Screen</Text>
            <Button title="Go to Signup" onPress={() => navigation.navigate('Signup')} />
            <Button title="Login" onPress={() => navigation.replace('Home')} />
        </View>
    );
};

export default LoginScreen;