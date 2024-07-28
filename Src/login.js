 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries
 import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from  "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"
 import{getFirestore, setDoc, doc , getDoc} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js" // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyAzUtcwZ9iUoti3r_odFACoT2L69ilG_Qs",
   authDomain: "quiz-app-e8737.firebaseapp.com",
   databaseURL: "https://quiz-app-e8737-default-rtdb.firebaseio.com",
   projectId: "quiz-app-e8737",
   storageBucket: "quiz-app-e8737.appspot.com",
   messagingSenderId: "488376516249",
   appId: "1:488376516249:web:7b073ca83ee31c46b1c208"
 };

 const app = initializeApp(firebaseConfig);

 
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login").addEventListener("click", validation);
});

function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },2000);
 }


const setError = (ele, msg) => {
    if (ele && ele.parentElement) {
        let box = ele.parentElement;
        let error = box.querySelector(".error");
        error.innerText = msg;
        box.classList.add("error");
        box.classList.remove("success");
    }
};

const setSuccess = (ele) => {
    if (ele && ele.parentElement) {
        let box = ele.parentElement;
        let error = box.querySelector(".error");
        error.innerText = "";
        box.classList.add("success");
        box.classList.remove("error");
    }
};

  function validation(){

    let mail = document.getElementById("userLemail").value.trim();
    let pass1 = document.getElementById("userLpassword").value.trim();

    const auth = getAuth();
    const db = getFirestore();

    signInWithEmailAndPassword(auth , mail , pass1).then((userCredential)=>{
        showMessage('login is successful', 'signInMessage')
        const user = userCredential.user;
        localStorage.setItem('loggedInUserId' , user.uid);
        

        const userDocRef = (doc(db , 'users' , user.uid));
        getDoc(userDocRef).then( (userDoc)=>{
            if(userDoc.exists()){
                const userData = userDoc.data();
                const role = userData.role;

                switch(role){
                    case 'admin':
                        localStorage.setItem('loggedInUserId' , user.uid);
                        window.location.href = "../components/Dashboard.html";
                    break;
                    case 'student':
                        localStorage.setItem('loggedInUserId' , user.uid);
                        window.location.href = '../components/internalHome.html';
                    break;
                    default:
                        showMessage('Role is not defined', 'signInMessage');
                    }
            }
            else{
                showMessage('No such user!', 'signInMessage');
            }

        } )
    }).catch( (error)=> {

        const errorCode = error.code;
        if(errorCode==='auth/invalid-credential'){
            showMessage('Incorrect Email or Password', 'signInMessage');
        }
        else{
            showMessage('Account does not Exist', 'signInMessage');
        }
    }); 
}





