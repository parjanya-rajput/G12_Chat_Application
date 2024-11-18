import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { auth } from '../../../firebase/firebase';
import { GetOrCreateConversation } from '../../../domain/GetOrCreateConversation';
import styles from './style';
import { GetUserByUserId } from '../../../domain/GetUserByUserId';

import { firestore } from '../../../firebase/firebase'; // Import the firestore object correctly
import { getDoc, doc, deleteDoc, collection, getDocs, query } from 'firebase/firestore';
import { FontAwesome } from '@expo/vector-icons';
import { Modal } from 'react-native';


const ChatListItem = ({ item, conversation, onSwipeOpen }) => {
    const navigation = useNavigation();
    const swipeableRef = useRef(null);
    const [senderProfile, setSenderProfile] = useState(null);
    const currentUserId = auth.currentUser ? auth.currentUser.uid : null;
    const senderId = item.participant_ids.find(id => id !== currentUserId);
    const [isLoading, setIsLoading] = useState(true);


    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false); // State for full-screen image view

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

    // useEffect(() => {
    //     const fetchSenderProfile = async () => {
    //         try {
    //             if (senderId) {
    //                 const userProfile = await GetUserByUserId.execute(senderId);
    //                 setSenderProfile(userProfile);
    //             }
    //         } catch (error) {
    //             console.error("Failed to fetch sender profile:", error);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     fetchSenderProfile();
    // }, [senderId]);

    useEffect(() => {
        const fetchSenderProfile = async () => {
            try {
                if (senderId) {
                    // Fetch user profile initially
                    const userProfile = await GetUserByUserId.execute(senderId);
                    setSenderProfile(userProfile);

                    // Set up real-time listener for user profile updates
                    GetUserByUserId.listenToUserUpdates(senderId, (updatedProfile) => {
                        if (updatedProfile) {
                            setSenderProfile(updatedProfile);
                        }
                    });
                }
            } catch (error) {
                console.error("Failed to fetch sender profile:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSenderProfile();

        // Cleanup on component unmount
        return () => {
            setSenderProfile(null);
            setIsLoading(true);
        };
    }, [senderId]);


    // const handleDeleteConversation = (db, conversationId, callback) => {
    //     // Reference the specific conversation document
    //     const conversationRef = doc(db, "conversation", conversationId);
    
    //     // Set up a real-time listener to ensure the conversation exists before deletion
    //     const unsubscribe = onSnapshot(
    //         conversationRef,
    //         (docSnapshot) => {
    //             if (docSnapshot.exists()) {
    //                 // Conversation exists, proceed to delete
    //                 deleteDoc(conversationRef)
    //                     .then(() => {
    //                         console.log(`Conversation ${conversationId} deleted successfully.`);
    //                         if (callback) callback(null, conversationId); // Invoke callback on success
    //                     })
    //                     .catch((error) => {
    //                         console.error("Error deleting conversation:", error);
    //                         if (callback) callback(error, null); // Invoke callback on error
    //                     })
    //                     .finally(() => {
    //                         unsubscribe(); // Unsubscribe after deletion
    //                     });
    //             } else {
    //                 console.log(`Conversation ${conversationId} does not exist.`);
    //                 if (callback) callback(new Error("Conversation not found"), null);
    //                 unsubscribe(); // Unsubscribe if no document is found
    //             }
    //         },
    //         (error) => {
    //             console.error("Error listening to conversation:", error);
    //             if (callback) callback(error, null); // Invoke callback on listener error
    //         }
    //     );
    
    //     // Return unsubscribe function to allow manual cleanup
    //     return unsubscribe;
    // };

    const handleDeleteConversation = async (conversationId) => {
        try {
            if (!conversationId) {
                console.error("Conversation ID is invalid");
                return;
            }
    
            // Reference to the conversation document
            const conversationRef = doc(firestore, 'conversation', conversationId);
    
            // Check if the conversation exists
            const conversationDoc = await getDoc(conversationRef);
            if (!conversationDoc.exists()) {
                console.error("Conversation not found.");
                return;
            }
    
            // Reference to the messages sub-collection under the conversation
            const messagesRef = collection(conversationRef, 'messages');
            const messagesSnapshot = await getDocs(messagesRef);
    
            if (!messagesSnapshot.empty) {
                const deleteMessagesPromises = messagesSnapshot.docs.map(doc => deleteDoc(doc.ref));
                // Wait for all messages to be deleted
                await Promise.all(deleteMessagesPromises);
                console.log('All messages deleted');
            } else {
                console.log('No messages to delete');
            }
    
            // Now delete the conversation document itself
            await deleteDoc(conversationRef);
            console.log('Conversation and all its messages deleted successfully.');
            alert('Conversation and all its messages deleted successfully.');
        } catch (error) {
            console.error('Error deleting conversation:', error);
            alert('Error deleting conversation.');
        }
    };


    const DeleteConversation = (conversationId) => {
        handleDeleteConversation(conversationId);
    };

    // Right-side actions (Delete and Mute Notification)
    const renderRightActions = (progress, dragX) => (
        <View style={styles.rightActions}>
            <TouchableOpacity style={styles.actionButton} onPress={()=>{DeleteConversation(item.id)}} >
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

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setIsFullScreen(false);
    };

    const closePartial = () => {
        setIsModalVisible(false);
    };

    const closeFull = () => {
        setIsFullScreen(false);
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
                    onPress={() => setIsModalVisible(true)}
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


                {/* Partial-Screen Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={handleCloseModal}
            
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity
                            onPress={closePartial}
                            style={styles.closeButton}
                        >
                            <FontAwesome name="close" size={24} color="#fff" />
                        </TouchableOpacity>
                        <Image
                            source={{ uri: senderProfile.profile_pic }}
                            style={styles.modalImage}
                            resizeMode="contain"
                        />
                        <Text style={styles.modalName}>{senderProfile.name}</Text>
                        {/* <TouchableOpacity
                            style={styles.fullScreenButton}
                            onPress={() => {
                                setIsModalVisible(false);
                                setIsFullScreen(true);
                            }}
                        >
                            <Text style={styles.fullScreenText}>View Full Screen</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
            </Modal>

            {/* Full-Screen Modal */}
            <Modal
                animationType="fade"
                visible={isFullScreen}
                transparent={true}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.fullScreenOverlay}>
                    <TouchableOpacity
                        onPress={closeFull}
                        style={styles.closeButtonFullScreen}
                    >
                        <FontAwesome name="close" size={30} color="#fff" />
                    </TouchableOpacity>
                    <Image
                        source={{ uri: senderProfile.profile_pic }}
                        style={styles.fullScreenImage}
                        resizeMode="contain"
                    />
                </View>
            </Modal>
            </View>
        </Swipeable>
    );
};



export default ChatListItem;