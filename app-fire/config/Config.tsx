// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBLChe8DT8ZaQNFJs0qNd0Gm4fExGozwB4",
    authDomain: "moviles-2-23c17.firebaseapp.com",
    databaseURL: "https://moviles-2-23c17-default-rtdb.firebaseio.com",
    projectId: "moviles-2-23c17",
    storageBucket: "moviles-2-23c17.appspot.com",
    messagingSenderId: "177460389221",
    appId: "1:177460389221:web:de4d9e2ec601442857ad8c"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);