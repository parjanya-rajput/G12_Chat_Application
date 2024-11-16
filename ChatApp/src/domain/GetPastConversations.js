// import ChatRepository from "../data/ChatRepository";

// export class GetPastConversations {
//     static async execute() {
//         const conversations = await ChatRepository.getPastConversations();
//         // console.log("Repo:", JSON.stringify(conversations, null, 2));
//         return conversations;
//     }
// };

// class GetPastConversations {
//     constructor(ChatRepository) {
//         this.ChatRepository = ChatRepository;
//     }

class GetPastConversations {
    constructor(conversationRepository) {
        this.conversationRepository = conversationRepository;
    }

    execute(callback) {
        try {
            return this.conversationRepository.getPastConversations(callback); // Return unsubscribe directly
        } catch (error) {
            console.error("Error in GetPastConversations use case:", error);
            throw error;
        }
    }
}

export default GetPastConversations;

