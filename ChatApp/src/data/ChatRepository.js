import { query, orderBy, onSnapshot, where, setDoc, doc, updateDoc, addDoc, collection, serverTimestamp, getDocs } from 'firebase/firestore';
import { auth, firestore } from '../firebase/firebase';

class ChatRepository {
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

    async loadMessages(conversationId) {
        const messagesRef = collection(firestore, "conversation", conversationId, "messages");
        const q = query(messagesRef, orderBy("timestamp", "asc"));
        const querySnapshot = await getDocs(q);
        const messages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // console.log(messages);
        return messages;
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

    async getPastConversations() {
        const user = auth.currentUser;
        if (!user) {
            console.log("User not found, kindly login again!");
            return;
        }
        try {
            const conversationsRef = collection(firestore, "conversation");
            const q = query(
                conversationsRef,
                where("participant_ids", "array-contains", user.uid),
                orderBy("last_message_timestamp", "desc")
            );
            const querySnapshot = await getDocs(q);
            const conversations = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // console.log("Repo:", JSON.stringify(conversations, null, 2));

            return conversations;
        } catch (error) {
            console.error("Error fetching conversations:", error);
            throw error;
        }
    }
}

export default new ChatRepository();