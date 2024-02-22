import firebase from "firebase";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "management-training-videos.firebaseapp.com",
    projectId: "management-training-videos",
    storageBucket: "management-training-videos.appspot.com",
    messagingSenderId: "142945649167",
    appId: "1:142945649167:web:197a587b2f35078defd97a",
    measurementId: "G-5V8L6J4X8J"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;