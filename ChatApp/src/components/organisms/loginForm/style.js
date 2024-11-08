import { StyleSheet } from 'react-native';
import GlobalStyles from '../../globalStyles'; 
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
      backgroundColor: '#fff',
    },
    title: {
      textAlign: 'center',
      fontSize: 24,
      fontWeight: 'bold',
      color: GlobalStyles.SIGNIN1_BUTTON_COLOR,
      marginBottom: 10,
    },
    subtitle: {
      alignItems: 'center',
      fontSize: 14,
      color: '#666',
      textAlign: 'center',
      marginBottom: 20,
    },
    passwordInputContainer: {
      position: 'relative', // *To place the eye button on top of the password input*
    },
    eyeButton: {
      position: 'absolute',
      right: 10,
      top: 20,
    },
    loginButton: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      marginVertical: 10,
    },
    loginButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    forgotPasswordText: {
      textAlign: 'center',
      color: GlobalStyles.SIGNIN1_BUTTON_COLOR,
      marginTop: 10,
      textDecorationLine: 'underline',
    },
  });
  export default styles;