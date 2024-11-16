import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import styles from './style';
import { Ionicons } from '@expo/vector-icons';
import MessageBubble from '../../atoms/MessageBubble/Index';
// import Feather from 'react-native-vector-icons/Feather';

import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

import { SendMessage } from '../../../domain/SendMessage';
import { useState } from 'react';

import { ChatRepository } from '../../../data/ChatRepository';
import LoadMessages from '../../../domain/LoadMessage';
import { auth } from '../../../firebase/firebase';

const Chat = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const { item, conversationId } = route.params;
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const flatListRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchBar, setShowSearchBar] = useState(false);

    const chatRepository = new ChatRepository();
    // const sendMessageUse = new SendMessage(chatRepository);
    const loadMessagesUse = new LoadMessages(chatRepository);

    const sendMessage = () => {
        if (!text.trim()) return;
        console.log(conversationId, item.id, text)
        SendMessage.execute(conversationId, item.id, text, "text");
        setText("");
    };

    const handleSearchButtonClick = () => {
        setShowSearchBar(!showSearchBar);
        // Reset searchQuery when closing the search bar
        if (!showSearchBar) {
            setSearchQuery('');
        }
    }

    const filteredMessages = searchQuery.trim() // Only filter if searchQuery is not empty
    ? messages.filter((message) =>
        message.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : messages;

    // const handleSendMessage = async () => {
    //     if (!text.trim()) return; // Prevent sending empty messages

    //     try {
    //         await SendMessage.execute(conversationId, item.id, text, "text");
    //         setText(""); // Clear the input field after sending
    //     } catch (error) {
    //         console.error("Failed to send message:", error);
    //     }
    // };

    // useEffect(() => {
    //     const fetchMessages = async () => {
    //         const fetchedMessages = await LoadMessages.execute(conversationId);
    //         setMessages(fetchedMessages);
    //     };
    //     fetchMessages();
    //     console.log(messages);
    // }, [conversationId, text]);

    useEffect(() => {
        // Load messages and listen for updates
        const unsubscribe = loadMessagesUse.execute(conversationId, setMessages);

        // Cleanup the subscription when the component unmounts
        return () => {
            unsubscribe();
        };
    }, [conversationId]);

    // useEffect(() => {
    //     // Fetch messages from your data source and update the state
    //     const fetchMessages = async () => {
    //         // Replace this with your actual data fetching logic
    //         const fetchedMessages = await LoadMessages.execute(conversationId);
    //         setMessages(fetchedMessages);
    //     };

    //     fetchMessages();
    // }, [conversationId, text]);

    useEffect(() => {
        if (flatListRef.current && messages.length > 0) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    const renderMessage = ({ item }) => (
        <MessageBubble
        message={item.text} 
        isOutgoing={item.sender_id === auth.currentUser.uid}
        timestamp={item.timestamp}
        status={item.msg_status}
        searchQuery={searchQuery}
        /> // Pass the search query to the MessageBubble 
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesome name="arrow-left" size={20} color="black" />
                </TouchableOpacity>

                {/* Profile Image */}
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('ProfilePicView', {
                            dpImage: item.profileImage,
                            groupName: item.name,
                        })
                    }
                >
                    <Image
                        source={{ uri: item.profileImage }}
                        style={styles.profilePic}
                    />
                </TouchableOpacity>

                {/* Header Text & Icons as a single TouchableOpacity */}
                <TouchableOpacity
                    style={styles.headerContent}
                    onPress={() =>
                        navigation.navigate('Profile', {
                            Image: item.profileImage,
                            name: item.name,
                        })
                    }
                >
                    <View style={styles.headerText}>
                        <Text style={styles.profileName}>{item.name}</Text>
                        <Text style={styles.accountType}>Business Account</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.searchButton} onPress={handleSearchButtonClick}>
                        <FontAwesome name="search" size={23} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.audiocallButton}>
                        <FontAwesome name="phone" size={23} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.moreoptButton}>
                        <MaterialIcons name="more-vert" size={23} color="black" />
                    </TouchableOpacity>
                </View>

            </View>

            {/* Messages */}
            {/* <View style={styles.container}>
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View
                            style={[
                                styles.messageContainer,
                                item.sender_id === auth.currentUser.uid ? styles.sentMessage : styles.receivedMessage,
                            ]}
                        >
                            <Text style={styles.messageText}>{item.text}</Text>
                            <Text style={styles.timestamp}>
                                {item.timestamp?.seconds
                                    ? new Date(item.timestamp.seconds * 1000).toLocaleTimeString()
                                    : ''}
                            </Text>
                        </View>
                    )}
                />
            </View> */}

            {/* Messages List */}
            {showSearchBar && (
            <TextInput
                style={styles.searchBar}
                placeholder="Search messages..."
                onChangeText={(text) => setSearchQuery(text)}
                value={searchQuery}/>
            )}
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            style={{ flex: 1 }}>
            <FlatList
                ref={flatListRef}
                data={filteredMessages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 90 }}/>
            {/* Your message input section */}
        </KeyboardAvoidingView>

            {/* Message Input */}
            <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.autocompleteButton}>
                    <Ionicons name="bulb-outline" size={20} color="#4CAF50" />
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder="Message"
                    value={text}
                    onChangeText={setText}
                    placeholderTextColor="black"
                />

                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={sendMessage}
                >
                    <Ionicons name="send" size={20} color="#4CAF50" style={{ transform: [{ rotate: '-30deg' }] }} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.cameraButton}>
                    <FontAwesome name="camera" size={20} color="black" style={styles.cameraIcon} />
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.micButton}>
                    <FontAwesome name="microphone" size={20} color="white" style={styles.micIcon} />
                </TouchableOpacity> */}
            </View>
        </View>
    );
};


export default Chat;