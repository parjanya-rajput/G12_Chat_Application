import { StyleSheet } from "react-native";
import GlobalStyles from "../../globalStyles";

const styles = StyleSheet.create({
  bubble: {
    padding: 40,
    marginVertical: 20,
    borderRadius: 25, // Increase borderRadius to make bubbles rounder
    maxWidth: "60%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 1,
  },
  incomingBubble: {
    alignSelf: "flex-start",
    padding: 10,
    maxWidth: "65%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    marginVertical: 10,
    backgroundColor: "#D3D3D3",
    borderRadius: 15, // Ensure both incoming and outgoing have rounded corners
    elevation: 8,
  },
  outgoingBubble: {
    alignSelf: "flex-end",
    padding: 10,
    maxWidth: "65%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    marginVertical: 10,
    backgroundColor: "#4f938a",
    borderRadius: 15,
    elevation: 8,
  },
  messageText: {
    fontSize: 16,
    color: "#000000",
  },
  timestampContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  timestamp: {
    fontSize: 12,
    color: "black",
    marginRight: 5,
  },
  status: {
    fontSize: 12,
    color: "gray",
  },
  sentIcon: {
    fontSize: 12,
    color: "#36454F", // Base color for status icons
  },
  seenIcon: {
    color: "#00FFFF", // Color for "seen" status icon
  },
  highlightedText: {
    backgroundColor: "yellow",
    opacity: 0.5,
  },
  senderName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4f938a",
    marginBottom: 5,
  },
});

export default styles;
