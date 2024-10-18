import React from 'react';
import { View, Text, Button } from 'react-native';

const SignupScreen = ({ navigation }) => {
    return (
        <View>
            <Text>Signup Screen</Text>
            <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
            <Button title="Signup" onPress={() => navigation.replace('Home')} />
        </View>
    );
};

export default SignupScreen;