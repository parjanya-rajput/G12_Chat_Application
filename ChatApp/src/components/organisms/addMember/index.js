import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { CheckBox } from '@rneui/themed';
import GetAllUsers from '../../../domain/GetAllUsers';  // Import the hook to fetch user details
import { addMembersToGroup } from '../../../firebase/groupService'; // Import the addMembersToGroup function
import styles from './style'; // Import the styles

const AddMemberScreen = ({ route, navigation }) => {
    const { groupDetails } = route.params; // Access groupDetails and updateGroupMembers
    const { users, loading, error } = GetAllUsers(); // Fetch all users using the custom hook
    const [filteredUsers, setFilteredUsers] = useState([]); // State to store users not in the group
    const [newMembers, setNewMembers] = useState([]); // State to store newly selected members
    const [searchQuery, setSearchQuery] = useState(''); // State for search input

    useEffect(() => {
        // Ensure users is an array before attempting to filter
        if (Array.isArray(users)) {
            const usersNotInGroup = users.filter(user => 
                !groupDetails.members.some(member => member.id === user.id) && // User is not part of the group
                user.name.toLowerCase().includes(searchQuery.toLowerCase()) // Matches the search query
            );
            setFilteredUsers(usersNotInGroup);
        }
    }, [users, groupDetails, searchQuery]); // Re-run when users, groupDetails, or searchQuery change

    const toggleMemberSelection = (member) => {
        const isSelected = newMembers.some((selected) => selected.id === member.id);

        if (isSelected) {
            setNewMembers((prevMembers) => prevMembers.filter((selected) => selected.id !== member.id));
        } else {
            Alert.alert(
                "Make Admin?",
                `Would you like to make ${member.name} an Admin?`,
                [
                    {
                        text: "Yes",
                        onPress: () => {
                            setNewMembers((prevMembers) => [...prevMembers, { ...member, isAdmin: "true" }]);
                        },
                    },
                    {
                        text: "No",
                        onPress: () => {
                            setNewMembers((prevMembers) => [...prevMembers, { ...member, isAdmin: "false" }]);
                        },
                    },
                ]
            );
        }
    };

    const handleAddMembers = async () => {
        try {
            // Only add the new members to Firestore (do not modify existing group members)
            await addMembersToGroup(groupDetails.id, newMembers);
    
            // Navigate to GroupDetails screen after adding members
            navigation.navigate('GroupDetails', { groupDetails: groupDetails });
    
            alert("Members added successfully!");
        } catch (error) {
            console.error("Error adding members:", error);
            alert("Failed to add members. Please try again.");
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading users...</Text>
            </View>
        );
    }

    if (error) {
        return <Text style={styles.errorText}>Error: {error}</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Member to {groupDetails.groupName}</Text>

            {/* Search input */}
            <TextInput
                style={styles.searchInput}
                placeholder="Search members by name"
                value={searchQuery}
                onChangeText={setSearchQuery} // Update search query state
            />

            {/* Display selected members in a new container */}
            <View style={styles.selectedMembersContainer}>
                <Text style={styles.selectedMembersTitle}>Selected Members:</Text>
                {newMembers.length > 0 ? (
                    <FlatList
                        data={newMembers}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.userItem}>
                                <Text>{item.name} {item.isAdmin === 'true' ? "(Admin)" : "(Member)"}</Text>
                            </View>
                        )}
                    />
                ) : (
                    <Text>No members selected</Text>
                )}
            </View>

            {/* Display users who are not part of the group */}
            {filteredUsers.length > 0 ? (
                <FlatList
                    data={filteredUsers}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.userItem}>
                            <CheckBox
                                title={item.name}
                                checked={newMembers.some((selected) => selected.id === item.id)}
                                onPress={() => toggleMemberSelection(item)}
                            />
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.noUsersText}>No users available to add</Text>
            )}

            {/* Button to add selected members to the group */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddMembers}
            >
                <Text style={styles.addButtonText}>Add Members</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddMemberScreen;
