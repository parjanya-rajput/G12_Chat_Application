import React from "react";
import { StyleSheet, Text, View } from "react-native";
import EditProfile from "../components/organisms/editProfile/index";
import CreatProfile from "../components/organisms/creatProfile";

const CreatProfileScreen = (props) => {
  return (
    <>
      <CreatProfile navigation={props.navigation} />
    </>
  );
};

export default CreatProfileScreen;
const styles = StyleSheet.create({});