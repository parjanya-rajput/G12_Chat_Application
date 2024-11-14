import ChatRepository from "../data/ChatRepository";

export class SendMessage {
    static async execute(conversationId, senderId, content, messageType) {
        return ChatRepository.sendMessage(conversationId, senderId, content, messageType);
    }
}