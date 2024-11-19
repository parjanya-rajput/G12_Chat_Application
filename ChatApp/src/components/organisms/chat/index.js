// import React, { useEffect, useRef } from 'react';
// import { View, Text, TouchableOpacity, Image, TextInput, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
// import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
// import styles from './style';
// import { Ionicons } from '@expo/vector-icons';
// import MessageBubble from '../../atoms/MessageBubble/Index';
// // import Feather from 'react-native-vector-icons/Feather';

// import { useRoute } from '@react-navigation/native';
// import { useNavigation } from '@react-navigation/native';

// import { SendMessage } from '../../../domain/SendMessage';
// import { useState } from 'react';

// import { ChatRepository } from '../../../data/ChatRepository';
// import LoadMessages from '../../../domain/LoadMessage';
// import { auth } from '../../../firebase/firebase';

// const Chat = () => {

//     const navigation = useNavigation();
//     const route = useRoute();
//     const { item, conversationId } = route.params;
//     const [messages, setMessages] = useState([]);
//     const [text, setText] = useState("");
//     const flatListRef = useRef(null);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [showSearchBar, setShowSearchBar] = useState(false);

//     const chatRepository = new ChatRepository();
//     // const sendMessageUse = new SendMessage(chatRepository);
//     const loadMessagesUse = new LoadMessages(chatRepository);

//     const sendMessage = () => {
//         if (!text.trim()) return;
//         console.log(conversationId, item.id, text);
//         SendMessage.execute(conversationId, item.id, text, "text");
//         setText("");
//     };

//     const handleSearchButtonClick = () => {
//         setShowSearchBar(!showSearchBar);
//         // Reset searchQuery when closing the search bar
//         if (!showSearchBar) {
//             setSearchQuery('');
//         }
//     }

//     const filteredMessages = searchQuery.trim() // Only filter if searchQuery is not empty
//     ? messages.filter((message) =>
//         message.text.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     : messages;

//     // const handleSendMessage = async () => {
//     //     if (!text.trim()) return; // Prevent sending empty messages

//     //     try {
//     //         await SendMessage.execute(conversationId, item.id, text, "text");
//     //         setText(""); // Clear the input field after sending
//     //     } catch (error) {
//     //         console.error("Failed to send message:", error);
//     //     }
//     // };

//     // useEffect(() => {
//     //     const fetchMessages = async () => {
//     //         const fetchedMessages = await LoadMessages.execute(conversationId);
//     //         setMessages(fetchedMessages);
//     //     };
//     //     fetchMessages();
//     //     console.log(messages);
//     // }, [conversationId, text]);

//     useEffect(() => {
//         console.log(item);
//         // Load messages and listen for updates
//         const unsubscribe = loadMessagesUse.execute(conversationId, setMessages);

//         // Cleanup the subscription when the component unmounts
//         return () => {
//             unsubscribe();
//         };
//     }, [conversationId]);

//     // useEffect(() => {
//     //     // Fetch messages from your data source and update the state
//     //     const fetchMessages = async () => {
//     //         // Replace this with your actual data fetching logic
//     //         const fetchedMessages = await LoadMessages.execute(conversationId);
//     //         setMessages(fetchedMessages);
//     //     };

//     //     fetchMessages();
//     // }, [conversationId, text]);

//     useEffect(() => {
//         if (flatListRef.current && messages.length > 0) {
//             flatListRef.current.scrollToEnd({ animated: true });
//         }
//     }, [messages]);

//     const renderMessage = ({ item }) => (
//         <MessageBubble
//         message={item.text} 
//         isOutgoing={item.sender_id === auth.currentUser.uid}
//         timestamp={item.timestamp}
//         status={item.msg_status}
//         searchQuery={searchQuery}
//         /> // Pass the search query to the MessageBubble 
//     );

//     return (
//         <View style={styles.container}>
//             {/* Header */}
//             <View style={styles.header}>
//                 <TouchableOpacity onPress={() => navigation.goBack()}>
//                     <FontAwesome name="arrow-left" size={20} color="black" />
//                 </TouchableOpacity>

//                 {/* Profile Image */}
//                 <TouchableOpacity
//                     onPress={() =>
//                         navigation.navigate('ProfilePicView', {
//                             dpImage: item.profileImage,
//                             groupName: item.name,
//                         })
//                     }
//                 >
//                     <Image
//                         source={{ uri: item.profile_pic }}
//                         style={styles.profilePic}
//                     />
//                 </TouchableOpacity>

//                 {/* Header Text & Icons as a single TouchableOpacity */}
//                 <TouchableOpacity
//                     style={styles.headerContent}
//                     onPress={() =>
//                         navigation.navigate('ProfilePicView')
//                     }
//                 >
//                     <View style={styles.headerText}>
//                         <Text style={styles.profileName}>{item.name}</Text>
//                         <Text style={styles.accountType}>Business Account</Text>
//                     </View>
//                 </TouchableOpacity>

//                 <View style={styles.headerIcons}>
//                     <TouchableOpacity style={styles.searchButton} onPress={handleSearchButtonClick}>
//                         <FontAwesome name="search" size={23} color="black" />
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.audiocallButton}>
//                         <FontAwesome name="phone" size={23} color="black" />
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.moreoptButton}>
//                         <MaterialIcons name="more-vert" size={23} color="black" />
//                     </TouchableOpacity>
//                 </View>

//             </View>

//             {/* Messages */}
//             {/* <View style={styles.container}>
//                 <FlatList
//                     ref={flatListRef}
//                     data={messages}
//                     keyExtractor={(item) => item.id}
//                     renderItem={({ item }) => (
//                         <View
//                             style={[
//                                 styles.messageContainer,
//                                 item.sender_id === auth.currentUser.uid ? styles.sentMessage : styles.receivedMessage,
//                             ]}
//                         >
//                             <Text style={styles.messageText}>{item.text}</Text>
//                             <Text style={styles.timestamp}>
//                                 {item.timestamp?.seconds
//                                     ? new Date(item.timestamp.seconds * 1000).toLocaleTimeString()
//                                     : ''}
//                             </Text>
//                         </View>
//                     )}
//                 />
//             </View> */}

//             {/* Messages List */}
//             {showSearchBar && (
//             <TextInput
//                 style={styles.searchBar}
//                 placeholder="Search messages..."
//                 onChangeText={(text) => setSearchQuery(text)}
//                 value={searchQuery}/>
//             )}
//         <KeyboardAvoidingView 
//             behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
//             style={{ flex: 1 }}>
//             <FlatList
//                 ref={flatListRef}
//                 data={filteredMessages}
//                 renderItem={renderMessage}
//                 keyExtractor={(item) => item.id}
//                 contentContainerStyle={{ paddingBottom: 90 }}/>
//             {/* Your message input section */}
//         </KeyboardAvoidingView>

//             {/* Message Input */}
//             <View style={styles.inputContainer}>
//                 <TouchableOpacity style={styles.autocompleteButton}>
//                     <Ionicons name="bulb-outline" size={20} color="#609d95" />
//                 </TouchableOpacity>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Message"
//                     value={text}
//                     onChangeText={setText}
//                     placeholderTextColor="black"
//                 />

//                 <TouchableOpacity
//                     style={styles.sendButton}
//                     onPress={sendMessage}
//                 >
//                     <Ionicons name="send" size={20} color="#609d95" style={{ transform: [{ rotate: '-30deg' }] }} />
//                 </TouchableOpacity>

//                 <TouchableOpacity style={styles.cameraButton}>
//                     <FontAwesome name="camera" size={20} color="black" style={styles.cameraIcon} />
//                 </TouchableOpacity>
//                 {/* <TouchableOpacity style={styles.micButton}>
//                     <FontAwesome name="microphone" size={20} color="white" style={styles.micIcon} />
//                 </TouchableOpacity> */}
//             </View>
//         </View>
//     );
// };


// export default Chat;




import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, FlatList, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import styles from './style';
import MessageBubble from '../../atoms/MessageBubble/Index';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SendMessage } from '../../../domain/SendMessage';
import { ChatRepository } from '../../../data/ChatRepository';
import LoadMessages from '../../../domain/LoadMessage';
import { auth } from '../../../firebase/firebase';
import { BlurView } from 'expo-blur';
import { ScrollView } from 'react-native';
import { Keyboard } from 'react-native';

const Chat = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { item, conversationId } = route.params;
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const flatListRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false); // State for full-screen image view
    const [isSuggestionBoxVisible, setIsSuggestionBoxVisible] = useState(false);
    const [isBlurred, setIsBlurred] = useState(false); // State for blur effect
    const [response, setResponse] = useState("This is your SuggestionBox!");


    const chatRepository = new ChatRepository();
    const loadMessagesUse = new LoadMessages(chatRepository);

    const sendMessage = () => {
        if (!text.trim()) return;
        SendMessage.execute(conversationId, item.id, text, 'text');
        setText('');
    };

    const handleSearchButtonClick = () => {
        setShowSearchBar(!showSearchBar);
        if (!showSearchBar) {
            setSearchQuery('');
        }
    };

    const filteredMessages = searchQuery.trim()
        ? messages.filter((message) =>
              message.text.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : messages;

    useEffect(() => {
        const unsubscribe = loadMessagesUse.execute(conversationId, setMessages);
        return () => {
            unsubscribe();
        };
    }, [conversationId]);

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
        />
    );

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

    const handleResponse = (response) => {
        setText(response);
        setIsBlurred(false);
        setIsSuggestionBoxVisible(false);
    }

    return (
        <View style={styles.container}>
            {/* Apply BlurView when isBlurred is true */}
            {isBlurred && (
                <BlurView intensity={100} style={styles.backgroundBlur}>
                </BlurView>
            )}

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesome name="arrow-left" size={20} color="black" />
                </TouchableOpacity>

                {/* Profile Image */}
                <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                    <Image
                        source={{ uri: item.profile_pic }}
                        style={styles.profilePic}
                    />
                </TouchableOpacity>

                {/* Header Text & Icons */}
                <TouchableOpacity
                    style={styles.headerContent}
                    onPress={() =>
                        navigation.navigate('UserProfileScreen',{profile:item})
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
                            style={styles.closeButtonProfile}
                        >
                            <FontAwesome name="close" size={24} color="#fff" />
                        </TouchableOpacity>
                        <Image
                            source={{ uri: item.profile_pic }}
                            style={styles.modalImage}
                            resizeMode="contain"
                        />
                        <Text style={styles.modalName}>{item.name}</Text>
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
                        source={{ uri: item.profile_pic }}
                        style={styles.fullScreenImage}
                        resizeMode="contain"
                    />
                </View>
            </Modal>


            {/* Search Bar */}
            {showSearchBar && (
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search messages..."
                    onChangeText={(text) => setSearchQuery(text)}
                    value={searchQuery}
                />
            )}

            {/* Messages List */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <FlatList
                    ref={flatListRef}
                    data={filteredMessages}
                    renderItem={renderMessage}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingBottom: 90 }}
                />
            </KeyboardAvoidingView>

            {/* Chat Box triggered by bulb-outline button */}
        {isSuggestionBoxVisible && (
                <View style={[styles.SuggestionBox, { maxHeight: '40%' }]}>
                    <ScrollView>
                        <Text style={styles.SuggestionBoxText}>{response}</Text>
                    </ScrollView>
                    <View style={styles.SuggestionBoxButtons}>
                        {/* Close Button */}
                        <TouchableOpacity
                            onPress={() => {
                                // Close the chat box and remove the blur effect
                                Keyboard.dismiss();
                                setIsSuggestionBoxVisible(false);
                                setIsBlurred(false); // Remove the blur when chat box is closed
                            }}
                            style={styles.closeButton}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                        {/* OK Button */}
                        <TouchableOpacity
                            onPress={() => {
                                // Handle OK button action here
                                handleResponse(response);
                            }}
                            style={styles.okButton}
                        >
                            <Text style={styles.okButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* Message Input */}
            <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.autocompleteButton}
                    onPress={() => {
                        setIsSuggestionBoxVisible(!isSuggestionBoxVisible); // Toggle chat box visibility
                        setIsBlurred(!isBlurred); // Toggle blur
                    }}
                >
                    <Ionicons name="bulb-outline" size={20} color="#609d95" />
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
                    <Ionicons
                        name="send"
                        size={20}
                        color="#609d95"
                        style={{ transform: [{ rotate: '-30deg' }] }}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.cameraButton}>
                    <FontAwesome
                        name="camera"
                        size={20}
                        color="black"
                        style={styles.cameraIcon}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Chat;

