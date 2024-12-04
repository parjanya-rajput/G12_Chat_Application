import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Swipeable } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { auth, firestore } from "../../../firebase/firebase";
import {
  doc,
  deleteDoc,
  collection,
  getDocs,
  getDoc,
} from "firebase/firestore";
import styles from "./style";
import { FontAwesome } from "@expo/vector-icons";
import { GetUserByUserId } from "../../../domain/GetUserByUserId";

const ChatListItem = ({ item, conversation, onSwipeOpen }) => {
  const navigation = useNavigation();
  const swipeableRef = useRef(null);
  const [senderProfile, setSenderProfile] = useState(null);
  const currentUserId = auth.currentUser ? auth.currentUser.uid : null;
  const senderId = item.participant_ids.find((id) => id !== currentUserId);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const defaultProfilePic =
    "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";
  const defaultUserName = "Unknown User";

  useEffect(() => {
    const fetchSenderProfile = async () => {
      try {
        if (senderId) {
          const userProfile = await GetUserByUserId.execute(senderId);
          setSenderProfile(userProfile);

          GetUserByUserId.listenToUserUpdates(senderId, (updatedProfile) => {
            if (updatedProfile) {
              setSenderProfile(updatedProfile);
            }
          });
        }
      } catch (error) {
        console.error("Failed to fetch sender profile:", error);
      }
    };

    fetchSenderProfile();

    return () => {
      setSenderProfile(null);
    };
  }, [senderId]);

  const handleDeleteConversation = async (conversationId) => {
    try {
      setIsLoading(true);

      // Reference to the conversation document
      const conversationRef = doc(firestore, "conversation", conversationId);
      const conversationDoc = await getDoc(conversationRef);
      if (!conversationDoc.exists()) {
        console.error("Conversation not found.");
        setIsLoading(false);
        return;
      }

      // Delete messages if any
      const messagesRef = collection(conversationRef, "messages");
      const messagesSnapshot = await getDocs(messagesRef);
      if (!messagesSnapshot.empty) {
        const deleteMessagesPromises = messagesSnapshot.docs.map((doc) =>
          deleteDoc(doc.ref)
        );
        await Promise.all(deleteMessagesPromises);
        console.log("All messages deleted");
      }

      // Delete the conversation document itself
      await deleteDoc(conversationRef);
      console.log("Conversation and all its messages deleted successfully.");
      setIsLoading(false);
      // Alert.alert("Conversation and all its messages deleted successfully.");
    } catch (error) {
      console.error("Error deleting conversation:", error);
      setIsLoading(false);
      alert("Error deleting conversation.");
    }
  };

  const DeleteConversation = (conversationId) => {
    handleDeleteConversation(conversationId);
  };

  const renderRightActions = (progress, dragX) => (
    <View style={styles.rightActions}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => {
          DeleteConversation(item.id);
        }}>
        <Icon name="delete" size={25} color="#ff3b30" />
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.actionButton}>
        <Icon name="bell-off" size={25} color="#ffcc00" />
      </TouchableOpacity> */}
    </View>
  );

  // const renderLeftActions = (progress, dragX) => (
  //   <View style={styles.leftActions}>
  //     <TouchableOpacity style={styles.actionButton}>
  //       <Icon name="archive" size={25} color="#757575" />
  //     </TouchableOpacity>
  //   </View>
  // );

  const startChat = async (userId) => {
    if (senderProfile == null) {
      alert("User has deactivated the account");
      return;
    }
    navigation.navigate("Chat", {
      item: senderProfile,
      conversationId: item.id,
    });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      // renderLeftActions={renderLeftActions}
      onSwipeableOpen={() => onSwipeOpen(swipeableRef.current)}>
      <View style={styles.container}>
        {/* Profile Image with black background */}
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <View style={styles.imageWrapper}>
            <Image
              source={{
                uri: senderProfile
                  ? senderProfile.profile_pic
                  : defaultProfilePic,
              }}
              style={styles.profileImage}
            />
          </View>
        </TouchableOpacity>

        {/* User Info */}
        <TouchableOpacity
          style={styles.textContainer}
          onPress={() => startChat(item.id)}>
          <Text style={styles.username}>
            {senderProfile ? senderProfile.name : defaultUserName}
          </Text>
          <Text style={styles.status}>
            {item
              ? item.last_message.length > 50
                ? item.last_message.substring(0, 47) + "..."
                : item.last_message
              : "Conversation doesn't exist!"}
          </Text>
        </TouchableOpacity>

        {/* Modal for Profile Image */}
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
                  uri: senderProfile
                    ? senderProfile.profile_pic
                    : defaultProfilePic,
                }}
                style={styles.modalImage}
                resizeMode="contain"
              />
              <Text style={styles.modalName}>
                {senderProfile ? senderProfile.name : defaultUserName}
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    </Swipeable>
  );
};

export default ChatListItem;
