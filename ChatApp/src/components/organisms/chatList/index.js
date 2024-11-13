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
                username: user.name,
                status: user.bio || 'Hello!',
            }));
            setCombinedData([...staticData, ...firebaseData]);
        }
    }, [users]);
    

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
        item.username.toLowerCase().startsWith(searchQuery.toLowerCase())
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
                            profileImage={item.profileImage}
                            username={item.username}
                            status={item.status}
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



// import React, { useState, useRef, useEffect } from 'react';
// import { Animated, FlatList, SafeAreaView, Text, View, TouchableOpacity, Image, TextInput, RefreshControl } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import ChatListItem from '../../molecules/ChatListItem';
// import GetAllUsers from '../../../domain/GetAllUsers';

// import styles from './style';
// import { setUpTests } from 'react-native-reanimated';

// const ChatListScreen = (props) => {
//     const [openSwipeRef, setOpenSwipeRef] = useState(null);
//     const [isSearchActive, setIsSearchActive] = useState(false);
//     const [isRefreshing, setIsRefreshing] = useState(false);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [combinedData, setCombinedData] = useState([]); // This will hold the data to render
//     const scrollY = useRef(new Animated.Value(0)).current;



//     const { users, loading, error } = GetAllUsers(); // Get data from the custom hook
//     const [updatedUser,setupdatedUser] = useState(users);


    

//     // Static data
//     const staticData = [
//         { id: '1', profileImage: 'https://t3.ftcdn.net/jpg/06/87/23/04/360_F_687230468_RE94FphpxaiYC0mzkBVflRGg16JC1lNG.jpg', username: 'Dhruvin Akhaja', status: 'See you soon' },
//         { id: '2', profileImage: 'https://st3.depositphotos.com/4071389/16855/i/450/depositphotos_168551948-stock-photo-happy-guy-in-grey-suit.jpg', username: 'Christopher Wells', status: 'Hello There!' },
//         // Additional static data entries...
//     ];

//     // Fetch data from Firebase and combine it with static data
//     const fetchData = () => {
//         if (Array.isArray(updatedUser)) {
//             const firebaseData = updatedUser.map(user => ({
//                 id: updatedUser.id,
//                 profileImage: updatedUser.profile_pic || 'https://via.placeholder.com/150',
//                 username: updatedUser.name,
//                 status: updatedUser.bio || 'Hello!',
//             }));
//             setCombinedData([...staticData, ...firebaseData]); // Set the data state to render
//         }
//     };

//     // useEffect to handle fetching data on component mount or when `users` changes
//     useEffect(() => {
//         console.log(updatedUser);
//         fetchData();  // Re-fetch data when `users` changes or the component mounts
//     }, [updatedUser]); // This will run when `users` changes

//     const handleSwipeOpen = (ref) => {
//         if (openSwipeRef && openSwipeRef !== ref) {
//             openSwipeRef.close();
//         }
//         setOpenSwipeRef(ref);
//     };

//     const profileSliderHeight = scrollY.interpolate({
//         inputRange: [0, 150],
//         outputRange: [100, 0],
//         extrapolate: 'clamp',
//     });

//     const profileSliderOpacity = scrollY.interpolate({
//         inputRange: [0, 150],
//         outputRange: [1, 0],
//         extrapolate: 'clamp',
//     });

//     const handleRefresh = () => {
//         setIsRefreshing(true);
//         const { refreshedUsers, refreshedLoading, refreshedError } = GetAllUsers();  // Fetch new data on refresh
//         setupdatedUser(refreshedUsers);
//         fetchData();
//         setTimeout(() => {
//             setIsRefreshing(false); // Stop the refresh animation after a delay
//         }, 1000);
//     };

//     // Reset search mode and fetch full data when exiting search
//     const handleExitSearch = () => {
//         setIsSearchActive(false);
//         setSearchQuery('');
//         fetchData(); // Reset list to show all users
//     };

//     // Filter data based on the search query
//     const filteredData = combinedData.filter(item =>
//         item.username.toLowerCase().startsWith(searchQuery.toLowerCase())
//     );

//     return (
//         <SafeAreaView style={styles.safeArea}>
//             <View style={styles.header}>
//                 {isSearchActive ? (
//                     <View style={styles.searchContainer}>
//                         <TouchableOpacity onPress={handleExitSearch}>
//                             <Icon name="arrow-left" size={25} color="#fff" />
//                         </TouchableOpacity>
//                         <TextInput
//                             style={styles.searchInput}
//                             placeholder="Search..."
//                             placeholderTextColor="#aaa"
//                             value={searchQuery}
//                             onChangeText={setSearchQuery}
//                         />
//                     </View>
//                 ) : (
//                     <>
//                         <Text style={styles.headerText}>Home</Text>
//                         <TouchableOpacity style={styles.searchButton} onPress={() => setIsSearchActive(true)}>
//                             <Icon name="magnify" size={25} color="#fff" />
//                         </TouchableOpacity>
//                     </>
//                 )}
//             </View>

//             {!isSearchActive && (
//                 <Animated.View
//                     style={[styles.profileSliderContainer, {
//                         height: profileSliderHeight,
//                         opacity: profileSliderOpacity,
//                     }]}
//                 >
//                     <FlatList
//                         data={filteredData}
//                         renderItem={({ item }) => (
//                             <TouchableOpacity key={item.id} style={styles.profilePicWrapper}>
//                                 <Image source={{ uri: item.profileImage }} style={styles.profilePic} />
//                             </TouchableOpacity>
//                         )}
//                         keyExtractor={item => item.id}
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                         contentContainerStyle={styles.profileSlider}
//                     />
//                 </Animated.View>
//             )}

//             <View style={[styles.whiteBackgroundSection, isSearchActive && { flex: 1 }]}>
//                 <Animated.FlatList
//                     data={filteredData}
//                     renderItem={({ item }) => (
//                         <ChatListItem
//                             profileImage={item.profileImage}
//                             username={item.username}
//                             status={item.status}
//                             onSwipeOpen={handleSwipeOpen}
//                         />
//                     )}
//                     keyExtractor={item => item.id}
//                     extraData={openSwipeRef}
//                     onScroll={Animated.event(
//                         [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//                         { useNativeDriver: false }
//                     )}
//                     refreshControl={
//                         <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
//                     }
//                 />
//             </View>
//         </SafeAreaView>
//     );
// };

// export default ChatListScreen;





