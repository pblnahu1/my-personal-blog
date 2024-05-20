const d = document;

export function fnSearchItems() {
  const buscarInput = d.getElementById("id-input-search");
  buscarInput.addEventListener("input", () => {
    const searchText = buscarInput.value.trim().toLowerCase();
    const items = document.querySelectorAll(".items");
    items.forEach(item => {
      const titulo = item.querySelector(".title-desc").textContent.trim().toLowerCase();
      if (titulo.includes(searchText)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });

    let sct_articles = d.getElementById("sct-articles");
    let info_not_exists = sct_articles.querySelector(".info-not-exists");
    if (!info_not_exists) {
      info_not_exists = d.createElement("p");
      info_not_exists.classList.add("info-not-exists");
      info_not_exists.innerText = "Sin resultados...";
      sct_articles.appendChild(info_not_exists);
    } else {
      info_not_exists.remove();
    }
  });
}
