import React, { useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Text } from "@rneui/themed";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the Icon component
import ReusableButton from "../../atoms/ReusableButton/index";
import GlobalStyles from "../../globalStyles";
import styles from "./style"; // Assuming style.js is your stylesheet

// Firebase Password Reset
import { resetPassword } from "../../../firebase/authService"; // Import your resetPassword function

// Function to validate email
import { validateEmail } from "../../../helper/validateEmail";
import CustomInput from "../../atoms/InputField";

// Import the useNavigation hook
import { useNavigation } from "@react-navigation/native";

const ForgotPasswordForm = () => {
  const navigation = useNavigation(); // Hook to access navigation
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleEmailChange = (input) => {
    setIsEmailValid(validateEmail(input));
    setEmail(input);
  };

  // Function to handle forgot password
  const handleForgotPassword = () => {
    if (isEmailValid) {
      resetPassword(email)
        .then(() => {
          alert("Password reset email sent. Please check your inbox.");
        })
        .catch((error) => alert(error.message));
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()} // Go back on button press
        >
          <Icon name="arrow-back" size={24} color="#000" /> 
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reset Password</Text>
      </View>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../../assets/AppIcon/SpringTalkIcon.png")}
          style={styles.Icon}
        />
      </View>

      <Text style={styles.subtitle}>
        Enter your email address to reset your password.
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
        style={{ fontFamily: "cretype-caros" }}
      />

      <ReusableButton
        text="Reset Password"
        backgroundColor={
          isEmailValid
            ? GlobalStyles.SIGNIN1_BUTTON_COLOR
            : GlobalStyles.SIGNIN_BUTTON_COLOR
        }
        textColor="#FFFFFF"
        onPress={handleForgotPassword}
        disabled={!isEmailValid} // Button enabled only if email is valid
      />
    </View>
  );
};

export default ForgotPasswordForm;