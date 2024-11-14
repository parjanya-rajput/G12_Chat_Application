// src/data/repositories/ProfileRepository.js
import { doc, updateDoc, addDoc, collection, setDoc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase/firebase';

export class ProfileRepository {
    static async addUserProfile({ name, bio, phone, profilePic, isOnline }) {
        const user = auth.currentUser;
        if (!user) {
            throw new Error('No user is logged in.');
        }

        const docRef = await setDoc(doc(firestore, "users", user.uid), {
            id: user.uid,
            name: name || user.displayName,
            user_name: user.email,
            email: user.email,
            bio: bio || "I am using SpringTalk!",
            phone: phone,
            profile_pic: profilePic || "https://www.google.com/imgres?q=profile%20image%20default&imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fthumbnails%2F020%2F765%2F399%2Fsmall_2x%2Fdefault-profile-account-unknown-icon-black-silhouette-free-vector.jpg&imgrefurl=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fdefault-profile-picture&docid=--oA6_9U9ufzsM&tbnid=bowkO_GA3uhk3M&vet=12ahUKEwiznKbaj9mJAxVEr1YBHRbSPAMQM3oECGEQAA..i&w=400&h=400&hcb=2&ved=2ahUKEwiznKbaj9mJAxVEr1YBHRbSPAMQM3oECGEQAA",
            is_online: isOnline,
        });
        console.log("Document written with ID: ", docRef);
    }

    static async updateProfile({ name, bio, phone, profilePic, isOnline }) {
        const user = auth.currentUser;
        if (!user) {
            throw new Error('No user is logged in.');
        }

        // Update user profile in Firestore
        const userRef = doc(firestore, 'users', user.uid);
        await updateDoc(userRef, {
            name: name,
            bio: bio,
            phone: phone,
            profile_pic: profilePic || "https://www.google.com/imgres?q=profile%20image%20default&imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fthumbnails%2F020%2F765%2F399%2Fsmall_2x%2Fdefault-profile-account-unknown-icon-black-silhouette-free-vector.jpg&imgrefurl=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fdefault-profile-picture&docid=--oA6_9U9ufzsM&tbnid=bowkO_GA3uhk3M&vet=12ahUKEwiznKbaj9mJAxVEr1YBHRbSPAMQM3oECGEQAA..i&w=400&h=400&hcb=2&ved=2ahUKEwiznKbaj9mJAxVEr1YBHRbSPAMQM3oECGEQAA",
            is_online: isOnline,
        });
    }

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
