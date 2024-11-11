//Html CSS style
import { StyleSheet,Dimensions } from 'react-native';
import GlobalStyles from '../../globalStyles'; 
const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
      backgroundColor: '#fff',
    },

    Icon: {
      width: GlobalStyles.ONBOARDING_SPLASH_LOGO_WIDTH * 1,
      height: GlobalStyles.ONBOARDING_SPLASH_LOGO_HEIGHT * 5,
    },
    
    logoContainer: {
      flexDirection: 'row',
      justifyContent: 'center',  // Center horizontally
      alignItems: 'center',      // Center vertically
      top: -0.1* height,
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
  });
  
  export default styles;