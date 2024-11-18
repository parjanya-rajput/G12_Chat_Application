import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './style';

import { getFirestore, collection, query, where, getDocs, setDoc, doc, Timestamp } from 'firebase/firestore';
import { auth } from '../../../firebase/firebase'; // Make sure to import your auth instance


const ChatListItem1 = ({ item , onSwipeOpen }) => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const db = getFirestore();

    const addConversation = async (senderId) => {
        const currentUserId = auth.currentUser.uid; // Get the current user's ID
        const conversationRef = collection(db, 'conversation');
    
        // Query to check if a conversation already exists between the current user and the sender
        const q = query(
            conversationRef,
            where('participant_ids', 'array-contains', currentUserId) // Only need to check for current user ID
        );
    
        const querySnapshot = await getDocs(q);
    
        // Filter the results manually to check if the senderId is also in the participant_ids array
        const existingConversation = querySnapshot.docs.find(doc => 
            doc.data().participant_ids.includes(senderId)
        );
    
        if (existingConversation) {
            // If a conversation already exists, log it
            console.log('Conversation already exists');
            alert("Conversation already exists");
        } else {
            // If no conversation exists, create a new one
            const newConversationRef = doc(conversationRef); // Auto-generate a new document ID
            await setDoc(newConversationRef, {
                last_message: 'Last message seen here', // Default last message
                last_message_timestamp: Timestamp.fromDate(new Date()), // Current timestamp
                participant_ids: [currentUserId, senderId], // Add current and sender IDs
            });
    
            console.log('New conversation added');
            alert("New conversation added");
        }
    };
    
    // Usage in your component (on press or action)
    const handleConversationPress = (itemId) => {
        addConversation(itemId); // Pass the sender's ID (item.id)
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#4A90E2" />
            </View>
        );
    }

    return (
        <SafeAreaView>

        
            <View style={styles.container}>
                {/* Profile Image with black background */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('ProfilePicView', {
                        dpImage: item.profile_pic,
                        groupName: item.name,
                    })}
                >
                    <View style={styles.imageWrapper}>
                        <Image source={{ uri: item.profile_pic }} style={styles.profileImage} />
                    </View>
                </TouchableOpacity>

                {/* User Info */}
                <TouchableOpacity style={styles.textContainer} onPress={()=>{handleConversationPress(item.id)}}>
                    <Text style={styles.username}>{item.name}</Text>
                    <Text style={styles.status}>{item.bio}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ChatListItem1;
