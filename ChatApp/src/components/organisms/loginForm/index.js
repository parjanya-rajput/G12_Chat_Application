import React, { useState } from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Text } from '@rneui/themed';

// Styles import
import GlobalStyles from '../../globalStyles';
import styles from './style';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

//Import the Firebase Login
import { signIn } from '../../../firebase/authService';

// Import validation
import { validateEmail } from '../../../helper/validateEmail';
import { validatePassword } from '../../../helper/validatePassword';
import HomeStackNavigation from '../../../navigations/HomeStackNavigation';

const LoginForm = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // *State for toggling password visibility*
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (input) => {
    setIsEmailValid(validateEmail(input));
    setEmail(input);
  };

  const isFormValid = email && password;

  const handleSignIn = () => {
    setIsLoading(true);
    signIn(email, password)
      .then((user) => {
        if (user) {
          if (user.emailVerified) {
            //change to homestack and delete the authstack
            // <NavigationContainer>
            //   <HomeStackNavigation />
            // </NavigationContainer>
            navigation.replace('Home');
            setIsLoading(false);
          }
          else
            alert('Please verify your email address before signing in');
          //Handle the resend the verification email edge case
        }
      })
      .catch((error) => alert(error.message.toString()));
  }
  if (isLoading) {
    // Show a loading indicator while Firebase is checking the auth state
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in to SpringTalk</Text>
      <Text style={styles.subtitle}>
        Welcome back! Sign in using your social account or email to continue us
      </Text>

      <Input
        placeholder="Enter your email"
        value={email}
        onChangeText={handleEmailChange}
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
            validatePassword(password)
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
        onPress={handleSignIn}
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