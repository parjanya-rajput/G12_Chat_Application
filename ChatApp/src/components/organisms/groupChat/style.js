import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white', paddingTop:40, },
    header: { flexDirection: 'row', padding: 10, alignItems: 'center' },
    profilePic: { width: 40, height: 40, borderRadius: 20 },
    profileName: { fontSize: 18, fontWeight: 'bold' },
    accountType: { fontSize: 14, color: '#888' },
    headerContent: { flexDirection: 'column', marginLeft: 10 },
    headerIcons: { flexDirection: 'row', marginLeft: 'auto' },
    searchButton: { marginRight: 10 },
    audiocallButton: { marginRight: 10 },
    videocallButton: { marginRight: 10 },
    chatMessages: { flex: 1 },
    messagesContainer: { padding: 20, justifyContent: 'center', alignItems: 'center' },
    noMessages: { fontSize: 18, color: '#888' },
    searchBar: { padding: 10 },
    searchInput: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 20, paddingLeft: 10 },
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
