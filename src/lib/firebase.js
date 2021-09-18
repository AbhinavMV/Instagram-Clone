import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

// import { seedDatabase } from "../seed";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "instagram-clone-336bb.firebaseapp.com",
  projectId: "instagram-clone-336bb",
  storageBucket: "instagram-clone-336bb.appspot.com",
  messagingSenderId: process.env.REACT_APP_MS_ID,
  appId: process.env.REACT_APP_ID,
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;
const storage = firebase.storage();
// seedDatabase(firebase)

export { firebase, FieldValue, storage };
