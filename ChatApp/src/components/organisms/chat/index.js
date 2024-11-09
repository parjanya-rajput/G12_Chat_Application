import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import styles from './style';

const Chat = ({ route, navigation }) => {
    const { username, profileImage } = route.params;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesome name="arrow-left" size={20} color="white" />
                </TouchableOpacity>

                {/* Profile Image */}
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('ProfilePicView', {
                            dpImage: profileImage,
                            groupName: username,
                        })
                    }
                >
                    <Image
                        source={{ uri: profileImage }}
                        style={styles.profilePic}
                    />
                </TouchableOpacity>

                {/* Header Text & Icons as a single TouchableOpacity */}
                <TouchableOpacity
                    style={styles.headerContent}
                    onPress={() =>
                        navigation.navigate('Profile', {
                            Image: profileImage,
                            name: username,
                        })
                    }
                >
                    <View style={styles.headerText}>
                        <Text style={styles.profileName}>{username}</Text>
                        <Text style={styles.accountType}>Business Account</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.videocallButton}>
                        <FontAwesome name="video-camera" size={23} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.audiocallButton}>
                        <FontAwesome name="phone" size={23} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.moreoptButton}>
                        <MaterialIcons name="more-vert" size={23} color="white" />
                    </TouchableOpacity>
                </View>

            </View>

            {/* Message Input */}
            <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.emojiButton}>
                    <FontAwesome name="smile-o" size={24} color="black" style={styles.emojiIcon} />
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder="Message"
                    placeholderTextColor="black"
                />
                <TouchableOpacity>
                    <FontAwesome name="paperclip" size={23} color="black" style={styles.paperclipIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.cameraButton}>
                    <FontAwesome name="camera" size={16} color="white" style={styles.cameraIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.micButton}>
                    <FontAwesome name="microphone" size={20} color="white" style={styles.micIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};


export default Chat;
