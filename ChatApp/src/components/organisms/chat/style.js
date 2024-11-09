import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F3F5",
  },
  header: {
    paddingTop: 50,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4A90E2",
    padding: 10,
  },
  profilePic: {
    width: 45,
    height: 45,
    borderRadius: 15,
    marginHorizontal: 10,
  },
  headerContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    flex: 1,
  },
  profileName: {
    fontFamily: "Caros-Bold",
    color: "white",
    fontSize: 18,
  },
  accountType: {
    fontFamily: "cretype-caros",
    color: "#DDE6ED",
    fontSize: 14,
  },
  headerIcons: {
    flexDirection: "row",
  },
  videocallButton: {
    marginHorizontal: 12,
  },
  audiocallButton: {
    marginHorizontal: 5,
  },
  moreoptButton: {
    marginHorizontal: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 8,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  input: {
    fontFamily: "cretype-caros",
    flex: 1,
    backgroundColor: "#eaeaea",
    color: "#333333",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    paddingVertical: 5,
  },
  paperclipIcon: {
    marginHorizontal: 5,
  },
  cameraButton: {
    backgroundColor: "black",
    padding: 8,
    margin: 5,
    borderRadius: 32,
  },
  micButton: {
    backgroundColor: "#4A90E2",
    padding: 8,
    borderRadius: 32,
  },
  emojiButton: {
    backgroundColor: "white",
    padding: 0,
    margin: 2,
    borderRadius: 32,
  },
});

export default styles;
