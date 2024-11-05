import { StyleSheet } from 'react-native';
import GlobalStyles from '../../globalStyles'; 

const styles = StyleSheet.create({
  button: {
    width: GlobalStyles.BUTTON_WIDTH,
    height: GlobalStyles.BUTTON_HEIGHT,
    borderRadius: GlobalStyles.BUTTON_BORDER_RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GlobalStyles.SIGNIN1_BUTTON_COLOR,
    alignSelf: 'center',
    position: 'absolute', 
    top: 724,
    borderColor: '#000000',
    borderWidth: 1,

  },
  buttonText: {
    fontSize: GlobalStyles.BUTTON_FONT_SIZE,
    fontWeight: 'bold',
    color: GlobalStyles.SIGNIN1_BUTTON_TEXT_COLOR,
    textAlign: 'center',
  },
});

export default styles;