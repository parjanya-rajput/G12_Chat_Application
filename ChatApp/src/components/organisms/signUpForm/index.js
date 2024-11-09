import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import ReusableButton from "../../atoms/ReusableButton/index";
import GlobalStyles from "../../globalStyles";
import styles from "./style";

// Firebase Sign Up
import { signUp } from "../../../firebase/authService";

// Function to validation
import { validateEmail } from "../../../helper/validateEmail";
import { validatePassword } from "../../../helper/validatePassword";
import CustomInput from "../../atoms/InputField";

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
          // Display a toast message
          alert(
            "Verification email sent to: " +
              user.email +
              ". Please verify your email to login."
          );
          navigation.replace("Login"); // Navigate to Home after sign up
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
      <CustomInput
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        autoCapitalize="words" // Capitalize each word
        leftIconName="person" // Set the left icon to "person"
        style={{ fontFamily: "cretype-caros" }}
      />

      {/* Email Input Field */}
      <CustomInput
        placeholder="Enter your email"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address" // Set keyboard type for email input
        autoCapitalize="none" // Disable auto-capitalization for email
        leftIconName="email" // Set the left icon to "email"
        errorMessage={isEmailValid ? "" : "Invalid email format"} // Show error if email is invalid
        style={{ fontFamily: "cretype-caros" }}
      />

      {/* Password Input Field */}
      <View style={styles.passwordInputContainer}>
        <CustomInput
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
          textContentType="oneTimeCode" // Prevent suggestions on password field
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

      {/* Confirm Password Input Field */}
      <View style={styles.passwordInputContainer}>
        <CustomInput
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!isConfirmPasswordVisible} // Toggle password visibility
          textContentType="oneTimeCode" // Prevent keyboard suggestions
          leftIconName="lock" // Set the left icon to "lock"
          errorMessage={
            validatePassword(password) || confirmPassword === password
              ? ""
              : "Password must be at least 8 characters"
          } // Show error if passwords don't match or are invalid
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() =>
            setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
          }>
          <Icon
            name={isConfirmPasswordVisible ? "eye" : "eye-slash"}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <ReusableButton
        text="Sign up"
        backgroundColor={
          isFormValid
            ? GlobalStyles.SIGNIN1_BUTTON_COLOR
            : GlobalStyles.SIGNIN_BUTTON_COLOR
        }
        textColor="#FFFFFF" // or any other color you prefer
        onPress={handleSignUp}
        topval={0} // adjust top value as needed
        disabled={!isFormValid}
      />
    </View>
  );
};

export default SignUpForm;
