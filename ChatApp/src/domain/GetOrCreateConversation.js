import ChatRepository from "../data/ChatRepository";

export class GetOrCreateConversation {
    static async execute(userId1, userId2) {
        return ChatRepository.getOrCreateConversation(userId1, userId2);
    }
}
