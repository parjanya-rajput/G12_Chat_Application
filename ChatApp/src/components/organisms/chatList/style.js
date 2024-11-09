import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    backgroundColor: "#000",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 30,
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
});

export default styles;
