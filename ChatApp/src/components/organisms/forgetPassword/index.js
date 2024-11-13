import React, { useState } from "react";
import { View ,Image} from "react-native";
import { Text } from "@rneui/themed";
import ReusableButton from "../../atoms/ReusableButton/index";
import GlobalStyles from "../../globalStyles";
import styles from "./style"; // Assuming style.js is your stylesheet

// Firebase Password Reset
import { resetPassword } from "../../../firebase/authService"; // Import your resetPassword function

// Function to validate email
import { validateEmail } from "../../../helper/validateEmail";
import CustomInput from "../../atoms/InputField";

const ForgotPasswordForm = () => {
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
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../../assets/AppIcon/SpringTalkIcon.png")}
            style={styles.Icon}
          />
        </View>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.subtitle}>
        Enter your email address to reset your password.
      </Text>

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
