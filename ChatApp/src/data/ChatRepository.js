import { query, orderBy, onSnapshot, setDoc, doc, updateDoc, addDoc, collection, serverTimestamp, getDocs } from 'firebase/firestore';
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

    // async loadMessages(conversationId) {
    //     const messagesRef = collection(firestore, "conversation", conversationId, "messages");
    //     const q = query(messagesRef, orderBy("timestamp", "asc"));
    //     onSnapshot(q, (snapshot) => {
    //         const msg = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    //         console.log(msg);
    //     });
    //     // console.log("ChatRepo: " + messages);
    //     return messages;
    // }
    async loadMessages(conversationId) {
        const messagesRef = collection(firestore, "conversation", conversationId, "messages");
        const q = query(messagesRef, orderBy("timestamp", "asc"));
        const querySnapshot = await getDocs(q);
        const messages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // console.log(messages);
        return messages;
    }

}

export default new ChatRepository();