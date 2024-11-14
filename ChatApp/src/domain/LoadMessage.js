import ChatRepository from "../data/ChatRepository";

export class LoadMessages {
    static async execute(conversationId) {
        const messages = await ChatRepository.loadMessages(conversationId);
        // console.log(messages);
        return messages;
    }
}

// export default new LoadMessages();