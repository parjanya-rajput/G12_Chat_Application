import React, { useState, useRef, useEffect } from 'react';
import { Animated, FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ChatListItem from '../../molecules/ChatListItem';
import GetAllUsers from '../../../domain/GetAllUsers'; // Import your Firebase fetch function 
import styles from './style';


const ChatListScreen = (props) => {
    const [openSwipeRef, setOpenSwipeRef] = useState(null);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    // const [profile, setProfile] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [combinedData, setCombinedData] = useState([]); // To store combined Firebase and static data
    const scrollY = useRef(new Animated.Value(0)).current;

    const { users, loading, error } = GetAllUsers(); // Get users from Firebase

    // Static data
    const staticData = [
        { id: '1', profileImage: 'https://t3.ftcdn.net/jpg/06/87/23/04/360_F_687230468_RE94FphpxaiYC0mzkBVflRGg16JC1lNG.jpg', username: 'Dhruvin Akhaja', status: 'See you soon' },
        { id: '2', profileImage: 'https://st3.depositphotos.com/4071389/16855/i/450/depositphotos_168551948-stock-photo-happy-guy-in-grey-suit.jpg', username: 'Christopher Wells', status: 'Hello There!' },
        // Additional static data entries...
    ];

    // Combine Firebase users with static data
    useEffect(() => {
        if (Array.isArray(users)) { // Ensure users is an array
            const firebaseData = users.map(user => ({
                id: user.id,
                profileImage: user.profile_pic || 'https://via.placeholder.com/150',
                userName: user.user_name,
                bio: user.bio || 'Hello!',
                isOnline: user.isOnline,
                name: user.name,
                email: user.email,
                phone: user.phone,
            }));
            setCombinedData([...staticData, ...firebaseData]);
        }
    }, [users]);

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

    const handleRefresh = () => {
        setIsRefreshing(true);
        // Simulate fetching new data with a timeout
        setTimeout(() => {
            setIsRefreshing(false);
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
                    data={filteredData}
                    renderItem={({ item }) => (
                        <ChatListItem
                            item={item}
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
                        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
                    }
                />
            </View>
        </SafeAreaView>
    );
};

export default ChatListScreen;
