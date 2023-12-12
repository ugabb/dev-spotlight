// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDKJjoPkKyI_drGccO8BTA0wcxoHm9FmAw",
    authDomain: "dev-spotlight-3698d.firebaseapp.com",
    projectId: "dev-spotlight-3698d",
    storageBucket: "dev-spotlight-3698d.appspot.com",
    messagingSenderId: "575019448047",
    appId: "1:575019448047:web:f3c5f995519a880805cd1a",
    measurementId: "G-N2PZ8KHMKP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);