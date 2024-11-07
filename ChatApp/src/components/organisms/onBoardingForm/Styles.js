// Import necessary modules and dimensions
import { StyleSheet, Dimensions } from 'react-native';
import GlobalStyles from '../../globalStyles'; // Assuming GlobalStyles is defined in a separate file

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: GlobalStyles.ONBOARDING_CONTAINER_BUTTON_WIDTH, // Adjust for general padding
  },

  backgroundImage: {
    flex: 1,
    // backgroundColor: GlobalStyles.SIGNIN_BACKGROUND_COLOR,
  },

  Icon: {
    width: GlobalStyles.ONBOARDING_SPLASH_LOGO_WIDTH,
    height: GlobalStyles.ONBOARDING_SPLASH_LOGO_HEIGHT,
  },
  
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    top: -0.04 * height,
  },

  title: {
    color: GlobalStyles.ONBOARDING_TITLE_COLOR,
    fontSize: GlobalStyles.ONBOARDING_TITLE_FONT_SIZE, // Increased scale for larger text
    fontFamily: 'Caros-Medium',
    textAlign: 'left',
    width: '100%',
    lineHeight: GlobalStyles.ONBOARDING_TITLE_LINE_HEIGHT, // Increased line height for better spacing
    marginVertical: GlobalStyles.ONBOARDING_TITLE_MARGIN, // Slightly larger margin
    paddingHorizontal: GlobalStyles.ONBOARDING_PADDING_HORIZONTAL, // Slightly larger padding
    top: 0.02 * height, // Slightly adjusted top positioning
},


  title1: {
    color: GlobalStyles.ONBOARDING_TITLE_COLOR,
    fontSize: GlobalStyles.ONBOARDING_TITLE1_FONT_SIZE,
    fontFamily: 'Caros-Heavy',
    textAlign: 'left',
    width: '100%',
    lineHeight: GlobalStyles.ONBOARDING_TITLE_LINE_HEIGHT,
    marginVertical: GlobalStyles.ONBOARDING_TITLE1_MARGIN,
    paddingHorizontal: GlobalStyles.ONBOARDING_PADDING_HORIZONTAL,
    top: 0.03 * height,
  },
  
  subtitle: {
    color: GlobalStyles.TEXT_FONT_COLOR,
    fontSize: GlobalStyles.ONBOARDING_SUBTITLE_FONT_SIZE,
    fontFamily: 'Caros-Medium',
    textAlign: 'left',
    width: '100%',
    paddingHorizontal: GlobalStyles.ONBOARDING_PADDING_HORIZONTAL,
    marginBottom: GlobalStyles.ONBOARDING_SUBTITLE_MARGIN,
    top: 0.05 * height,
  },

  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginVertical: GlobalStyles.ONBOARDING_SOCIALBUTTON_MARGIN,
    top: 0.05 * height,
  },

  socialButton: {
    width: GlobalStyles.ONBOARDING_SOCIALBUTTON_HW,
    height: GlobalStyles.ONBOARDING_SOCIALBUTTON_HW,
    borderRadius: GlobalStyles.ONBOARDING_SOCIALBUTTON_RADIUS,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: GlobalStyles.ONBOARDING_TITLE_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },

  socialIcon: {
    width: GlobalStyles.ONBOARDING_SOCIALICON_HW,
    height: GlobalStyles.ONBOARDING_SOCIALICON_HW,
  },

  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: GlobalStyles.ONBOARDING_TITLE1_MARGIN,
    top: 0.05 * height,
  },
  
  line: {
    flex: 1,
    height: 1,
    backgroundColor: GlobalStyles.ONBOARDING_RULER_COLOR,
    marginHorizontal: GlobalStyles.ONBOARDING_LINE_MARGIN,
  },
  
  orText: {
    color: GlobalStyles.ONBOARDING_OR_COLOR,
    fontSize: GlobalStyles.ONBOARDING_OR_FONT_SIZE,
    fontFamily: 'Caros-Medium',
  },

  loginTextContainer: {
    marginTop: GlobalStyles.ONBOARDING_TEXT_FONT_SIZE,
    top: 0.08 * height,
  },

  loginText: {
    color: GlobalStyles.ONBOARDING_SUBTITLE_COLOR,
    fontSize: GlobalStyles.ONBOARDING_SUBTITLE_FONT_SIZE,
    fontFamily: 'Caros-Medium',
  },

  loginLink: {
    color: GlobalStyles.ONBOARDING_TITLE_COLOR,
    fontWeight: 'bold',
    fontFamily: 'Caros-Heavy',
  },
});
