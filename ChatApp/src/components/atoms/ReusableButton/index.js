// index.js of Reusable Button

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './style';

const ReusableButton = ({ text, backgroundColor, textColor, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: backgroundColor }]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default ReusableButton;