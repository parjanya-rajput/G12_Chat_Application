import { StyleSheet } from "react-native";

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
    paddingTop: 20,
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
    marginTop: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#FFD700",
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
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 5,
  },
  activityText: {
    fontSize: 14,
    color: "#fff",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "bold",
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
    paddingHorizontal: 10,
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
