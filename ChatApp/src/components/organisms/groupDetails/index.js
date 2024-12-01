import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';
import GetAllUsers from '../../../domain/GetAllUsers'; // Import the hook to fetch user details
import GroupRepository from '../../../data/GroupRepository';  // Import GroupRepository to handle real-time updates
import styles from './style'; // Import styles
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const GroupDetailsScreen = ({ route }) => {
    const navigation = useNavigation();
    const { groupDetails } = route.params; // Retrieve passed groupDetails

    const [isRefreshing, setIsRefreshing] = useState(false); // Refreshing state
    const [refreshedUsers, setRefreshedUsers] = useState([]); // Store refreshed user data
    const [currentGroupDetails, setCurrentGroupDetails] = useState(groupDetails); // Store current group details

    const { users, loading, error } = GetAllUsers(); // Get all users from the hook

    // Function to find user details based on member id
    const getUserDetails = (memberId) => {
        return refreshedUsers.find(user => user.id === memberId);
    };

    // Function to handle manual refresh
    const handleRefresh = async () => {
        setIsRefreshing(true); // Start refresh animation

        try {
            // Simulate data fetching or use Firebase fetching logic
            const updatedUsers = GetAllUsers().users; // Fetch updated user data
            setRefreshedUsers(updatedUsers); // Update state with refreshed data
        } catch (err) {
            console.error("Error refreshing user data:", err);
        } finally {
            setIsRefreshing(false); // Stop refresh animation
        }
    };

    // Set up real-time listener for group details using groupId (document ID)
    useEffect(() => {
        const unsubscribe = GroupRepository.getGroupById(currentGroupDetails.id, (updatedGroup) => {
            if (updatedGroup) {
                setCurrentGroupDetails(updatedGroup); // Update state with the latest group details
            }
        });

        // Clean up the subscription when the component unmounts
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [currentGroupDetails.id]);

    // Update refreshedUsers whenever users changes
    useEffect(() => {
        setRefreshedUsers(users);
    }, [users]);

    // Use useFocusEffect to reload the group details when the screen comes into focus
    useFocusEffect(
        useCallback(() => {
            // Refresh group details when the screen is focused
            const refreshGroupDetails = () => {
                GroupRepository.getGroupById(currentGroupDetails.id, (updatedGroup) => {
                    if (updatedGroup) {
                        setCurrentGroupDetails(updatedGroup);
                    }
                });
            };

            refreshGroupDetails(); // Trigger refresh
        }, [currentGroupDetails.id])
    );

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="medium" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return <Text style={styles.errorText}>Error: {error}</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={{ paddingBottom: 100 }}
                refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
                }
            >
                <Text style={styles.groupName}>{currentGroupDetails.groupName}</Text>
                <Text style={styles.description}>Description: {currentGroupDetails.description}</Text>

                <Text style={styles.sectionTitle}>Members:</Text>
                {currentGroupDetails.members.length > 0 ? (
                    currentGroupDetails.members.map((member, index) => {
                        const userDetails = getUserDetails(member.id); // Get user details by member id

                        return (
                            <View key={index} style={styles.memberContainer}>
                                {userDetails ? (
                                    <View style={styles.memberDetails}>
                                        <Text style={styles.memberText}>{userDetails.name}</Text>
                                        <Text style={styles.memberEmail}>{userDetails.email}</Text>
                                        {member.isAdmin === "Admin" && (
                                            <View style={styles.adminBadge}>
                                                <Text style={styles.adminText}>Group Admin</Text>
                                            </View>
                                        )}
                                    </View>
                                ) : (
                                    <Text style={styles.memberText}>User not found for ID {member.id}</Text>
                                )}
                            </View>
                        );
                    })
                ) : (
                    <Text style={styles.memberText}>No members</Text>
                )}
            </ScrollView>

            {/* Button to navigate to AddMemberScreen */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddMember', { groupDetails: currentGroupDetails })}
            >
                <Text style={styles.addButtonText}>Add Member</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default GroupDetailsScreen;