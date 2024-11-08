import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Text } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

import GlobalStyles from "../../globalStyles";
import styles from "./style";

//  Firebase Sign Up
import { signUp } from "../../../firebase/authService";

// Function to validatation
import { validateEmail } from "../../../helper/validateEmail";
import { validatePassword } from "../../../helper/validatePassword";


const SignUpForm = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false); // State for toggling confirm password visibility

  const handleEmailChange = (input) => {
    setIsEmailValid(validateEmail(input));
    setEmail(input);
  };

  // Function to handle sign up
  const handleSignUp = () => {
    signUp(email, password, name)
      .then((user) => {
        if (user) {
          //Display an toast message
          alert("Verification email sent to: " + user.email + ". Please verify your email to login.");
          navigation.replace('Login'); // Navigate to Home after sign up
        }
      })
      .catch((error) => alert(error.message));
  };

  const isButtonEnabled =
    isEmailValid && password.length >= 8 && password === confirmPassword;
  const isFormValid =
    name &&
    email &&
    password &&
    confirmPassword &&
    password === confirmPassword;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up with email</Text>
      <Text style={styles.subtitle}>
        Get chatting with friends and family today by signing up for our chat
        app!
      </Text>

      {/* Name Input Field */}
      <Input
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        leftIcon={{ type: "material", name: "person" }}
      />

      {/* Email Input Field */}
      <Input
        placeholder="Enter your email"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
        leftIcon={{ type: "material", name: "email" }}
        errorMessage={
          isEmailValid || email.length === 0 ? "" : "Invalid email format"
        }
      />

      {/* Password Input Field */}
      <View style={styles.passwordInputContainer}>
        <Input
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
          leftIcon={{ type: "material", name: "lock" }}
          errorMessage={
            validatePassword(password) ? "" : "Password must be at least 8 characters"
          }
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Icon
            name={isPasswordVisible ? "eye" : "eye-slash"}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      {/* Confirm Password Input Field */}
      <View style={styles.passwordInputContainer}>
        <Input
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!isConfirmPasswordVisible}
          leftIcon={{ type: "material", name: "lock" }}
          errorMessage={
            validatePassword(password) || confirmPassword === password ? "" : "Password must be at least 8 characters"
          }
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
        >
          <Icon
            name={isConfirmPasswordVisible ? "eye" : "eye-slash"}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      {/* Log In Button */}
      <TouchableOpacity
        style={[
          styles.signupButton,
          {
            backgroundColor: isFormValid
              ? GlobalStyles.SIGNIN1_BUTTON_COLOR
              : GlobalStyles.SIGNIN_BUTTON_COLOR,
          },
        ]}
        disabled={!isFormValid}
        onPress={handleSignUp}
      >
        <Text style={styles.signupButtonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpForm;
