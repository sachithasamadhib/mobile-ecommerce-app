import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "your_firebase_api_key_here",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "your_project_id.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "your_project_id_here",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "your_project_id.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "your_sender_id_here",
  appId: process.env.FIREBASE_APP_ID || "your_app_id_here"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };
export default app;