import UserRepository from "../data/UserRepository";

// export class GetUserByUserId {
//     static async execute(userId) {
//         if (!userId) throw new Error("User ID is required");
//         return await UserRepository.getUserByUserId(userId);
//     }
// };

export class GetUserByUserId {
    static async execute(userId) {
        if (!userId) throw new Error("User ID is required");
        return await UserRepository.getUserByUserId(userId);
    }

    static listenToUserUpdates(userId, callback) {
        if (!userId) throw new Error("User ID is required");
        return UserRepository.listenToUserUpdates(userId, callback);
    }
}