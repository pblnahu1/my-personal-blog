export default function hamburguerMenu(panelBtn, panel, menuLink) {
    const d = document;

    d.addEventListener("click", e => {
        if (e.target.matches(panelBtn) || e.target.matches(`${panelBtn} *`)) {
            const panelElement = d.querySelector(panel);
            panelElement.classList.toggle("is-active");
            // d.querySelector(panel).classList.toggle("is-active");
            // d.querySelector(panelBtn).classList.toggle("is-active");
        }

        if (e.target.matches(menuLink)) {
            const panelElement = d.querySelector(panel);
            panelElement.classList.remove("is-active");
            // d.querySelector(panel).classList.remove("is-active");
            // d.querySelector(panelBtn).classList.remove("is-active");
        }
    });
}
