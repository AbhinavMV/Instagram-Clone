import Firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

// import { seedDatabase } from "../seed";

const config = {
    apiKey: "AIzaSyB9tZAk9BiQwNCe-q5TpQe4VPwv2SmQnXQ",
    authDomain: "instagram-clone-336bb.firebaseapp.com",
    projectId: "instagram-clone-336bb",
    storageBucket: "instagram-clone-336bb.appspot.com",
    messagingSenderId: "29136109793",
    appId: "1:29136109793:web:d4e874423f5ee7434d77a0"
  };

const firebase = Firebase.initializeApp(config);
const {FieldValue} = Firebase.firestore;

// seedDatabase(firebase)

export {firebase,FieldValue};