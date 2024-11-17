import { collection, query, where, onSnapshot, getDocs, doc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

class GroupRepository {
    // Fetch all groups with real-time updates, including members and messages subcollections
    getAllGroups(callback) {
        try {
            // Listen for real-time updates on the Groups collection
            const unsubscribe = onSnapshot(collection(firestore, "Groups"), async (querySnapshot) => {
                // Map over each document and get its data along with subcollections
                const groups = await Promise.all(querySnapshot.docs.map(async (doc) => {
                    const groupData = { id: doc.id, ...doc.data() };

                    // Fetch members subcollection
                    const membersSnapshot = await getDocs(collection(firestore, "Groups", doc.id, "members"));
                    groupData.members = membersSnapshot.docs.map(memberDoc => ({ id: memberDoc.id, ...memberDoc.data() }));

                    // Fetch messages subcollection
                    const messagesSnapshot = await getDocs(collection(firestore, "Groups", doc.id, "messages"));
                    groupData.messages = messagesSnapshot.docs.map(messageDoc => ({ id: messageDoc.id, ...messageDoc.data() }));

                    return groupData;
                }));

                callback(groups); // Pass the groups to the provided callback
            });

            // Return the unsubscribe function to stop listening when no longer needed
            return unsubscribe;
        } catch (error) {
            console.error("Error fetching groups:", error);
            throw error;
        }
    }

    // Fetch group details by groupId with real-time updates, including members and messages
    getGroupById(groupId, callback) {
        try {
            // Reference to the specific group document by its ID
            const groupRef = doc(collection(firestore, "Groups"), groupId);

            // Listen for real-time updates on the group document
            const unsubscribe = onSnapshot(groupRef, async (docSnapshot) => {
                if (!docSnapshot.exists()) {
                    console.log("No group found with ID:", groupId);
                    callback(null);
                    return;
                }

                // Fetch group data
                const groupData = { id: docSnapshot.id, ...docSnapshot.data() };

                // Fetch members subcollection
                const membersSnapshot = await getDocs(collection(firestore, "Groups", docSnapshot.id, "members"));
                groupData.members = membersSnapshot.docs.map(memberDoc => ({ id: memberDoc.id, ...memberDoc.data() }));

                // Fetch messages subcollection
                const messagesSnapshot = await getDocs(collection(firestore, "Groups", docSnapshot.id, "messages"));
                groupData.messages = messagesSnapshot.docs.map(messageDoc => ({ id: messageDoc.id, ...messageDoc.data() }));

                callback(groupData); // Pass the group data to the provided callback
            });

            // Return the unsubscribe function to stop listening when no longer needed
            return unsubscribe;
        } catch (error) {
            console.error("Error fetching group by groupId:", error);
            throw error;
        }
    }
}

// Export a single instance (singleton)
export default new GroupRepository();
