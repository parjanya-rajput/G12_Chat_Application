import { auth } from './firebase'; // Import the initialized auth instance
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendEmailVerification, updateProfile, sendPasswordResetEmail } from 'firebase/auth';

// Function to sign up a user
export const signUp = (email, password, name) => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            return updateProfile(userCredential.user, { displayName: name })
                .then(() => sendEmailVerification(userCredential.user))
                .then(() => {
                    console.log('Verification email sent');
                    console.log('User signed up:', userCredential.user.email);
                    console.log('User signed up:', userCredential.user.displayName);
                    return userCredential.user;
                });
        })
        .catch((error) => {
            console.error('Error signing up:', error.message);
            throw error;
        });
};

// Function to sign in a user
export const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('User signed in:', userCredential.user.email);
            return userCredential.user;
        })
        .catch((error) => {
            console.error('Error signing in:', error.message);
            throw error;
        });
};

// Function to sign out a user
export const logout = () => {
    return signOut(auth)
        .then(() => {
            console.log('User signed out');
        })
        .catch((error) => {
            console.error('Error signing out:', error.message);
            throw error;
        });
};

// Function for Reset Password
export const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log('Password reset email sent');
        })
        .catch((error) => {
            console.error('Error sending password reset email:', error.message);
            throw error;
        });
};

// Function to subscribe to auth state changes
export const onAuthStateChange = (callback) => {
    return onAuthStateChanged(auth, (user) => {
        // If user is logged in and email is verified
        if (user && user.emailVerified) {
            callback(user); // Pass the user object to the callback
        } else {
            callback(null); // Pass null if user is not logged in or email is not verified
        }
    });
};
