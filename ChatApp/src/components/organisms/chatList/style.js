import { StyleSheet } from "react-native";
import GlobalStyles from "../../globalStyles";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    backgroundColor: "#000",
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontFamily: "Caros-Bold",
    color: "#fff",
    fontSize: 24,
  },
  searchButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 25,
  },
  profileSliderContainer: {
    overflow: "hidden",
  },
  profileSlider: {
    paddingVertical: 10,
    backgroundColor: "#000",
    marginBottom: 20,
  },
  profilePicWrapper: {
    marginHorizontal: 12,
  },
  profilePic: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: "#fff",
  },
  whiteBackgroundSection: {
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    flex: 1,
  },

  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },



  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: GlobalStyles.SIGNIN1_BUTTON_COLOR, // Change to your preferred color
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
});

export default styles;
