import React from "react";
import { View, Text, Dimensions } from "react-native";
import ReusableButton from "../components/atoms/ReusableButton";
import { useNavigation } from "@react-navigation/native";

const EditProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Edit Profile Screen</Text>
    </View>
  );
};

export default EditProfileScreen;