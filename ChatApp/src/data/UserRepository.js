import { collection, getDocs } from 'firebase/firestore';
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
}

export default new UserRepository();
