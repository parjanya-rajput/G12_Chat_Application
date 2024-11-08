import React, { useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './style';

const ChatListItem = ({ profileImage, username, status, onSwipeOpen }) => {
    const navigation = useNavigation();
    const swipeableRef = useRef(null);

    // Right-side actions (Delete and Mute Notification)
    const renderRightActions = (progress, dragX) => (
        <View style={styles.rightActions}>
            <TouchableOpacity style={styles.actionButton}>
                <Icon name="delete" size={25} color="#ff3b30" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
                <Icon name="bell-off" size={25} color="#ffcc00" />
            </TouchableOpacity>
        </View>
    );

    // Left-side action (Archive)
    const renderLeftActions = (progress, dragX) => (
        <View style={styles.leftActions}>
            <TouchableOpacity style={styles.actionButton}>
                <Icon name="archive" size={25} color="#757575" />
            </TouchableOpacity>
        </View>
    );

    return (
        <Swipeable
            ref={swipeableRef}
            renderRightActions={renderRightActions}
            renderLeftActions={renderLeftActions}
            onSwipeableOpen={() => onSwipeOpen(swipeableRef.current)}
        >
            <View style={styles.container}>
                {/* Profile Image with black background */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('ProfilePicView', {
                        dpImage: profileImage,
                        groupName: username,
                    })}
                >
                    <View style={styles.imageWrapper}>
                        <Image source={{ uri: profileImage }} style={styles.profileImage} />
                    </View>
                </TouchableOpacity>

                {/* User Info */}
                <TouchableOpacity
                    style={styles.textContainer}
                    onPress={() => navigation.navigate('Chat', { username, profileImage })}
                >
                    <Text style={styles.username}>{username}</Text>
                    <Text style={styles.status}>{status}</Text>
                </TouchableOpacity>
            </View>
        </Swipeable>
    );
};



export default ChatListItem;