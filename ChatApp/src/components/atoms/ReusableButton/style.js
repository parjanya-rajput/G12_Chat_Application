import { StyleSheet, Dimensions } from "react-native";
import GlobalStyles from "../../globalStyles";

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  button: {
    width: GlobalStyles.BUTTON_WIDTH,
    height: GlobalStyles.BUTTON_HEIGHT,
    borderRadius: GlobalStyles.BUTTON_BORDER_RADIUS,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GlobalStyles.SIGNIN1_BUTTON_COLOR,
    alignSelf: "center",
    position: "relative",
    top: 10,
    borderColor: "#000000",
    borderWidth: 1,
  },

  buttonText: {
    fontFamily: "Caros-Bold",
    fontSize: GlobalStyles.BUTTON_FONT_SIZE,
    color: GlobalStyles.SIGNIN1_BUTTON_TEXT_COLOR,
    textAlign: "center",
  },
});

export default styles;
