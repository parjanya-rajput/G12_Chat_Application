import React, { useState, useRef, useEffect } from 'react';
import { Animated, FlatList, SafeAreaView, ActivityIndicator, Text, View, TouchableOpacity, Image, TextInput, RefreshControl, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ChatListItem from '../../molecules/ChatListItem';
// import GetAllUsers from '../../../domain/GetAllUsers'; // Import your Firebase fetch function 
import GetPastConversations from '../../../domain/GetPastConversations';
import { ChatRepository } from '../../../data/ChatRepository';
import styles from './style';


const ChatListScreen = (props) => {
    const [openSwipeRef, setOpenSwipeRef] = useState(null);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // const [profile, setProfile] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [conversation, setConversation] = useState(null);
    const [combinedData, setCombinedData] = useState([]); // To store combined Firebase and static data
    const scrollY = useRef(new Animated.Value(0)).current;

    // const { users, loading, error } = GetAllUsers(); // Get users from Firebase

    const chatRepository = new ChatRepository();
    const getPastConversations = new GetPastConversations(chatRepository);

    // // Combine Firebase users with static data
    // useEffect(() => {
    //     if (Array.isArray(users)) { // Ensure users is an array
    //         const firebaseData = users.map(user => ({
    //             id: user.id,
    //             profileImage: user.profile_pic || 'https://via.placeholder.com/150',
    //             userName: user.user_name,
    //             bio: user.bio || 'Hello!',
    //             isOnline: user.isOnline,
    //             name: user.name,
    //             email: user.email,
    //             phone: user.phone,
    //         }));
    //         setCombinedData([...firebaseData]);
    //     }
    // }, [users]);

    //Bug of infinite refresh
    // useEffect(() => {
    //     const fetchConversations = async () => {
    //         try {
    //             const conv = await GetPastConversations.execute();
    //             setConversation(conv);
    //             console.log("Repo:", JSON.stringify(conv, null, 2));
    //         } catch (error) {
    //             console.error("Failed to fetch conversations:", error);
    //         }
    //     };

    //     fetchConversations();
    // }, [conversation]);

    // useEffect(() => {
    //     const handleChatsUpdate = (conversations) => {
    //         setConversation(conversations);
    //         setIsLoading(false);
    //     };

    //     // Fetch conversations and set up real-time listener
    //     getPastConversations.execute(handleChatsUpdate);

    //     return () => {
    //         // Optionally, handle cleanup here if necessary
    //     };
    // }, []);

    useEffect(() => {
        let unsubscribe = null;

        const fetchChats = () => {
            const handleChatsUpdate = (conversations) => {
                setConversation(conversations);
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

    // if (loading) {
    //     // Show a loading indicator while Firebase is checking the auth state
    //     return (
    //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //             <ActivityIndicator size="large" color="#0000ff" />
    //         </View>
    //     );
    // }

    if (isLoading) {
        // Show a loading indicator while Firebase is checking the auth state
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    // if (error) {
    //     // Show alert box
    //     Alert.alert(error)
    // }

    // const startChat = async (userId) => {
    //     const currentUserId = auth.currentUser ? auth.currentUser.uid : null;
    //     if (!currentUserId){ // Check if user is logged in
    //         alert("You need to be logged in to chat");
    //         return;
    //     }
    //     const conversationId = await GetOrCreateConversation.execute(currentUserId, userId);
    //     navigation.navigate("ChatScreen", { conversationId });
    //  };

    const handleSwipeOpen = (ref) => {
        if (openSwipeRef && openSwipeRef !== ref) {
            openSwipeRef.close();
        }
        setOpenSwipeRef(ref);
    };

    const profileSliderHeight = scrollY.interpolate({
        inputRange: [0, 150],
        outputRange: [100, 0],
        extrapolate: 'clamp',
    });

    const profileSliderOpacity = scrollY.interpolate({
        inputRange: [0, 150],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    // No need for manual refresh
    const handleRefresh = () => {

        setIsLoading(true);
        // Simulate fetching new data with a timeout
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    const filteredData = combinedData.filter(item =>
        item.name && item.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

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
                            placeholder="Search..."
                            placeholderTextColor="#aaa"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
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

            {!isSearchActive && (
                <Animated.View
                    style={[
                        styles.profileSliderContainer,
                        {
                            height: profileSliderHeight,
                            opacity: profileSliderOpacity,
                        },
                    ]}
                >
                    <FlatList
                        data={filteredData}
                        renderItem={({ item }) => (
                            <TouchableOpacity key={item.id} style={styles.profilePicWrapper}>
                                <Image source={{ uri: item.profileImage }} style={styles.profilePic} />
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.profileSlider}
                    />
                </Animated.View>
            )}

            <View style={[styles.whiteBackgroundSection, isSearchActive && { flex: 1 }]}>
                <Animated.FlatList
                    data={conversation}
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
            </View>
        </SafeAreaView>
    );
};

export default ChatListScreen;
