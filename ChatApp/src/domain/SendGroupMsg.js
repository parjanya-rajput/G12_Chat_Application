import GroupRepository from "../data/GroupRepository";

export class sendGroupMessage {
    static async execute(groupId, senderId, content, messageType) {
        return GroupRepository.sendGroupMessage(groupId, senderId, content, messageType);
    }
}