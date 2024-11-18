import { StyleSheet } from "react-native";
import GlobalStyles from "../../globalStyles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff", // White background
  },
  header: {
    position: "absolute", 
    top: 40,
    left: 20,
    flexDirection: "row", 
    alignItems: "center",
    zIndex: 1, // To keep it on top of other elements
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#000", // Text color for header
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40, // Space between logo and other elements
  },
  Icon: {
    width: 100, // Set the width for the logo
    height: 100, // Set the height for the logo
    resizeMode: "contain", // Ensure logo maintains aspect ratio
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#333", // Subtitle color
  },
  inputContainer: {
    width: "100%", 
    marginBottom: 20,
  },
});

export default styles;
