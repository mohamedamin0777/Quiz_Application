import {
    firestore,
    collection,
    getDocs,
    query,
    where,
    getDoc ,doc
} from "../Src/FirebaseConfig.js";

document.addEventListener('DOMContentLoaded', async function () {
    const studentTable = document.getElementById('student-table');
    const studentsRef = collection(firestore, 'users');
    const studentsQuery = query(studentsRef, where('role', '==', 'student'));
    const studentSnapshot = await getDocs(studentsQuery);

    studentSnapshot.forEach(docs => {
        const studentData = docs.data();
        const username = studentData.username;
        const email = studentData.email;
        const quizzes = studentData.quizzes ? studentData.quizzes : [];

        // Calculate total quizzes taken
        const totalQuizzesTaken = quizzes.length;

        // Create a row for each student
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${username}</td>
            <td>${email}</td>
            <td>${totalQuizzesTaken}</td>
        `;

        studentTable.appendChild(row);

        // Fetch and display scores, results, and dates for each quiz
        quizzes.forEach(async quizId => {
            const quizDocRef = doc(firestore, 'quizzes', quizId);
            const quizSnapshot = await getDoc(quizDocRef);

            if (quizSnapshot.exists()) {
                const quizData = quizSnapshot.data();
                const score = quizData.score ? quizData.score : 'N/A';
                const result = quizData.result ? quizData.result : 'N/A';
                const date = quizData.date ? quizData.date.toDate().toLocaleDateString() : 'N/A';

                // Append quiz details to the existing row
                const quizDetailsCell = document.createElement('td');
                quizDetailsCell.innerHTML = `
                    <strong>Score:</strong> ${score}<br>
                    <strong>Result:</strong> ${result}<br>
                    <strong>Date:</strong> ${date}
                `;

                row.appendChild(quizDetailsCell);
            }
        });
    });
});
