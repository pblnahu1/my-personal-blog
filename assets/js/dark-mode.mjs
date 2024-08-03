function darkMode(selector) {
    const darkModeLink = document.querySelector(selector);

    if (!darkModeLink) {
        console.error(`El selector ${selector} no existe.`);
        return;
    }

    // cargo el estado del modo oscuro desde el localStorage al cargar la página
    const saveDarkMode = localStorage.getItem(selector) === "true";
    if (saveDarkMode) {
        document.body.classList.add("dark-mode");
    }

    darkModeLink.addEventListener("click", (event) => {
        event.preventDefault();

        document.body.classList.toggle("dark-mode");

        const isDarkMode = document.body.classList.contains("dark-mode");
        localStorage.setItem(selector, isDarkMode);
    });
}

export default darkMode;