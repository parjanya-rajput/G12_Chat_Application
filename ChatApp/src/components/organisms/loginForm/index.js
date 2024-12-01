// LoginForm.js
import React, { useState } from 'react';
import { View, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

// Import styles and reusable components
import GlobalStyles from "../../globalStyles";
import styles from "./style";
import ReusableButton from "../../atoms/ReusableButton/index"; // Import ReusableButton

// Import Firebase and validation helpers
import { signIn } from "../../../firebase/authService";
import { validateEmail } from "../../../helper/validateEmail";
import { validatePassword } from "../../../helper/validatePassword";
import CustomInput from "../../atoms/InputField";
import HomeStackNavigation from '../../../navigations/HomeStackNavigation';

const LoginForm = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
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
            <HomeStackNavigation />;
          }
          else alert('Please verify your email address before signing in');
        } else {
          alert('User not found');
        }
      })
      .catch((error) => alert(error.message.toString()));
    setIsLoading(false);
  };

  if (isLoading) {
    // Show a loading indicator while Firebase is checking the auth state
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <Text style={styles.title}>Log in to Chatbox</Text>
      <Text style={styles.subtitle}>
        Welcome back! Sign in using your social account or email to continue us
      </Text>

      {/* Email Input Field */}
      <CustomInput
        placeholder="Enter your email"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
        leftIconName="email"
        errorMessage={!isEmailValid && email ? "Invalid email format" : ""}
      />

      {/* Password Input Field */}
      <View style={styles.passwordInputContainer}>
        <CustomInput
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
          textContentType="oneTimeCode"
          leftIconName="lock"
          errorMessage={
            validatePassword(password)
              ? ""
              : "Password must be at least 8 characters"
          }
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Icon
            name={isPasswordVisible ? "eye" : "eye-slash"}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      {/* ReusableButton for Login */}
      <ReusableButton
        text="Log in"
        backgroundColor={
          isFormValid
            ? GlobalStyles.SIGNIN1_BUTTON_COLOR
            : GlobalStyles.SIGNIN_BUTTON_COLOR
        }
        textColor="#FFFFFF"
        onPress={handleSignIn}
        disabled={!isFormValid}
      />

      <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginForm;
