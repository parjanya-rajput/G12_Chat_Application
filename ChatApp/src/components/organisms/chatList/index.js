import React, { useState, useRef } from 'react';
import { Animated, FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ChatListItem from '../../molecules/ChatListItem'

import styles from './style';

const data = [
    { id: '1', profileImage: 'https://t3.ftcdn.net/jpg/06/87/23/04/360_F_687230468_RE94FphpxaiYC0mzkBVflRGg16JC1lNG.jpg', username: 'Dhruvin Akhaja', status: 'See you soon' },
    { id: '2', profileImage: 'https://st3.depositphotos.com/4071389/16855/i/450/depositphotos_168551948-stock-photo-happy-guy-in-grey-suit.jpg', username: 'Christopher Wells', status: 'Hello There!' },
    { id: '3', profileImage: 'https://usercontent.one/wp/manforhimself.com/wp-content/uploads/2020/06/mens-hairstyle-haircut-long-grown-out-MFH7-man-for-himself.jpg', username: 'Jane Doe', status: 'Greetings of the Day' },
    { id: '4', profileImage: 'https://miro.medium.com/v2/resize:fit:490/0*1UIk6b8WhMAkh0X_.jpg', username: 'Johni Borino', status: 'How’s it going?' },
    { id: '5', profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1hbGV8ZW58MHx8MHx8fDA%3D', username: 'Alexander Hale', status: 'Happy to Connect' },
    { id: '6', profileImage: 'https://st3.depositphotos.com/4071389/16855/i/450/depositphotos_168551948-stock-photo-happy-guy-in-grey-suit.jpg', username: 'Benjamin Reed', status: 'Welcome Aboard' },
    { id: '7', profileImage: 'https://t3.ftcdn.net/jpg/02/00/90/24/360_F_200902415_G4eZ9Ok3Ypd4SZZKjc8nqJyFVp1eOD6V.jpg', username: 'Amelia Clark', status: 'Pleasure to Meet' },
    { id: '8', profileImage: 'https://img.freepik.com/free-photo/close-up-portrait-stylish-brunette-woman-glasses-laughing-smiling-posing-eyewear-agains_1258-88375.jpg', username: 'William Foster', status: 'Nice to See You' },
    { id: '9', profileImage: 'https://img.freepik.com/free-photo/front-view-smiley-handsome-man-with-glasses_23-2148946198.jpg', username: 'Ethan Brooks', status: 'Warm Regards' },
    { id: '10', profileImage: 'https://img.freepik.com/premium-photo/happy-successful-young-corporate-lawyer-orange-suit-office_1182900-57129.jpg', username: 'Victoria Hayes', status: 'Wishing You Well' },
    { id: '11', profileImage: 'https://img.freepik.com/premium-photo/woman-wearing-hat-that-says-shes-wearing-hat_583952-122622.jpg?semt=ais_hybrid', username: 'Madeline James', status: 'Stay positive!' },
];

const ChatList = (props) => {
    const [openSwipeRef, setOpenSwipeRef] = useState(null);
    const scrollY = useRef(new Animated.Value(0)).current;

    const handleSwipeOpen = (ref) => {
        if (openSwipeRef && openSwipeRef !== ref) {
            openSwipeRef.close();
        }
        setOpenSwipeRef(ref);
    };

    const profileSliderHeight = scrollY.interpolate({
        inputRange: [0, 150],
        outputRange: [100, 0], // Slider height will go from 100 to 0
        extrapolate: 'clamp',
    });

    const profileSliderOpacity = scrollY.interpolate({
        inputRange: [0, 150],
        outputRange: [1, 0], // Opacity will go from 1 to 0
        extrapolate: 'clamp',
    });

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header with title and search button */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Home</Text>
                <TouchableOpacity style={styles.searchButton}>
                    <Icon name="magnify" size={25} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Profile Pics Slider */}
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
                    data={data}
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

            {/* Chat List */}
            <View style={styles.whiteBackgroundSection}>
                <Animated.FlatList
                    data={data}
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
                />
            </View>
        </SafeAreaView>
    );
};



export default ChatList;



