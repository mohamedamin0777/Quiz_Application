 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
 import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
 import{getFirestore, collection, where , getDocs , query , doc , getDoc} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
 
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
  initializeApp(firebaseConfig);
 

const auth = getAuth();
const db = getFirestore();



      async function fetchUserQuizzes(userId) {
        try {
          console.log(`Fetching quizzes for user: ${userId}`);
          const userRef = doc(db, 'users', userId);
          const userDoc = await getDoc(userRef);
          
          if (!userDoc.exists()) {
            throw new Error('User document not found');
          }
          
          const userData = userDoc.data();
          if(userData.role === 'student'){
          console.log('User data:', userData);

          const quizzes = userData.quizzes || [];
          
          const nameElement = document.getElementById("user-Name");
          if (nameElement && userData.username) {
            nameElement.textContent = `Welcome, ${userData.username}`;
            nameElement.style.display = "block"; // Ensure it's visible
          } else {
            //console.error('User data does not contain a username or element with ID "user-Name" not found');
          }
          
          const tableBody = document.querySelector('#quiz-table tbody');
          if (!tableBody) {
           // throw new Error('Quiz table body not found');
          }
          
          tableBody.innerHTML = ''; // Clear existing rows
          
          const quizPromises = quizzes.map(async (quiz, index) => {
            const quizId = quiz.quizId;
            console.log(`Fetching quiz: ${quizId}`);
            const quizRef = doc(db, 'quizzes', quizId);
            const quizDoc = await getDoc(quizRef);
            
            if (!quizDoc.exists()) {
              console.warn(`Quiz document ${quizId} not found`);
              return; // Skip to the next quiz
            }
            
            const quizData = quizDoc.data();
            console.log(`Quiz data for ${quizId}:`, quizData);
            const category = quizData.category || 'Unknown';
            const questionsNumber = quizData.questions ? quizData.questions.length : 'Unknown';
            const date = new Date(quiz.date);

            // Extract the day, month, and year
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
            const year = date.getFullYear();

            // Extract the time components
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');

            // Format the date and time as MM/DD/YYYY HH:MM:SS
            const formattedDateTime = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;

              
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${index + 1}</td>
              <td>${category}</td>
              <td>${questionsNumber}</td>
              <td>${quiz.score}</td>
              <td>${(quiz.result)}</td>
              <td>${formattedDateTime}</td>
            `;
            
            tableBody.appendChild(row);
            
          });
      
          
          await Promise.all(quizPromises);
        }
        } catch (error) {
          console.error('Error fetching user quizzes:', error);
        }
      }
      
      // Function to handle authentication state change
      function handleAuthStateChange() {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const userId = user.uid;
            localStorage.setItem("loggedInUserId", userId);
            fetchUserQuizzes(userId); // Call function to fetch quizzes
          } else {
            console.error("No user is signed in.");
            localStorage.removeItem("loggedInUserId");
            window.location.href = "../components/homepage.html";
          }
        });
      }
      
      // Function to handle logout
      function handleLogout() {
        const logoutButton = document.getElementById('logout');
        if (logoutButton) {
          logoutButton.addEventListener('click', () => {
            signOut(auth)
              .then(() => {
                localStorage.removeItem('loggedInUserId');
                window.location.href = '../components/homepage.html';
              })
              .catch((error) => {
                console.error('Error signing out:', error);
              });
          });
        } else {
          console.error('Logout button not found');
        }
      }
      
      // Initialize event listeners on DOM content load
      document.addEventListener('DOMContentLoaded', () => {
        handleAuthStateChange();
        handleLogout();
      });
      