import { ProfileRepository } from "../data/ProfileRepository";

export class ProfileCreate {
    static async execute({ name, bio, phone, profilePic, isOnline }) {
        if (!phone) {
            throw new Error('Phone number must be filled');
        }

        // Use the repository to update the profile
        await ProfileRepository.addUserProfile({ name, bio, phone, profilePic, isOnline });
    }
}

export class ProfileUpdate {
    static async execute({ name, bio, phone, profilePic, isOnline }) {
        console.log(name, bio, phone, profilePic, isOnline);
        // Use the repository to update the profile
        await ProfileRepository.updateProfile({ name, bio, phone, profilePic, isOnline });
    }
}

export class ProfileFetch {
    static async execute() {
        // Use the repository to update the profile
        const profile = await ProfileRepository.fetchProfile();
        return profile;
    }
}