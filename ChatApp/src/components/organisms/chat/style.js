import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // Chat container
  container: {
    flex: 1,
    backgroundColor: "#F2F3F5",
  },

  // Header section
  header: {
    paddingTop: 20,
    marginTop : 20,
    flexDirection: "row",
    alignItems: "center",
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
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
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
    maxWidth: '80%',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6', // Light green for sent messages
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC', // Light grey for received messages
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    alignSelf: 'flex-end',
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
    alignItems: 'center',
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
    backgroundColor: '#ffffff',
    borderRadius: 25,
    elevation: 4,
    shadowColor: '#000',
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
    backgroundColor: 'white', // Green background for send button
    padding: 10,
    borderRadius: 25,
    elevation: 2,
    marginHorizontal: 1,
  },
});

export default styles;
