 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries
 import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from  "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"
 import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js" // Your web app's Firebase configuration
 
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
 
function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
 }

document.addEventListener("DOMContentLoaded", function () {
    
    document.getElementById("submit-btn").addEventListener("click", validation);
});

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
function userFormat(u) {
    const re = /[^0-9]/;
    return re.test(u);
}
const mailFormat = (e) => {
    const re = /\w+@\w+\.\w+/;
    return re.test(String(e).toLowerCase());
};

const passFormat = (p) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/;
    return re.test(p);
};

function validation() {
    let userName = document.getElementById("username").value.trim();
    let mail = document.getElementById("useremail").value.trim();
    let pass1 = document.getElementById("userpassword").value.trim();
    let pass2 = document.getElementById("Confirmpassword").value.trim();
    //let Role = document.querySelector('input[name="role"]:checked').value;

    setSuccess(document.getElementById("username"));
    setSuccess(document.getElementById("useremail"));
    setSuccess(document.getElementById("userpassword"));
    setSuccess(document.getElementById("Confirmpassword"));

    if (userName === "") {
        setError(document.getElementById("username"), "Username is required");
    } else if (!userFormat(userName)) {
        setError(document.getElementById("username"), "Digits are not allowed in the username");
    }

    if (mail === "") {
        setError(document.getElementById("useremail"), "Email is required");
    } else if (!mailFormat(mail)) {
        setError(document.getElementById("useremail"), "Please enter a valid email");
    }

    if (pass1 === "") {
        setError(document.getElementById("userpassword"), "Password is required");
    } else if (!passFormat(pass1)) {
        setError(document.getElementById("userpassword"), "Password must meet the criteria");
    }

    if (pass2 === "") {
        setError(document.getElementById("Confirmpassword"), "Please confirm your password");
    } else if (pass2 !== pass1) {
        setError(document.getElementById("Confirmpassword"), "Passwords don't match");
    } else if (!passFormat(pass2)) {
        setError(document.getElementById("Confirmpassword"), "Password must meet the criteria");
    }
   

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, mail, pass1)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: mail,
                username: userName,
                role : "student",
                quizzes: []
            };


            showMessage('Account Created Successfully', 'signUpMessage');
            const docRef = doc(db, "users", user.uid);
            //localStorage.setItem("LoggedInUserId" , user.uid)
            return setDoc(docRef, userData);

        })
        .then(() => {
            // Redirect after successful account creation
            window.location.href = '/components/LoginUser.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                showMessage('Email Address Already Exists !!!', 'signUpMessage');
            } else {
                showMessage('Unable to create User', 'signUpMessage');
                console.error("Error creating user:", error);
            }
        });
}
