import React from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import GetAllUsers from '../domain/GetAllUsers';

const UserListScreen = () => {
    const { users, loading, error } = GetAllUsers();

    // useEffect(() => {
    //     console.log(users);
    // }, [users]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userHandle}>{item.user_name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                keyExtractor={item => item.id}
                renderItem={renderItem}
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
        flexDirection: 'column',
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
});

export default UserListScreen;
