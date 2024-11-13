import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import GetAllUsers from '../domain/GetAllUsers';

const UserListScreen = () => {
    const { users, loading, error } = GetAllUsers(); // users is now an array of user objects
    const [selectedUsername, setSelectedUsername] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleUserPress =(userDetails) => {
        alert("Name : " + userDetails.name + "\n" + 
            "Email : " + userDetails.email + '\n' + 
            "Phone : " + userDetails.phone + '\n' +
            "Bio : " + userDetails.bio + '\n');
        console.log(userDetails);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => handleUserPress(item.user_name)}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userHandle}>{item.user_name}</Text>
        </TouchableOpacity>
    );

    const renderItem2 = ({ item }) => {
        // Check if the name or user_name starts with the search query
        if (
            item.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
            item.user_name.toLowerCase().startsWith(searchQuery.toLowerCase())
        ) {
            return (
                <TouchableOpacity style={styles.itemContainer} onPress={() => handleUserPress(item)}>
                    <Text style={styles.userName}>{item.name}</Text>
                    <Text style={styles.userHandle}>{item.user_name}</Text>
                </TouchableOpacity>
            );
        }

        // If no match, return null (this item won't be rendered)
        return null;
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text style={styles.errorText}>Error: {error}</Text>;
    }

    return (
        <View style={styles.container}>
            {/* Search bar */}
            <TextInput
                style={styles.searchInput}
                placeholder="Search by name or username"
                value={searchQuery}
                onChangeText={setSearchQuery} // Update search query as user types
            />

            {/* FlatList to display users */}
            <FlatList
                data={users}  // Provide the original users array
                keyExtractor={(item) => item.id}
                renderItem={renderItem2}  // Only render filtered items
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 10,
    },
    searchInput: {
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    itemContainer: {
        backgroundColor: '#ffffff',
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    userName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333333',
    },
    userHandle: {
        fontSize: 14,
        color: '#888888',
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
    userDetailsContainer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#f0f0f0',
    },
});

export default UserListScreen;

