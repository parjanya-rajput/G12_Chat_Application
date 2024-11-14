import React, { useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { auth } from '../../../firebase/firebase';
import { GetOrCreateConversation } from '../../../domain/GetOrCreateConversation';
import styles from './style';
const ChatListItem = ({ item, onSwipeOpen }) => {
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

    const startChat = async (userId) => {
        const currentUserId = auth.currentUser ? auth.currentUser.uid : null;
        if (!currentUserId) { // Check if user is logged in
            alert("You need to be logged in to chat");
            return;
        }
        const conversationId = await GetOrCreateConversation.execute(currentUserId, userId);
        console.log(conversationId);
        navigation.navigate("Chat", { item: item, conversationId: conversationId });
    };

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
                        dpImage: item.profileImage,
                        groupName: item.username,
                    })}
                >
                    <View style={styles.imageWrapper}>
                        <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
                    </View>
                </TouchableOpacity>

                {/* User Info */}
                <TouchableOpacity
                    style={styles.textContainer}
                    onPress={() => startChat(item.id)}
                >
                    <Text style={styles.username}>{item.name}</Text>
                    <Text style={styles.status}>{item.bio}</Text>
                </TouchableOpacity>
            </View>
        </Swipeable>
    );
};



export default ChatListItem;