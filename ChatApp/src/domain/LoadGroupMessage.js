// import ChatRepository from "../data/ChatRepository";

// export class LoadMessages {
//     static async execute(conversationId) {
//         const messages = await ChatRepository.loadMessages(conversationId);
//         // console.log(messages);
//         return messages;
//     }
// }

// export default new LoadMessages();

class LoadGroupMessages {
    constructor(GroupRepository) {
        this.GroupRepository = GroupRepository;
    }

    execute(groupId, callback) {
        try {
            // Use the repository to load messages and listen for changes
            const unsubscribe = this.GroupRepository.loadGroupMessages(groupId, callback);
            return unsubscribe; // Return the unsubscribe function to the caller
        } catch (error) {
            console.error("Error in LoadMessages use case:", error);
            throw error;
        }
    }
}

export default LoadGroupMessages;