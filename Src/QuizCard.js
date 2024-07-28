import { firestore, collection, getDocs } from "../Src/FirebaseConfig.js";
const searchInput = document.getElementById("search-input");
const filterSelect = document.getElementById("filter-select");

function filterQuizzes() {
  const searchText = searchInput.value.toLowerCase();
  const selectedCategory = filterSelect.value;
  const quizCards = document.querySelectorAll(".quiz-card");

  quizCards.forEach((quizCard) => {
    const cardCategory = quizCard.getAttribute("data-category");
    const title = quizCard
      .querySelector(".card-title")
      .textContent.toLowerCase();
    const description = quizCard
      .querySelector(".card-description")
      .textContent.toLowerCase();
    const matchesSearch =
      title.includes(searchText) || description.includes(searchText);
    const matchesCategory =
      selectedCategory === "all" || cardCategory === selectedCategory;

    if (matchesSearch && matchesCategory) {
      quizCard.style.display = "flex";
    } else {
      quizCard.style.display = "none";
    }
  });
}

function fetchCategories() {
  const categoriesSet = new Set();
  return getDocs(collection(firestore, "quizzes"))
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const quiz = doc.data();
        if (quiz.category) {
          categoriesSet.add(quiz.category);
        }
      });
      return Array.from(categoriesSet);
    })
    .catch((error) => {
      console.error("Error fetching categories: ", error);
      return [];
    });
}

function populateCategoryDropdown() {
  fetchCategories().then((categories) => {
    const filterSelect = document.getElementById("filter-select");
    filterSelect.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.toLowerCase();
      option.textContent = category;
      filterSelect.appendChild(option);
    });
  });
}

function loadQuizzes() {
  const quizzesContainer = document.getElementById("quizzes-container");

  getDocs(collection(firestore, "quizzes"))
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const quiz = doc.data();
        const quizCard = document.createElement("div");
        quizCard.setAttribute("data-category", quiz.category.toLowerCase());
        quizCard.classList.add("quiz-card");

        quizCard.innerHTML = `
                    <h2 class="card-title">${quiz.title}</h2>
                    <p class="card-category">Category: ${quiz.category}</p>
                    <p class="card-description">${quiz.description}</p>
                    <a class="quiz-card-btn" href="Quiz interface.html?id=${doc.id}" class="btn btn-primary">Start Quiz</a>
                `
        quizzesContainer.appendChild(quizCard);
      });
      searchInput.addEventListener("input", filterQuizzes);
      filterSelect.addEventListener("change", filterQuizzes);
    })
    .catch((error) => {
      console.error("Error fetching quizzes: ", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  populateCategoryDropdown();
  loadQuizzes();
});