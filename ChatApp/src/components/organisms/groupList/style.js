// group List style

import { StyleSheet } from 'react-native';
import GlobalStyles from '../../globalStyles';

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        backgroundColor: '#000',
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerText: {
        fontFamily: 'Caros-Bold',
        color: '#fff',
        fontSize: 24,
    },
    searchButton: {
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 25,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        flex: 1,
    },
    searchInput: {
        flex: 1,
        color: '#fff',
        fontSize: 18,
        marginLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
    },
    whiteBackgroundSection: {
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        backgroundColor: '#fff',
        flex: 1,
        paddingTop: 20,
    },
    itemContainer: {
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
    groupName: {
        fontFamily: "Caros-Bold",
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
    },
    lastMessage: {
        fontFamily: "cretype-caros",
        fontSize: 14,
        color: "#888",
        marginTop: 4,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        fontSize: 16,
    },
    noResultsText: {
        textAlign: 'center',
        color: '#888888',
        fontSize: 16,
        marginTop: 20,
    },
    leftSwipeActions: {
        backgroundColor: "#4CAF50", // Green background for "Archive" action
        justifyContent: "center",
        alignItems: "flex-start",
        paddingHorizontal: 20,
        flex: 1,
    },
    rightSwipeActions: {
        backgroundColor: "#FF5252", // Red background for "Delete" action
        justifyContent: "center",
        alignItems: "flex-end",
        paddingHorizontal: 20,
        flex: 1,
    },
    actionText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "Caros-Bold",
    },
    groupProfilePic: {
        width: 40,
        height: 40,
        borderRadius: 20, // Optional: to make it circular
        marginRight: 10, // Space between the image and text
    },
    groupDetails: {
        flex: 1,
        justifyContent: 'center',
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
        flex: 1, // Ensure that the text takes up the available space
        marginLeft:20,
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        backgroundColor: GlobalStyles.SIGNIN1_BUTTON_COLOR, // WhatsApp's green color
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8, // Add shadow for Android
    },
});

export default styles;