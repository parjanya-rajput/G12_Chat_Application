//src/SignupScreeeen
import React from "react";
import { View, Text, Button } from "react-native";
import SignUpForm from "../components/organisms/signUpForm/index";

const SignUpScreen = (props) => {
  return <SignUpForm navigation={props.navigation} />;
};

export default SignUpScreen;
