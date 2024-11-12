// src/data/repositories/ProfileRepository.js
import { doc, updateDoc, addDoc, collection, setDoc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase/firebase';

export class ProfileRepository {
    // static async addUserProfile({ name, bio, phone, profilePic }) {
    //     const user = auth.currentUser;
    //     if (!user) {
    //         throw new Error('No user is logged in.');
    //     }

    //     const docRef = await setDoc(doc(firestore, "users", user.uid), {
    //         id: user.uid,
    //         name: name || user.displayName,
    //         user_name: user.email,
    //         email: user.email,
    //         bio: bio || "I am using SpringTalk!",
    //         phone: phone,
    //         profile_pic: profilePic || "null",
    //         created_at: new Date(),
    //         is_online: true,
    //     });
    //     console.log("Document written with ID: ", docRef);
    // }

    // static async updateProfile({ name, bio, phone, profilePic, isOnline }) {
    //     const user = auth.currentUser;
    //     if (!user) {
    //         throw new Error('No user is logged in.');
    //     }

    //     // Update user profile in Firestore
    //     const userRef = doc(firestore, 'users', user.uid);
    //     await updateDoc(userRef, {
    //         name: name,
    //         bio: bio,
    //         phone: phone,
    //         profile_pic: profilePic || "null",
    //         is_online: isOnline,
    //     });
    // }

    static async fetchProfile() {
        const user = auth.currentUser;
        if (!user) {
            console.log('No user is logged in.');
            throw new Error('No user is logged in.');
        }

        // Fetch profile details from Firestore
        const userRef = doc(firestore, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            throw new Error('User profile not found.');
        }

        // Return the profile data
        return userDoc.data();
    }
}
