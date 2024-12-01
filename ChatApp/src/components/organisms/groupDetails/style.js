// Group Detials style

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#fff',
    },
    groupName: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 18,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        marginVertical: 10,
        fontWeight: 'bold',
    },
    memberContainer: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 10,
        position: 'relative',
        backgroundColor: '#f9f9f9',
    },
    memberDetails: {
        paddingLeft: 10,
    },
    memberText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    memberEmail: {
        fontSize: 14,
        color: '#555',
    },
    adminBadge: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: '#d4f1d4',
        borderRadius: 5,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    adminText: {
        color: '#2f7f2f',
        fontWeight: 'bold',
        fontSize: 12,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        fontSize: 16,
    },
    addButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        margin: 10,
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },

});