import { StyleSheet, Dimensions } from "react-native";
const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 0.05 * height,
  },
  backButton: {
    position: "absolute",
    left: 20,
  },
  headerTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  profileContainer: {
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  readOnlyEmail: {
    color: "gray",
  },

  profileImageContainer: {
    position: "relative",
    alignItems: "center",
    marginTop: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60, // Makes the image circular
    borderWidth: 2,
    borderColor: "#ddd",
  },
  uploadButtonOnImage: {
    position: "absolute",
    bottom: 0, // Align to the bottom edge of the image
    right: 0, // Align to the right edge of the image
    width: 36,
    height: 36,
    backgroundColor: "#4CAF50",
    borderRadius: 18, // Circular button
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff", // Add a white border for contrast
  },
  usernameInput: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  userHandle: {
    fontSize: 16,
    color: "#aaa",
    textAlign: "center",
    marginBottom: 20,
  },
  statusContainer: {
    backgroundColor: "#000",
    width: "100%",
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center", // Ensures vertical alignment
    justifyContent: "space-between", // Even spacing between elements
    paddingHorizontal: 20,
    marginTop: 5,
    marginBottom: 15,
  },
  activityText: {
    fontSize: 14,
    color: "#fff",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  online: {
    color: "#4CAF50",
  },
  offline: {
    color: "#f00",
  },
  whiteBackgroundSection: {
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    backgroundColor: "#fff",
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 100,
    paddingHorizontal: 10,
  },
  infoCard: {
    backgroundColor: "#f2f2f2",
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: "#888",
  },
  infoInput: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
    // paddingHorizontal: 10,
  },
  scrollViewContent: {
    paddingBottom: 50,
  },
  scrollView: {
    flex: 1,
  },
  saveButtonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
  },
  statusToggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 100,
  },
});

export default styles;
