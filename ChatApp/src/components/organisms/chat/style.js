import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  // Chat container
  container: {
    flex: 1,
    backgroundColor: "#F2F3F5",
  },

  // Header section
  header: {
    paddingTop: 20,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  backButton: {
    padding: 5,
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
    color: "black",
    fontSize: 18,
  },
  accountType: {
    fontFamily: "cretype-caros",
    color: "black",
    fontSize: 14,
  },
  headerIcons: {
    flexDirection: "row",
  },
  searchButton: {
    marginHorizontal: 12,
  },
  searchBar: {
    padding: 10,
    margin: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
    paddingLeft: 40, // Add padding for the search icon
  },
  audiocallButton: {
    marginHorizontal: 5,
  },
  moreoptButton: {
    marginHorizontal: 5,
  },

  // Message display styles
  messageContainer: {
    maxWidth: "80%",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6", // Light green for sent messages
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#ECECEC", // Light grey for received messages
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  timestamp: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
    alignSelf: "flex-end",
  },

  // Input section
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
    marginVertical: 15,
    alignItems: "center",
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
  autocompleteButton: {
    padding: 8,
    backgroundColor: "#ffffff",
    borderRadius: 25,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    marginLeft: 2,
    marginRight: 4,
  },
  responseLoader: {
    padding: 8,
    backgroundColor: "#ffffff",
    borderRadius: 25,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    marginLeft: 2,
    marginRight: 4,
  },
  cameraButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 25,
    elevation: 2,
    margin: 5,
  },
  micButton: {
    backgroundColor: "#4A90E2",
    padding: 8,
    borderRadius: 32,
  },
  emojiButton: {
    backgroundColor: "white",
    padding: 0,
    marginHorizontal: 1,
    borderRadius: 32,
  },
  sendButton: {
    backgroundColor: "white", // Green background for send button
    padding: 10,
    borderRadius: 25,
    elevation: 2,
    marginHorizontal: 1,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: width * 0.85,
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
    alignItems: "center",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  closeButtonProfile: {
    alignSelf: "center",
    position: "relative",
    // top: 10,
    // right: 10,
    backgroundColor: "#000",
    borderRadius: 60,
    padding: 10,
  },
  modalImage: {
    width: "100%",
    height: width * 0.85,
  },
  modalName: {
    fontFamily: "Caros-Heavy",
    fontSize: 22,
    // marginVertical: 15,
    color: "#333",
  },
  fullScreenButton: {
    backgroundColor: "#609d95",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  fullScreenText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  fullScreenOverlay: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenImage: {
    width: "100%",
    height: "100%",
  },
  closeButtonFullScreen: {
    position: "relative",
    top: 40,
    right: 20,
    backgroundColor: "green",
    borderRadius: 20,
    padding: 10,
  },

  SuggestionBox: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    zIndex: 2,
    overflow: "hidden",
  },
  SuggestionBoxText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#609d95",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backgroundBlur: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  mainContent: {
    flex: 1,
    zIndex: 1,
  },
  okButton: {
    backgroundColor: "#609d95",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    marginLeft: 20,
  },

  okButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  SuggestionBoxButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 10,
  },
});

export default styles;
