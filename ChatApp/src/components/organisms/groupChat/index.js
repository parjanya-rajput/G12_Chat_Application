import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar, TextInput, KeyboardAvoidingView, Platform, FlatList, ActivityIndicator, ScrollView, Keyboard } from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GroupRepository } from '../../../data/GroupRepository';  // Import GroupRepository for real-time updates
import GroupService from '../../../domain/GetGroupById';
import { sendGroupMessage } from '../../../domain/SendGroupMsg';
import MessageBubble from '../../../components/atoms/MessageBubble/Index';
import { auth } from '../../../firebase/firebase';
import LoadGroupMessages from '../../../domain/LoadGroupMessage';
import { generateAIResponse } from '../../../api/OneTap';
import styles from './style';
import { SafeAreaView } from 'react-native-safe-area-context';

const GroupChat = () => {
    const route = useRoute();
    const { groupDetails } = route.params;  // Retrieve passed groupDetails
    const [user, setuser] = useState(auth.currentUser);
    const navigation = useNavigation();
    const flatListRef = useRef();
    const staticProfileImage = 'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg';
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [error, setError] = useState(null);
    const [unsubscribe, setUnsubscribe] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isSuggestionBoxVisible, setIsSuggestionBoxVisible] = useState(false);
    const [currentGroupDetails, setCurrentGroupDetails] = useState(groupDetails); // Store current group details
    const [response, setResponse] = useState("");
    const [responseLoader, setResponseLoader] = useState(false);

    const groupRepository = new GroupRepository();
    const loadGroupMessages = new LoadGroupMessages(groupRepository);
    const getGroupById = new GroupService(groupRepository);

    // Disable the default navigation header
    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    // Function to handle search button click
    const handleSearchButtonClick = () => {
        setShowSearchBar(!showSearchBar);
        if (!showSearchBar) {
            setSearchQuery('');
        }
    };
    const handleSendMessage = () => {
        if (!text.trim()) return;
        console.log(currentGroupDetails.id, user.uid, text)
        sendGroupMessage.execute(currentGroupDetails.id, user.uid, text, "text");
        setText("");
    };
    // Set up real-time listener for group details using groupId (document ID)
    // useEffect(() => {
    //     const unsubscribe = getGroupById.getGroupById(currentGroupDetails.id, (updatedGroup) => {
    //         if (updatedGroup) {
    //             setCurrentGroupDetails(updatedGroup); // Update state with the latest group details
    //         }
    //     });

    //     // Clean up the subscription when the component unmounts
    //     return () => {
    //         if (unsubscribe) {
    //             unsubscribe();
    //         }
    //     };
    // }, [currentGroupDetails.id]);
    useEffect(() => {
        const fetchGroup = async () => {
            try {
                const unsubscribeFn = await getGroupById.getGroupById(currentGroupDetails.id, (data) => {
                    setCurrentGroupDetails(data);
                });
                setUnsubscribe(() => unsubscribeFn); // Store unsubscribe function for later cleanup
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGroup();

        // Cleanup unsubscribe on component unmount
        return () => {
            if (unsubscribe) {
                unsubscribe(); // Stop listening when the component is unmounted
            }
        };
    }, [currentGroupDetails.id, unsubscribe]);

    useEffect(() => {
        // Load messages and listen for updates
        const unsubscribe = loadGroupMessages.execute(currentGroupDetails.id, setMessages);

        // Cleanup the subscription when the component unmounts
        return () => {
            unsubscribe();
        };
    }, [currentGroupDetails.id]);

    // Scroll to the latest message when a new message is added
    useEffect(() => {
        if (flatListRef.current && messages.length > 0) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            if (flatListRef.current) {
                flatListRef.current.scrollToEnd({ animated: true });
            }
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            if (flatListRef.current) {
                flatListRef.current.scrollToEnd({ animated: true });
            }
        });

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);


    const filteredMessages = searchQuery.trim() // Only filter if searchQuery is not empty
        ? messages.filter((message) =>
            message.text.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : messages;


    const renderMessage = ({ item }) => (
        <MessageBubble
            message={item.text}
            isOutgoing={item.sender_id === auth.currentUser.uid}
            timestamp={item.timestamp}
            status={item.msg_status}
            searchQuery={searchQuery}
        /> // Pass the search query to the MessageBubble 
    );

    const handleResponse = (response) => {
        setText(response);
        // setIsBlurred(false);
        setIsSuggestionBoxVisible(false);
    }

    const handleSuggestions = async () => {
        if (text.trim() === '') return;
        setResponseLoader(true);
        try {
            // Generate AI response
            const aiResponse = await generateAIResponse(text);
            setResponse(aiResponse.trim());
            setIsSuggestionBoxVisible(!isSuggestionBoxVisible); // Toggle chat box visibility
            // setIsBlurred(!isBlurred);
        } catch (error) {
            console.error('Error sending message:', error);
        }
        setResponseLoader(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            {/* Custom Header */}
            <View style={styles.header}>
                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.goBack()}>
                    <FontAwesome name="arrow-left" size={20} color="black" />
                </TouchableOpacity>

                {/* Profile Image */}
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('ProfilePicView', {
                            dpImage: staticProfileImage,
                            // groupName: currentGroupDetails.groupName, // Pass the updated groupName
                        })
                    }
                >
                    <Image
                        source={{ uri: staticProfileImage }}
                        style={styles.profilePic}
                    />
                </TouchableOpacity>

                {/* Header Text & Icons */}
                <TouchableOpacity style={styles.headerContent}
                    onPress={() =>
                        navigation.navigate('GroupDetails', { groupDetails: groupDetails })
                    }
                >
                    <View style={styles.headerText}>
                        <Text style={styles.profileName}>{currentGroupDetails.groupName}</Text>
                        <Text style={styles.accountType}>Public Group</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.searchButton} onPress={handleSearchButtonClick}>
                        <FontAwesome name="search" size={23} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Search Bar */}
            {showSearchBar && (
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search messages..."
                    onChangeText={(text) => setSearchQuery(text)}
                    value={searchQuery} />
            )}

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}>

                <ScrollView
                    ref={flatListRef}
                    contentContainerStyle={{ paddingBottom: 90 }}
                    onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: false })}
                >
                    {filteredMessages.map((item) => (
                        <MessageBubble
                            key={item.id}
                            message={item.text}
                            isOutgoing={item.sender_id === auth.currentUser.uid}
                            timestamp={item.timestamp}
                            status={item.msg_status}
                            searchQuery={searchQuery}
                        />
                    ))}
                </ScrollView>
            </KeyboardAvoidingView>

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
                                // setIsBlurred(false); // Remove the blur when chat box is closed
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

            <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.autocompleteButton}
                    onPress={handleSuggestions}>
                    {
                        responseLoader ? (
                            <ActivityIndicator size="small" color="#609d95" />
                        ) : (
                            <Ionicons name="bulb-outline" size={20} color="#609d95" />
                        )
                    }
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
                    onPress={handleSendMessage}
                >
                    <Ionicons name="send" size={20} color="#609d95" style={{ transform: [{ rotate: '-30deg' }] }} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.cameraButton}>
                    <FontAwesome name="camera" size={20} color="black" style={styles.cameraIcon} />
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.micButton}>
                    <FontAwesome name="microphone" size={20} color="white" style={styles.micIcon} />
                </TouchableOpacity> */}
            </View>
        </SafeAreaView>
    );
};


export default GroupChat;
