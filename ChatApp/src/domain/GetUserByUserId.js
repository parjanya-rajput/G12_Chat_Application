import UserRepository from "../data/UserRepository";

export class GetUserByUserId {
    static async execute(userId) {
        if (!userId) throw new Error("User ID is required");
        return await UserRepository.getUserByUserId(userId);
    }
};