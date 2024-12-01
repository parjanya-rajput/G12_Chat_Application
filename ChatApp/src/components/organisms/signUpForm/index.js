import React, { useState } from "react";
import { View, TouchableOpacity, ActivityIndicator, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import ReusableButton from "../../atoms/ReusableButton/index";
import GlobalStyles from "../../globalStyles";
import styles from "./style";

// Firebase Sign Up
import { signUp } from "../../../firebase/authService";
import { signIn } from "../../../firebase/authService";

// Function to validation
import { validateEmail } from "../../../helper/validateEmail";
import { validatePassword } from "../../../helper/validatePassword";
import CustomInput from "../../atoms/InputField";
import { SafeAreaView } from "react-native-safe-area-context";

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
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const handleEmailChange = (input) => {
    setIsEmailValid(validateEmail(input));
    setEmail(input);
  };

  // Function to handle sign up
  const handleSignUp = () => {
    setIsLoading(true);
    if (user) {
      signIn(email, password)
        .then((user) => {
          if (user) {
            if (user.emailVerified) {
              navigation.replace("CreateProfileScreen", {
                user: user,
              });
            } else alert("Please verify your email address before signing in");
          } else {
            alert("User not found");
          }
          setIsLoading(false);
        })
        .catch((error) => alert(error.message.toString()));
    } else {
      signUp(email, password, name)
        .then((user) => {
          if (user) {
            setUser(user);
            // Display a toast message
            alert(
              "Verification email sent to: " +
              user.email +
              ". Please verify your email to login."
            );
          }
        })
        .catch((error) => alert(error.message));
    }
    setIsLoading(false);
  };

  //Used for debugging
  // const handleSignUp = () => {
  //   navigation.navigate("CreateProfileScreen", {
  //     initialEmail: email,
  //     initialName: name,
  //   });
  // };

  const isButtonEnabled =
    isEmailValid && password.length >= 8 && password === confirmPassword;
  const isFormValid =
    name &&
    email &&
    password &&
    confirmPassword &&
    password === confirmPassword;

  if (isLoading) {
    // Show a loading indicator while Firebase is checking the auth state
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
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
        errorMessage={!isEmailValid && email ? "Invalid email format" : ""} // Show error if email is invalid
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
            validatePassword(confirmPassword) || confirmPassword === password
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
    </SafeAreaView>
  );
};

export default SignUpForm;
