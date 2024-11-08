import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ImageBackground, StatusBar } from 'react-native';
import styles from '../onBoardingForm/Styles';

// Import ReusableButton component
import ReusableButton from '../../../components/atoms/ReusableButton/index';
const { height } = Dimensions.get('window');
const OnBoradingForm = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../../../assets/background.png')} // Replace with your background image path
      style={styles.backgroundImage} // Add a new style for background
    // resizeMode="cover" // Optional: make sure the image covers the whole area
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../../../../assets//Logo.png')} style={styles.Icon} />
        </View>
        <Text style={styles.title}>Connect </Text>
        <Text style={styles.title}>friends </Text>
        <Text style={styles.title1}>easily & </Text>
        <Text style={styles.title1}>quickly</Text>
        <Text style={styles.subtitle}>
          Our chat app is the perfect way to stay connected with friends and family.
        </Text>

        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../../../../assets/facebook.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../../../../assets/google.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../../../../assets/apple.png')} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.line} />
        </View>


        <TouchableOpacity>
          <ReusableButton
            text="Sign up with mail"
            backgroundColor="#FFFFFF"
            textColor="#000E08"
            onPress={() => navigation.navigate('Signup')}
            topval={0.06 * height}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginTextContainer}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginText}>
            Existing account? <Text style={styles.loginLink}>Log in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default OnBoradingForm;
