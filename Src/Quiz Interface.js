import { firestore, getDoc, doc, updateDoc, arrayUnion } from "../Src/FirebaseConfig.js";

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const quizId = urlParams.get('id');

    if (!quizId) {
        alert("Quiz ID not found in URL");
        return;
    }

    const quizDocRef = doc(firestore, 'quizzes', quizId);

    let questions = [];
    let totalQuizTime = 0;
    let currentQuestionIndex = 0;
    const selectedAnswers = [];
    const isCorrect = [];
    let timerInterval;
    let correctMarks = 0;
    let minusMarks = 0;
    let totalMarks = 0;
    let questionLength = 0;
    let correctCount = 0;

    const questionText = document.getElementById("question-text");
    const optionsContainer = document.querySelector(".options-container");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const submitBtn = document.getElementById("submit-btn");
    const timerElement = document.getElementById("timer");
    const resultsContainer = document.getElementById("results-container");
    const correctAnswersElement = document.getElementById("correct-answers");
    const incorrectAnswersElement = document.getElementById("incorrect-answers");
    const totalScoreElement = document.getElementById("total-score");
    const totalDegreeElement = document.getElementById("total-degree");
    const progressBar = document.getElementById('progress-bar');

    getDoc(quizDocRef)
        .then((quizDoc) => {
            if (quizDoc.exists()) {
                const quizData = quizDoc.data();
                questions = quizData.questions;
                questionLength = questions.length;
                correctMarks = parseInt(quizData.marks);
                minusMarks = parseInt(quizData.minusMarks);
                totalQuizTime = quizData.timeLimit;

                if (Array.isArray(questions) && questions.length > 0) {
                    questions.forEach(() => {
                        selectedAnswers.push(null);
                        isCorrect.push(null);
                    });
                    loadQuestion(currentQuestionIndex);
                    startTimer();
                    updateProgressBar();
                } else {
                    alert('No questions found in the quiz!');
                }
            } else {
                alert('Quiz not found!');
            }
        })
        .catch((error) => {
            console.error("Error loading quiz: ", error);
        });

    function startTimer() {
        let quizDuration = totalQuizTime;
        updateTimerDisplay(quizDuration);

        timerInterval = setInterval(() => {
            quizDuration--;
            updateTimerDisplay(quizDuration);

            if (quizDuration <= 0) {
                clearInterval(timerInterval);
                calculateScore();
            }
        }, 1000);
    }

    function updateTimerDisplay(duration) {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        timerElement.textContent = `Remaining Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function loadQuestion(index) {
        const question = questions[index];
        questionText.textContent = question.question;
        optionsContainer.innerHTML = "";

        if (question.options && typeof question.options === 'object') {
            Object.entries(question.options).forEach(([key, option], optionIndex) => {
                const optionBtn = document.createElement("button");
                optionBtn.className = "option";
                optionBtn.textContent = option;
                optionBtn.addEventListener("click", function () {
                    selectOption(optionIndex);
                });
                if (selectedAnswers[index] === optionIndex) {
                    optionBtn.classList.add("selected");
                }
                optionsContainer.appendChild(optionBtn);
            });
        }

        updateProgressBar();
    }

    function selectOption(index) {
        selectedAnswers[currentQuestionIndex] = index;
        const correctAnswerIndex = Object.keys(questions[currentQuestionIndex].options).indexOf(questions[currentQuestionIndex].correctAnswer);
        isCorrect[currentQuestionIndex] = index === correctAnswerIndex;
        const optionButtons = optionsContainer.querySelectorAll(".option");
        optionButtons.forEach((btn, btnIndex) => {
            btn.classList.remove("selected");
            if (btnIndex === index) {
                btn.classList.add("selected");
            }
        });
    }
    function calculateScore() {
       // let correctCount = 0;
        let incorrectCount = 0;

        isCorrect.forEach(correct => {
            if (correct) {
                correctCount++;
            } else {
                incorrectCount++;
            }
        });

        totalMarks = Math.ceil((correctCount / questionLength) * 100)+"%"; //(correctCount * correctMarks) - (incorrectCount * minusMarks);

        correctAnswersElement.textContent = `Correct Answers: ${correctCount}`;
        incorrectAnswersElement.textContent = `Incorrect Answers: ${incorrectCount}`;
        totalScoreElement.textContent = `Total Score: ${correctCount} out of ${questions.length}`;
        totalDegreeElement.textContent = `Total Degree: ${totalMarks}`;

        document.querySelector('.quiz-container').style.display = 'none';
        timerElement.style.display = 'none';
        document.getElementById('home').style.display = 'block';
        resultsContainer.style.display = 'block';
    }

    function updateNavigationButtons() {
        prevBtn.disabled = currentQuestionIndex === 0;
        nextBtn.disabled = currentQuestionIndex === questions.length - 1;
    }

    function updateProgressBar() {
        const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressBar.style.width = progress + '%';
    }

    function addQuizResult(userId, quizId, score, result) {
        return new Promise((resolve, reject) => {
            const userRef = doc(firestore, 'users', userId);
    
            getDoc(userRef).then((userDoc) => {
                if (!userDoc.exists()) {
                    const error = new Error(`User document with ID ${userId} not found`);
                    console.error('Error adding quiz result:', error);
                    reject(error);
                    return;
                }
    
                const quizResult = {
                    quizId: quizId,
                    result: result,
                    score: score,
                    date: Date.now()
                };
    
                updateDoc(userRef, {
                    quizzes: arrayUnion(quizResult)
                }).then(() => {
                    console.log('Quiz result added for user:', userId);
                    resolve(); // Resolve the promise on success
                }).catch((error) => {
                    console.error('Error adding quiz result:', error);
                    reject(error); // Reject the promise if there's an error during update
                });
    
            }).catch((error) => {
                console.error('Error fetching user document:', error);
                reject(error); // Reject the promise if there's an error fetching the document
            });
        });
    }
    

    prevBtn.addEventListener("click", function () {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion(currentQuestionIndex);
            updateNavigationButtons();
            updateProgressBar();
        }
    });

    nextBtn.addEventListener("click", function () {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion(currentQuestionIndex);
            updateNavigationButtons();
            updateProgressBar();
        }
    });

    submitBtn.addEventListener("click", function () {
        clearInterval(timerInterval);
        calculateScore();
        addQuizResult(localStorage.getItem("loggedInUserId"), quizId, correctCount, totalMarks);
    });
});
