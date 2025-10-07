import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey || "your_firebase_api_key_here",
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain || "your_project_id.firebaseapp.com",
  projectId: Constants.expoConfig?.extra?.firebaseProjectId || "your_project_id_here",
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket || "your_project_id.appspot.com",
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId || "your_sender_id_here",
  appId: Constants.expoConfig?.extra?.firebaseAppId || "your_app_id_here"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };
export default app;