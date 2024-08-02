function darkMode(selector) {
    const darkModeLink = document.querySelector(selector);

    darkModeLink.addEventListener("click", (event) => {
        event.preventDefault();

        document.body.classList.toggle("dark-mode");

        const isDarkMode = document.body.classList.contains("dark-mode");
        localStorage.setItem(selector, isDarkMode);
    });
}

export default darkMode;