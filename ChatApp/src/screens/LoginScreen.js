import React from 'react';
import { View, Text, Button,TouchableOpacity, Dimensions } from 'react-native';
import ReusableButton from '../components/atoms/ReusableButton';
const { height } = Dimensions.get('window');
const LoginScreen = ({ navigation }) => {
    return (
        <View>
            <Text>Login Screen</Text>
            <Button title="Go to Signup" onPress={() => navigation.navigate('Signup')} />
            <Button title="Login" onPress={() => navigation.replace('Home')} />
            <TouchableOpacity>
                <ReusableButton
                            text="Go to Login"
                            backgroundColor="#4CAF50"
                            textColor="#FFFFFF"
                            onPress={() => navigation.navigate('Signup')}
                            topval={0.75 * height}
                />
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;