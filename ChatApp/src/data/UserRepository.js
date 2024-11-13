import { collection, getDocs , query, where } from 'firebase/firestore';
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
}

export default new UserRepository();
