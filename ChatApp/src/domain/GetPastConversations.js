import ChatRepository from "../data/ChatRepository";

export class GetPastConversations {
    static async execute() {
        const conversations = await ChatRepository.getPastConversations();
        // console.log("Repo:", JSON.stringify(conversations, null, 2));
        return conversations;
    }
};


