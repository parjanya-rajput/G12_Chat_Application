import React, { useState, useRef, useEffect } from 'react';
import { Animated, StatusBar, ActivityIndicator, Text, View, TouchableOpacity, Image, TextInput, RefreshControl, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ChatListItem from '../../molecules/ChatListItem';
import GetAllUsers from '../../../domain/GetAllUsers'; // Import your Firebase fetch function 
import GetPastConversations from '../../../domain/GetPastConversations';
import { ChatRepository } from '../../../data/ChatRepository';
import styles from './style';

import { useNavigation } from "@react-navigation/native";


const ChatListScreen = (props) => {

    const navigation = useNavigation();

    const [openSwipeRef, setOpenSwipeRef] = useState(null);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // const [profile, setProfile] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [conversation, setConversation] = useState([]);
    const [combinedData, setCombinedData] = useState([]); // To store combined Firebase and static data

    const [filteredConversations, setFilteredConversations] = useState([]);


    const scrollY = useRef(new Animated.Value(0)).current;

    const { users, loading, error } = GetAllUsers(); // Get users from Firebase

    const chatRepository = new ChatRepository();
    const getPastConversations = new GetPastConversations(chatRepository);

    useEffect(() => {
        let unsubscribe = null;

        const fetchChats = () => {
            const handleChatsUpdate = (conversations) => {
                setConversation(conversations);
                setFilteredConversations(conversations);
                setIsLoading(false);
            };

            // Fetch conversations and set up the Firestore snapshot listener
            unsubscribe = getPastConversations.execute(handleChatsUpdate);
        };

        fetchChats();

        // Cleanup function to unsubscribe from Firestore listener
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

    if (isLoading) {
        // Show a loading indicator while Firebase is checking the auth state
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const handleSwipeOpen = (ref) => {
        if (openSwipeRef && openSwipeRef !== ref) {
            openSwipeRef.close();
        }
        setOpenSwipeRef(ref);
    };

    // No need for manual refresh
    const handleRefresh = () => {

        setIsLoading(true);
        // Simulate fetching new data with a timeout
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);

        if (query === '') {
            setFilteredConversations(conversation); // Show all conversations if search query is empty
        } else {
            // Filter conversations based on participant_ids[1]
            const filteredData = conversation.filter(item => {
                const participantId = item.participant_ids[1]; // Get participant_id from conversation

                // Fetch user by participantId and check their name
                const user = users.find(user => user.id === participantId); // Assuming `users` is your collection of user data

                // If user exists, check if their name matches the query
                return user && user.name && user.name.toLowerCase().includes(query.toLowerCase());
            });
            setFilteredConversations(filteredData);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

                {isSearchActive ? (
                    <View style={styles.searchContainer}>
                        <TouchableOpacity onPress={() => {
                            setIsSearchActive(false);
                            handleSearch('');
                        }}>
                            <Icon name="arrow-left" size={25} color="#fff" />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search..."
                            placeholderTextColor="#aaa"
                            value={searchQuery}
                            onChangeText={handleSearch}
                        />
                    </View>
                ) : (
                    <>
                        <Text style={styles.headerText}>Home</Text>
                        <TouchableOpacity style={styles.searchButton} onPress={() => setIsSearchActive(true)}>
                            <Icon name="magnify" size={25} color="#fff" />
                        </TouchableOpacity>
                    </>
                )}
            </View>

            <View style={[styles.whiteBackgroundSection, isSearchActive && { flex: 1 }]}>
                {conversation.length === 0 ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>No conversations found. Create a new Conversation</Text>
                    </View>
                ) : (
                    <Animated.FlatList
                        data={filteredConversations}
                        renderItem={({ item }) => (
                            <ChatListItem
                                item={item}
                                conversation={conversation}
                                onSwipeOpen={handleSwipeOpen}
                            />
                        )}
                        keyExtractor={item => item.id}
                        extraData={openSwipeRef}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                            { useNativeDriver: false }
                        )}
                        refreshControl={
                            <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
                        }
                    />
                )}
            </View>

            <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate("AllUserScreen", { conversations: conversation })}>
                <Icon name="plus" size={30} color="#fff" />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default ChatListScreen;
