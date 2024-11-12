import React from "react";
import { StyleSheet, Text, View } from "react-native";
import EditProfile from "../components/organisms/editProfile/index";

const EditProfileScreen = (props) => {
  return (
    <>
      <EditProfile navigation={props.navigation} />
    </>
  );
};

export default EditProfileScreen;
const styles = StyleSheet.create({});
