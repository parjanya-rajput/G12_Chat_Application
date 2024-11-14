import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { auth } from '../../../firebase/firebase';
import { GetOrCreateConversation } from '../../../domain/GetOrCreateConversation';
import styles from './style';
import { GetUserByUserId } from '../../../domain/GetUserByUserId';

const ChatListItem = ({ item, onSwipeOpen }) => {
    const navigation = useNavigation();
    const swipeableRef = useRef(null);
    const [senderProfile, setSenderProfile] = useState(null);
    const currentUserId = auth.currentUser ? auth.currentUser.uid : null;
    const senderId = item.participant_ids.find(id => id !== currentUserId);
    const [isLoading, setIsLoading] = useState(true);
    // useEffect(() => {
    //     const fetchSenderProfile = async () => {
    //         try {
    //             if (senderId) {
    //                 const userProfile = await GetUserByUserId.execute(senderId);
    //                 setSenderProfile(userProfile);
    //             }
    //         } catch (error) {
    //             console.error("Failed to fetch sender profile:", error);
    //         }
    //     };

    //     fetchSenderProfile();
    //     setIsLoading(false);
    //     // console.log("ChatList" + senderProfile)
    // }, [senderId]);

    useEffect(() => {
        const fetchSenderProfile = async () => {
            try {
                if (senderId) {
                    const userProfile = await GetUserByUserId.execute(senderId);
                    setSenderProfile(userProfile);
                }
            } catch (error) {
                console.error("Failed to fetch sender profile:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSenderProfile();
    }, [senderId]);

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
        // if (!currentUserId) { // Check if user is logged in
        //     alert("You need to be logged in to chat");
        //     return;
        // }
        // const conversationId = await GetOrCreateConversation.execute(currentUserId, userId);
        // console.log(conversationId);
        navigation.navigate("Chat", { item: senderProfile, conversationId: item.id });
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#4A90E2" />
            </View>
        );
    }


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
                        dpImage: senderProfile.profile_pic,
                        groupName: senderProfile.name,
                    })}
                >
                    <View style={styles.imageWrapper}>
                        <Image source={{ uri: senderProfile.profile_pic }} style={styles.profileImage} />
                    </View>
                </TouchableOpacity>

                {/* User Info */}
                <TouchableOpacity
                    style={styles.textContainer}
                    onPress={() => startChat(item.id)}
                >
                    <Text style={styles.username}>{senderProfile.name}</Text>
                    <Text style={styles.status}>{item.last_message}</Text>
                </TouchableOpacity>
            </View>
        </Swipeable>
    );
};



export default ChatListItem;