import { StyleSheet, Dimensions } from "react-native";
const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
    marginTop: 0.05 * height,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    // paddingTop: 50,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  editButton: {
    alignSelf: "center",
    backgroundColor: "black",
    borderRadius: 50,
    padding: 10,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
  },
  statusContainer: {
    backgroundColor: "#000", // Black background
    width: "100%",
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20, // Add padding for left and right spacing
    marginTop: 5,
  },
  activityText: {
    fontSize: 14,
    color: "#fff", // White color for "Activity Status" label
  },
  onlineStatusText: {
    fontSize: 14,
    color: "#4CAF50", // Green color for "Online"
    fontWeight: "bold",
  },
  offlineStatusText: {
    fontSize: 14,
    color: "red", // Green color for "Online"
    fontWeight: "bold",
  },
  profileContainer: {
    overflow: "hidden",
  },
  profile: {},
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
  },
  userHandle: {
    fontSize: 16,
    color: "#aaa",
    textAlign: "center",
    marginBottom: 20,
  },
  contactOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  iconButton: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 25,
  },
  whiteBackgroundSection: {
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 20,
  },
  infoCard: {
    backgroundColor: "#f2f2f2",
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: "#888",
  },
  infoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default styles;
