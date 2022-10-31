// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth"
import { getDownloadURL, getStorage } from "firebase/storage"
import { ref, uploadBytes } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
const db = getFirestore(app);
export { db };


//Storage
export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + '.png');
  setLoading(true);
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, {photoURL});
  setLoading(false);
  alert("Uploadeed File!");
}