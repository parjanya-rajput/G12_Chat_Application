// import ChatRepository from "../data/ChatRepository";

// export class LoadMessages {
//     static async execute(conversationId) {
//         const messages = await ChatRepository.loadMessages(conversationId);
//         // console.log(messages);
//         return messages;
//     }
// }

// export default new LoadMessages();

class LoadMessages {
    constructor(chatRepository) {
        this.chatRepository = chatRepository;
    }

    execute(conversationId, callback) {
        try {
            // Use the repository to load messages and listen for changes
            const unsubscribe = this.chatRepository.loadMessages(conversationId, callback);
            return unsubscribe; // Return the unsubscribe function to the caller
        } catch (error) {
            console.error("Error in LoadMessages use case:", error);
            throw error;
        }
    }
}

export default LoadMessages;