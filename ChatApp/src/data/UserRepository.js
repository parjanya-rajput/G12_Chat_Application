import { collection, getDocs, query, where, getDoc, doc, onSnapshot } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

class UserRepository {
    async getAllUsers() {
        try {
            const querySnapshot = await getDocs(collection(firestore, "users"));
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    async getUserByUsername(user_name) {
        try {
            // Create a query to find the user with the specified user_name
            const q = query(collection(firestore, "users"), where("user_name", "==", user_name));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                console.log("No user found with user_name:", user_name);
                return null;
            }

            // Assuming user_name is unique and should return only one result
            const userData = querySnapshot.docs[0].data();
            // console.log("User details:", userData);
            return userData;
        } catch (error) {
            console.error("Error fetching user by user_name:", error);
            throw error;
        }
    }

    // async getUserByUserId(userId) {
    //     try {
    //         const userDoc = await getDoc(doc(firestore, "users", userId));

    //         if (!userDoc.exists()) {
    //             console.log("No user found with userId:", userId);
    //             return null;
    //         }

    //         const userData = userDoc.data();
    //         console.log("UserRepo" + userData);
    //         return { id: userDoc.id, ...userData };
    //     } catch (error) {
    //         console.error("Error fetching user by userId:", error);
    //         throw error;
    //     }
    // }

    async getUserByUserId(userId) {
        try {
            const userDoc = await getDoc(doc(firestore, "users", userId));

            if (!userDoc.exists()) {
                console.log("No user found with userId:", userId);
                return null;
            }

            const userData = userDoc.data();
            console.log("UserRepo" + userData);
            return { id: userDoc.id, ...userData };
        } catch (error) {
            console.error("Error fetching user by userId:", error);
            throw error;
        }
    }

    // Listen to user data changes for real-time updates
    listenToUserUpdates(userId, callback) {
        const userRef = doc(firestore, "users", userId);
        return onSnapshot(userRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                callback({ id: docSnapshot.id, ...docSnapshot.data() });
            } else {
                callback(null);
            }
        });
    }
}

export default new UserRepository();
