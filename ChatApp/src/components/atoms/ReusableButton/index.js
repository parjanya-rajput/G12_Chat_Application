import React from "react";
import { TouchableOpacity, Text, Dimensions } from "react-native";
import styles from "./style";

const ReusableButton = ({
  text,
  backgroundColor,
  textColor,
  onPress,
  topval,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: disabled ? "#cccccc" : backgroundColor,
          top: topval,
        },
        disabled && styles.disabledButton, // Optional style for disabled state
      ]}
      onPress={disabled ? null : onPress}
      disabled={disabled}>
      <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ReusableButton;
