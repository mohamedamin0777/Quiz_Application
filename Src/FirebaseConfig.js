 // Import the functions you need from the SDKs you need
 import { initializeApp} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries
 import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword , reauthenticateWithCredential,
  EmailAuthProvider,updatePassword} from  "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"
 import { getFirestore, collection, getDocs, setDoc, doc,getDoc , arrayUnion,updateDoc, query , where , deleteDoc,serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
 const firebaseConfig = {
   apiKey: "AIzaSyAzUtcwZ9iUoti3r_odFACoT2L69ilG_Qs",
   authDomain: "quiz-app-e8737.firebaseapp.com",
   databaseURL: "https://quiz-app-e8737-default-rtdb.firebaseio.com",
   projectId: "quiz-app-e8737",
   storageBucket: "quiz-app-e8737.appspot.com",
   messagingSenderId: "488376516249",
   appId: "1:488376516249:web:7b073ca83ee31c46b1c208"
 };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);

// Export the necessary services
export {
  app,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  firestore,
  collection,
  getDocs,
  setDoc,
  doc,getDoc,query, where , updateDoc,arrayUnion ,reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword , deleteDoc ,serverTimestamp
};


