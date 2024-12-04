import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import ReusableButton from "../../atoms/ReusableButton/index";
import GlobalStyles from "../../globalStyles";
import styles from "./style";
import { signUp, signIn } from "../../../firebase/authService";
import { validateEmail } from "../../../helper/validateEmail";
import { validatePassword } from "../../../helper/validatePassword";
import CustomInput from "../../atoms/InputField";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../../firebase/firebase";

const SignUpForm = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [buttonText, setButtonText] = useState("Sign up");

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        authUser.reload().then(() => {
          setUser(authUser);
          setButtonText(authUser.emailVerified ? "Create Profile" : "Sign up");
        });
      } else {
        setUser(null);
        // setButtonText("Sign up");
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const handleEmailChange = (input) => {
    setIsEmailValid(validateEmail(input));
    setEmail(input);
  };

  const handleSignUp = () => {
    setIsLoading(true);
    if (user) {
      signIn(email, password)
        .then((authUser) => {
          if (authUser.emailVerified) {
            // setButtonText("Sign Up");
            navigation.navigate("CreateProfileScreen", { user: authUser });
          } else {
            alert("Please verify your email address before signing in.");
          }
          setIsLoading(false);
        })
        .catch((error) => {
          alert(error.message);
          setIsLoading(false);
        });
    } else {
      signUp(email, password, name)
        .then((authUser) => {
          if (authUser) {
            setUser(authUser);
            setButtonText("Create Profile");
            alert(
              `Verification email sent to: ${authUser.email}. Please verify your email to log in.`
            );
          }
          setIsLoading(false); // Reset loading state
        })
        .catch((error) => {
          alert(error.message);
          setIsLoading(false);
        });
    }
  };

  const isFormValid =
    name &&
    isEmailValid &&
    password.length >= 8 &&
    password === confirmPassword;

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Text style={styles.title}>Sign up with email</Text>
      <Text style={styles.subtitle}>
        Get chatting with friends and family today by signing up for our chat
        app!
      </Text>

      <CustomInput
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        leftIconName="person"
      />

      <CustomInput
        placeholder="Enter your email"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
        leftIconName="email"
        errorMessage={!isEmailValid && email ? "Invalid email format" : ""}
      />

      <View style={styles.passwordInputContainer}>
        <CustomInput
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
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

      <View style={styles.passwordInputContainer}>
        <CustomInput
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!isConfirmPasswordVisible}
          leftIconName="lock"
          errorMessage={
            validatePassword(confirmPassword) || confirmPassword === password
              ? ""
              : "Password must be at least 8 characters"
          }
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
        text={user && user.emailVerified ? "Create Profile" : buttonText}
        backgroundColor={
          isFormValid
            ? GlobalStyles.SIGNIN1_BUTTON_COLOR
            : GlobalStyles.SIGNIN_BUTTON_COLOR
        }
        textColor="#FFFFFF"
        onPress={handleSignUp}
        disabled={!isFormValid}
      />

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <View style={{ height: "10px", width: "10px" }}>
          <Text style={styles.loginText}>Existing account? Log In</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignUpForm;
