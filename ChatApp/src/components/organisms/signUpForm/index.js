import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Text } from "@rneui/themed";
import GlobalStyles from "../../globalStyles";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";

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

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(input));
    setEmail(input);
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
        onChangeText={validateEmail}
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
            password.length === 0 || password.length >= 8
              ? ""
              : "Password must be at least 8 characters"
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
            confirmPassword.length === 0 || confirmPassword === password
              ? ""
              : "Passwords do not match"
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
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.signupButtonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpForm;
