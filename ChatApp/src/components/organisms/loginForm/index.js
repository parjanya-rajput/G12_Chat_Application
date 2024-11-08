import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Text } from '@rneui/themed';
import GlobalStyles from '../../globalStyles';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
const LoginForm = () => {
    const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // *State for toggling password visibility*

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(input));
    setEmail(input);
  };

  const isButtonEnabled = isEmailValid && password.length >= 8;
  const isFormValid = email && password;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in to Chatbox</Text>
      <Text style={styles.subtitle}>
        Welcome back! Sign in using your social account or email to continue us
      </Text>

      <Input
        placeholder="Enter your email"
        value={email}
        onChangeText={validateEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        leftIcon={{ type: 'material', name: 'email' }}
        errorMessage={isEmailValid || email.length === 0 ? '' : 'Invalid email format'}
      />

      <View style={styles.passwordInputContainer}> 
        <Input
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible} // *Toggle visibility based on state*
          leftIcon={{ type: 'material', name: 'lock' }}
          errorMessage={
            password.length === 0 || password.length >= 6
              ? ''
              : 'Password must be at least 8 characters'
          }
        />
        <TouchableOpacity
          style={styles.eyeButton} 
          onPress={() => setIsPasswordVisible(!isPasswordVisible)} // *Toggle password visibility*
        >
          <Icon
            name={isPasswordVisible ? 'eye' : 'eye-slash'} // *Change icon based on visibility*
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.loginButton, { backgroundColor: isFormValid ? GlobalStyles.SIGNIN1_BUTTON_COLOR : GlobalStyles.SIGNIN_BUTTON_COLOR }]}
        disabled={!isFormValid}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LoginForm;