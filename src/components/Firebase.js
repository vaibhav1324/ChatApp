import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDmjR--iTQFQ-IR1z3h3pf6EAasp5yR64I",
    authDomain: "chatapp-b5cb4.firebaseapp.com",
    databaseURL: "https://chatapp-b5cb4.firebaseio.com",
    projectId: "chatapp-b5cb4",
    storageBucket: "chatapp-b5cb4.appspot.com",
    messagingSenderId: "399165201847",
    appId: "1:399165201847:web:daa7a944e5674c35fd5c32",
    measurementId: "G-376C27GP8M"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.database();
firebase.auth();
firebase.functions();
firebase.storage();

export default firebase;