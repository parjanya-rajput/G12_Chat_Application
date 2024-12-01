// groupService
import { firestore } from '../firebase/firebase'; // Import your initialized Firestore instance
import { collection, doc, addDoc, setDoc, serverTimestamp } from 'firebase/firestore';

// Function to create a new group with optional members and messages
export const createGroup = async (groupId, groupName, description, members = [], messages = []) => {
    const groupsCollectionRef = collection(firestore, 'Groups'); // Reference to the 'Groups' collection

    // Group data to be sent to Firestore
    const groupData = {
        groupId: groupId,
        groupName: groupName,
        description: description,
        lastmsg: '',
        lastmsg_time: serverTimestamp() // Firebase server timestamp
    };

    try {
        // Add a new group document to the "Groups" collection
        const groupRef = await addDoc(groupsCollectionRef, groupData);
        const createdGroupId = groupRef.id;

        // Add each member to the "members" subcollection under the new group
        await Promise.all(members.map(async (member) => {
            const memberRef = doc(firestore, "Groups", createdGroupId, "members", member.id);
            await setDoc(memberRef, {
                // id: member.id,
                // name: member.name, // Adjust based on the actual field names you use
                // role: member.role
                isAdmin: member.role,
            });
        }));

        // Add each message to the "messages" subcollection under the new group
        await Promise.all(messages.map(async (message) => {
            const messageRef = doc(firestore, "Groups", createdGroupId, "messages", message.id);
            await setDoc(messageRef, {
                id: message.id,
                senderId: message.senderId,
                text: message.text,
                msg_status: message.msg_status, // Adjust based on the actual field names you use
                msg_time: serverTimestamp() // or use message.msg_time if it's passed directly
            });
        }));

        console.log('Group created with ID:', createdGroupId);
        return createdGroupId;
    } catch (error) {
        console.error('Error creating group:', error.message);
        throw error;
    }
};


export const addMembersToGroup = async (groupId, members) => {
    try {
        // Reference to the group document
        const groupRef = doc(firestore, 'Groups', groupId);

        // Add members to the "members" subcollection for the existing group
        await Promise.all(members.map(async (member) => {
            const memberRef = doc(firestore, 'Groups', groupId, 'members', member.id);

            // Ensure isAdmin is defined and provide a default if missing
            const isAdminValue = member.isAdmin == 'true' ? 'Admin' : 'Member';
            console.log(isAdminValue)
            await setDoc(memberRef, {
                isAdmin: isAdminValue,
            });
        }));

        console.log('Members added successfully');
    } catch (error) {
        console.error('Error adding members:', error); // This should show more detailed information
        throw error;
    }
};