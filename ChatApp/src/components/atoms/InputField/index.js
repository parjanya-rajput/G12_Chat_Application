// components/InputFields/CustomInput.js

import React from 'react';
import { Input } from 'react-native-elements';

const CustomInput = ({
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  autoCapitalize = 'none',
  secureTextEntry = false,
  textContentType = 'none', // Add textContentType as a prop
  leftIconType = 'material',
  leftIconName,
  errorMessage = '',
}) => {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      secureTextEntry={secureTextEntry}
      textContentType={textContentType} // Apply textContentType
      leftIcon={{ type: leftIconType, name: leftIconName }}
      errorMessage={errorMessage}
    />
  );
};

export default CustomInput;