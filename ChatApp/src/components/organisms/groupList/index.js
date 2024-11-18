import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, TextInput, Animated, SafeAreaView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadGroups from '../../../domain/LoadGroups';  // Import LoadGroups use case
import GroupRepository from '../../../data/GroupRepository';  // Import singleton instance of GroupRepository
import { auth } from '../../../firebase/firebase';
import styles from './style';

const GroupListScreen = ({ navigation }) => {
    const [userId, setUserId] = useState(auth.currentUser.uid); // Track logged-in user ID
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [groups, setGroups] = useState([]);  // State to store groups data
    const [loading, setLoading] = useState(true);  // State to track loading
    const scrollY = useRef(new Animated.Value(0)).current;

    // Static profile image for groups
    const staticProfileImage = 'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg';

    // Load groups using LoadGroups use case
    useEffect(() => {
        const loadGroups = new LoadGroups(GroupRepository);

        // Callback to handle real-time updates from Firestore
        const handleGroupsUpdate = (updatedGroups) => {
            console.log('Loaded groups:', updatedGroups);  // Debugging: Log the loaded groups
            
            // Log each member's details for every group
            updatedGroups.forEach((group) => {
                console.log(`Group: ${group.groupName}`);
                group.members.forEach((member) => {
                    console.log(`Member ID: ${member.id}, Member Name: ${member.name}`);
                });
            });

            setGroups(updatedGroups);  // Update state with the latest groups data
            setLoading(false);  // Stop loading indicator
        };

        // Subscribe to the groups data
        const unsubscribe = loadGroups.execute(handleGroupsUpdate);

        // Clean up subscription when component unmounts
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

    // Filter groups based on userId membership and search query
    const filteredGroups = groups.filter(
        (group) =>
            group.members.some(member => member.id === userId) && // Check if user is a member
            group.groupName.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

    // Handle navigation to GroupChatScreen
    const handleGroupPress = (groupDetails) => {
        console.log('Navigating with groupDetails:', groupDetails);  // Debugging
        navigation.navigate('GroupChatScreen', { groupDetails:groupDetails });
    };

    // Render individual group items
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => handleGroupPress(item)}>
            <TouchableOpacity onPress={() => alert('Profile clicked!')}>
                <View style={styles.imageWrapper}>
                    <Image source={{ uri: staticProfileImage }} style={styles.profileImage} />
                </View>
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={styles.groupName}>{item.groupName}</Text>
                <Text style={styles.lastMessage}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                {isSearchActive ? (
                    <View style={styles.searchContainer}>
                        <TouchableOpacity onPress={() => setIsSearchActive(false)}>
                            <Icon name="arrow-left" size={25} color="#fff" />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search by group name"
                            placeholderTextColor="#aaa"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                ) : (
                    <>
                        <Text style={styles.headerText}>Groups</Text>
                        <TouchableOpacity style={styles.searchButton} onPress={() => setIsSearchActive(true)}>
                            <Icon name="magnify" size={25} color="#fff" />
                        </TouchableOpacity>
                    </>
                )}
            </View>

            <View style={[styles.whiteBackgroundSection, isSearchActive && { flex: 1 }]}>
                <Animated.FlatList
                    data={filteredGroups}
                    keyExtractor={(item) => item.id}  // Make sure to use a unique ID
                    renderItem={renderItem}
                    ListEmptyComponent={() => <Text style={styles.noResultsText}>No groups found</Text>}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: false }
                    )}
                />
            </View>

            {/* Floating Action Button */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('CreateGroup')}
            >
                <Icon name="plus" size={30} color="#fff" />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default GroupListScreen;