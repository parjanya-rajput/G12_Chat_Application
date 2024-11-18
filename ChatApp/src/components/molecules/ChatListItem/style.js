import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

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


  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
},
modalContainer: {
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    alignItems: 'center',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
},
closeButton: {
    alignSelf : 'center',
    position: 'relative',
    // top: 10,
    // right: 10,
    backgroundColor: '#000',
    borderRadius: 60,
    padding: 10,
},
modalImage: {
    width: '100%',
    height: width * 0.85,
},
modalName: {
  fontFamily : 'Caros-Heavy',
    fontSize: 22,
    // marginVertical: 15,
    color: '#333',
},
fullScreenButton: {
    backgroundColor: '#609d95',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
},
fullScreenText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
},
fullScreenOverlay: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
},
fullScreenImage: {
    width: '100%',
    height: '100%',
},
closeButtonFullScreen: {
    position: 'relative',
    top: 40,
    right: 20,
    backgroundColor: 'green',
    borderRadius: 20,
    padding: 10,
},
});

export default styles;
