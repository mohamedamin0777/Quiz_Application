document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("search-input");
    const filterSelect = document.getElementById("filter-select");
    const quizCards = document.querySelectorAll(".quiz-card");

    function filterQuizzes() {
        const searchText = searchInput.value.toLowerCase();
        const selectedCategory = filterSelect.value;

        quizCards.forEach(card => {
            const title = card.querySelector("h2").textContent.toLowerCase();
            const description = card.querySelector("p").textContent.toLowerCase();
            const category = card.getAttribute("data-category");

            const matchesSearch = title.includes(searchText) || description.includes(searchText);
            const matchesCategory = selectedCategory === "all" || category === selectedCategory;

            if (matchesSearch && matchesCategory) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    searchInput.addEventListener("input", filterQuizzes);
    filterSelect.addEventListener("change", filterQuizzes);
});
