import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Swipeable } from "react-native-gesture-handler";

import { FontAwesome } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./style";

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { auth } from "../../../firebase/firebase"; // Make sure to import your auth instance

const ChatListItem1 = ({ item, onSwipeOpen }) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const defaultProfilePic =
    "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";
  const defaultUserName = "Unknown User";
  const db = getFirestore();

  const addConversation = async (senderId) => {
    const currentUserId = auth.currentUser.uid; // Get the current user's ID
    const conversationRef = collection(db, "conversation");

    // Query to check if a conversation already exists between the current user and the sender
    const q = query(
      conversationRef,
      where("participant_ids", "array-contains", currentUserId) // Only need to check for current user ID
    );

    const querySnapshot = await getDocs(q);

    // Filter the results manually to check if the senderId is also in the participant_ids array
    const existingConversation = querySnapshot.docs.find((doc) =>
      doc.data().participant_ids.includes(senderId)
    );

    if (existingConversation) {
      // If a conversation already exists, log it
      //   console.log("Conversation already exists");
      //   console.log("Chat", { id: existingConversation.id });
      //   alert("Conversation already exists");
      navigation.replace("Chat", {
        item,
        conversationId: existingConversation.id,
      });
    } else {
      // If no conversation exists, create a new one
      const newConversationRef = doc(conversationRef); // Auto-generate a new document ID
      await setDoc(newConversationRef, {
        last_message: "Last message seen here", // Default last message
        last_message_timestamp: Timestamp.fromDate(new Date()), // Current timestamp
        participant_ids: [currentUserId, senderId], // Add current and sender IDs
      });

      //   console.log("New conversation added");
      //   console.log("Chat", { id: newConversationRef.id });
      //   alert("New conversation added");
      navigation.replace("Chat", {
        item,
        conversationId: newConversationRef.id,
      });
    }
  };

  // Usage in your component (on press or action)
  const handleConversationPress = (itemId) => {
    console.log(item);
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
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: item.profile_pic }}
              style={styles.profileImage}
            />
          </View>
        </TouchableOpacity>

        {/* User Info */}
        <TouchableOpacity
          style={styles.textContainer}
          onPress={() => {
            handleConversationPress(item.id);
          }}>
          <Text style={styles.username}>{item.name}</Text>
          <Text style={styles.status}>{item.bio}</Text>
        </TouchableOpacity>

        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={styles.closeButton}>
                <FontAwesome name="close" size={24} color="#fff" />
              </TouchableOpacity>
              <Image
                source={{
                  uri: item ? item.profile_pic : defaultProfilePic,
                }}
                style={styles.modalImage}
                resizeMode="contain"
              />
              <Text style={styles.modalName}>
                {item ? item.name : defaultUserName}
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default ChatListItem1;
