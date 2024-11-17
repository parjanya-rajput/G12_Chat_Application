import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    marginVertical: 5,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageWrapper: {
    backgroundColor: "#000", // Black background for the profile image
    padding: 3,
    borderRadius: 35,
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 35,
    borderWidth: 1.5,
    borderColor: "#fff",
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  username: {
    fontFamily: "Caros-Bold",
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  status: {
    fontFamily: "cretype-caros",
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  rightActions: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    marginLeft: 10,
    justifyContent: "center",
  },
  leftActions: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    marginRight: 10,
    justifyContent: "center",
  },
  actionButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 15,
    borderRadius: 25,
    backgroundColor: "#f0f0f0",
    elevation: 2,
  },
});

export default styles;
