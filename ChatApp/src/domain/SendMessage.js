import ChatRepository from "../data/ChatRepository";

export class SendMessage {
    static async execute(conversationId, senderId, content, messageType) {
        return ChatRepository.sendMessage(conversationId, senderId, content, messageType);
    }
}

// class SendMessage {
//     constructor(chatRepository) {
//         this.chatRepository = chatRepository;
//     }

//     async execute(conversationId, senderId, content, messageType = "text") {
//         try {
//             // Call the repository to send the message
//             await this.chatRepository.sendMessage(conversationId, senderId, content, messageType);
//         } catch (error) {
//             console.error("Error in SendMessage use case:", error);
//             throw error;
//         }
//     }
// }

// export default SendMessage;