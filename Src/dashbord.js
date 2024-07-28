
/*
import {
    firestore,
    collection,
    getDocs,
    query,
    where,
    deleteDoc,
    doc
} from "../Src/FirebaseConfig.js";

document.addEventListener('DOMContentLoaded', async function () {
    let studentCount = 0; // Initialize student count
    let allQuizzes = []; // Store all quizzes for filtering

    try {
        // Fetch users
        let studentsQuery = query(collection(firestore, 'users'), where('role', '==', 'student'));
        let studentsSnapshot = await getDocs(studentsQuery);

        // Fetch quizzes
        let quizzesQuery = query(collection(firestore, 'quizzes'));
        let quizzesSnapshot = await getDocs(quizzesQuery);

        let quizCount = quizzesSnapshot.size; // Get the total number of quizzes

        // Display students
        let studentsTableBody = document.querySelector('#students-table tbody');
        studentsSnapshot.forEach(doc => {
            let studentData = doc.data();
            let studentRow = document.createElement('tr');

            // Fetch the number of quizzes taken
            let quizzesTaken = Array.isArray(studentData.quizzes) ? studentData.quizzes.length : 0;

            studentRow.innerHTML = `
                <td>${studentData.username}</td>
                <td>${studentData.email}</td>
                <td>${quizzesTaken}</td>
            `;
            studentsTableBody.appendChild(studentRow);
            studentCount++; // Increment student count
        });

        // Display quizzes and store in allQuizzes for filtering
        let quizzesTableBody = document.querySelector('#quizzes-table tbody');
        quizzesSnapshot.forEach(doc => {
            let quizData = doc.data();
            allQuizzes.push({ id: doc.id, ...quizData }); // Store document ID along with quiz data
            let quizRow = document.createElement('tr');

            quizRow.innerHTML = `
                <td>${allQuizzes.length}</td>
                <td>${quizData.title}</td>
                <td>${quizData.timeLimit} seconds</td>
                <td><button class="delete-btn" data-id="${doc.id}"><i class="fas fa-trash"></i></button></td>
            `;
            quizzesTableBody.appendChild(quizRow);
        });

        document.querySelector(".numbers").textContent = studentCount;
        document.getElementById("n-ofQuizes").textContent = quizCount;

        // Add search functionality
        let searchInput = document.getElementById('category-search');
        searchInput.addEventListener('input', () => {
            let category = searchInput.value.trim().toLowerCase();
            let filteredQuizzes = allQuizzes.filter(quiz =>
                quiz.title && quiz.title.toLowerCase().startsWith(category)
            );
            displayQuizzes(filteredQuizzes);
        });

        function displayQuizzes(quizzes) {
            quizzesTableBody.innerHTML = "";
            quizzes.forEach((quizData, index) => {
                let quizRow = document.createElement('tr');
                quizRow.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${quizData.title}</td>
                    <td>${quizData.timeLimit} seconds</td>
                    <td><button class="delete-btn" data-id="${quizData.id}"><i class="fas fa-trash"></i></button></td>
                `;
                quizzesTableBody.appendChild(quizRow);
            });
        }
       
    } catch (error) {
        console.error('Error fetching data: ', error);
    }

});
*/


import {
    firestore,
    collection,
    getDocs,
    query,
    where,
    deleteDoc,
    doc
} from "../Src/FirebaseConfig.js";

document.addEventListener('DOMContentLoaded', async function () {
    let studentCount = 0; // Initialize student count
    let allQuizzes = []; // Store all quizzes for filtering

    try {
        // Fetch users
        let studentsQuery = query(collection(firestore, 'users'), where('role', '==', 'student'));
        let studentsSnapshot = await getDocs(studentsQuery);

        // Fetch quizzes
        let quizzesQuery = query(collection(firestore, 'quizzes'));
        let quizzesSnapshot = await getDocs(quizzesQuery);

        let quizCount = quizzesSnapshot.size; // Get the total number of quizzes

        // Display students
        let studentsTableBody = document.querySelector('#students-table tbody');
        studentsSnapshot.forEach(doc => {
            let studentData = doc.data();
            let studentRow = document.createElement('tr');

            // Fetch the number of quizzes taken
            let quizzesTaken = Array.isArray(studentData.quizzes) ? studentData.quizzes.length : 0;

            studentRow.innerHTML = `
                <td>${studentData.username}</td>
                <td>${studentData.email}</td>
                <td>${quizzesTaken}</td>
            `;
            studentsTableBody.appendChild(studentRow);
            studentCount++; // Increment student count
        });

        // Display quizzes and store in allQuizzes for filtering
        let quizzesTableBody = document.querySelector('#quizzes-table tbody');
        quizzesSnapshot.forEach(doc => {
            let quizData = doc.data();
            allQuizzes.push({ id: doc.id, ...quizData }); // Store document ID along with quiz data
            let quizRow = document.createElement('tr');

            quizRow.innerHTML = `
                <td>${allQuizzes.length}</td>
                <td>${quizData.title}</td>
                <td>${quizData.timeLimit} seconds</td>
                <td><button class="delete-btn" data-id="${doc.id}"><i class="fas fa-trash"></i></button></td>
            `;
            quizzesTableBody.appendChild(quizRow);
        });

        document.querySelector(".numbers").textContent = studentCount;
        document.getElementById("n-ofQuizes").textContent = quizCount;

        // Add search functionality
        let searchInput = document.getElementById('category-search');
        searchInput.addEventListener('input', () => {
            let category = searchInput.value.trim().toLowerCase();
            let filteredQuizzes = allQuizzes.filter(quiz =>
                quiz.title && quiz.title.toLowerCase().startsWith(category)
            );
            displayQuizzes(filteredQuizzes);
        });

        function displayQuizzes(quizzes) {
            quizzesTableBody.innerHTML = "";
            quizzes.forEach((quizData, index) => {
                let quizRow = document.createElement('tr');
                quizRow.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${quizData.title}</td>
                    <td>${quizData.timeLimit} seconds</td>
                    <td><button class="delete-btn" data-id="${quizData.id}"><i class="fas fa-trash"></i></button></td>
                `;
                quizzesTableBody.appendChild(quizRow);
            });
            attachDeleteHandlers();
        }

        function attachDeleteHandlers() {
            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', async (event) => {
                    let quizId = event.currentTarget.getAttribute('data-id');
                    await deleteQuiz(quizId);
                });
            });
        }

        async function deleteQuiz(quizId) {
            try {
                await deleteDoc(doc(firestore, 'quizzes', quizId));
                allQuizzes = allQuizzes.filter(quiz => quiz.id !== quizId);
                displayQuizzes(allQuizzes);
                document.getElementById("n-ofQuizes").textContent = allQuizzes.length; // Update quiz count
            } catch (error) {
                console.error('Error deleting quiz: ', error);
            }
        }

        attachDeleteHandlers(); // Attach delete handlers initially

    } catch (error) {
        console.error('Error fetching data: ', error);
    }
});


