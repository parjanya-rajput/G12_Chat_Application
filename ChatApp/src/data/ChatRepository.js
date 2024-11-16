import { query, orderBy, onSnapshot, where, setDoc, doc, updateDoc, addDoc, collection, serverTimestamp, getDocs } from 'firebase/firestore';
import { auth, firestore } from '../firebase/firebase';

export class ChatRepository {
    async getOrCreateConversation(userId1, userId2) {
        // const conversationRef = await getDocs(collection(firestore, "conversation"));
        // console.log({ userId1, userId2 });
        // const conversations = conversationRef.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // console.log(conversations);
        const querySnapshot = await getDocs(collection(firestore, "conversation"));
        const conversations = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const existingConversation = conversations.find(conversation =>
            (conversation.participant_ids.includes(userId1) && conversation.participant_ids.includes(userId2))
        );

        if (existingConversation) {
            return existingConversation.id;
        }

        const docRef = await addDoc(collection(firestore, "conversation"), {
            participant_ids: [userId1, userId2],
            last_message: "",
            last_message_timestamp: serverTimestamp(),
        });

        return docRef.id;
    }

    // async loadMessages(conversationId) {
    //     const messagesRef = collection(firestore, "conversation", conversationId, "messages");
    //     const q = query(messagesRef, orderBy("timestamp", "asc"));
    //     const querySnapshot = await getDocs(q);
    //     const messages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //     // console.log(messages);
    //     return messages;
    // }

    loadMessages(conversationId, callback) {
        try {
            // Reference to the messages collection for the given conversation
            const messagesRef = collection(firestore, "conversation", conversationId, "messages");

            // Create a query to order messages by timestamp in ascending order
            const q = query(messagesRef, orderBy("timestamp", "asc"));

            // Use onSnapshot to listen to changes in the messages collection
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const messages = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                callback(messages); // Pass the messages to the provided callback
            });

            // Return the unsubscribe function to stop listening when no longer needed
            return unsubscribe;
        } catch (error) {
            console.error("Error loading messages:", error);
            throw error;
        }
    }

    // Send message function 
    async sendMessage(conversationId, senderId, content, messageType = "text") {
        const messageRef = collection(firestore, "conversation", conversationId, "messages");

        const msg = await addDoc(collection(firestore, "conversation", conversationId, "messages"), {
            sender_id: auth.currentUser.uid,
            recv_id: senderId,
            text: content,
            timestamp: serverTimestamp(),
            type: messageType,
            msg_status: "sent",
        });

        await updateDoc(doc(firestore, "conversation", conversationId), {
            last_message: content,
            last_message_timestamp: serverTimestamp(),
        });
    }

    // Send message function
    // async sendMessage(conversationId, senderId, content, messageType = "text") {
    //     try {
    //         const currentUser = auth.currentUser;
    //         if (!currentUser) {
    //             throw new Error("User is not logged in");
    //         }

    //         // Reference to the messages collection within the conversation
    //         const messageRef = collection(firestore, "conversation", conversationId, "messages");

    //         // Add a new message to the messages collection
    //         await addDoc(messageRef, {
    //             sender_id: currentUser.uid,
    //             recv_id: senderId,
    //             text: content,
    //             timestamp: serverTimestamp(),
    //             type: messageType,
    //             msg_status: "sent",
    //         });

    //         // Update the last message in the parent conversation document
    //         const conversationRef = doc(firestore, "conversation", conversationId);
    //         await updateDoc(conversationRef, {
    //             last_message: content,
    //             last_message_timestamp: serverTimestamp(),
    //         });
    //     } catch (error) {
    //         console.error("Error sending message:", error);
    //         throw error;
    //     }
    // }

    // async getPastConversations(callback) {
    //     const user = auth.currentUser;
    //     if (!user) {
    //         console.log("User not found, kindly login again!");
    //         return;
    //     }
    //     try {
    //         const conversationsRef = collection(firestore, "conversation");
    //         const q = query(
    //             conversationsRef,
    //             where("participant_ids", "array-contains", user.uid),
    //             orderBy("last_message_timestamp", "desc")
    //         );

    //         onSnapshot(q, (querySnapshot) => {
    //             const conversations = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //             callback(conversations);
    //         });
    //     } catch (error) {
    //         console.error("Error fetching conversations:", error);
    //         throw error;
    //     }
    // }

    getPastConversations(callback) {
        const user = auth.currentUser;
        if (!user) {
            console.error("User not logged in");
            return null;
        }

        try {
            const conversationsRef = collection(firestore, "conversation");
            const q = query(
                conversationsRef,
                where("participant_ids", "array-contains", user.uid),
                orderBy("last_message_timestamp", "desc")
            );

            // Return the unsubscribe function from Firestore
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const conversations = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                callback(conversations);
            });

            return unsubscribe; // Correctly return the function
        } catch (error) {
            console.error("Error in fetching conversations:", error);
            throw error;
        }
    }
}

export default new ChatRepository();