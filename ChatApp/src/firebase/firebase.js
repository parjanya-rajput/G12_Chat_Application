import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
// import '@react-native-firebase/messaging';

const apiKey = "API_KEY";

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "g12-chatapp-springtalk.firebaseapp.com",
  projectId: "g12-chatapp-springtalk",
  storageBucket: "g12-chatapp-springtalk.firebasestorage.app",
  messagingSenderId: "375115558069",
  appId: "1:375115558069:web:4ad63c2a0ce4ba125922fc",
  measurementId: "G-9Y2PX0FN70",
};

const app = initializeApp(firebaseConfig);
// Export the auth module for use in other parts of the app
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const firestore = getFirestore(app);
// export const messaging = firebase.messaging();
export default app;
