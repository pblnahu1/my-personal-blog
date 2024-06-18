const d = document;

export function fnSearchItems() {
  const buscarInput = d.getElementById("id-input-search");
  const suggestionsContainer = d.getElementById("suggestions");
  const items = Array.from(document.querySelectorAll(".items"));
  const titles = items.map(item => item.querySelector(".title-desc").textContent.trim().toLowerCase());
  
  buscarInput.addEventListener("input", () => {
    const searchText = buscarInput.value.trim().toLowerCase();
    updateSuggestions(searchText);

    let found = false;
    
    items.forEach(item => {
      const titulo = item.querySelector(".title-desc").textContent.trim().toLowerCase();
      if (titulo.includes(searchText)) {
        item.style.display = "block";
        found = true;
      } else {
        item.style.display = "none";
      }
    });

    let sct_articles = d.getElementById("sct-articles");
    let info_not_exists = sct_articles.querySelector(".info-not-exists");

    const visibleItems = items.filter(item => item.style.display === "block");

    if (!found) {
      if (visibleItems.length === 0) {
        if (!info_not_exists) {
          info_not_exists = d.createElement("p");
          info_not_exists.classList.add("info-not-exists");
          info_not_exists.innerText = "Sin resultados...";
          sct_articles.appendChild(info_not_exists);
        } else {
          info_not_exists.remove();
        }
      }
    } else {
      if (info_not_exists) {
        info_not_exists.remove();
      }
    }
  });

  function updateSuggestions(searchText) {
    suggestionsContainer.innerHTML = '';
    const matchingSuggestions = titles.filter(title => title.includes(searchText));

    if (matchingSuggestions.length > 0) {
      matchingSuggestions.forEach(suggestion => {
        const suggestionItem = d.createElement("div");
        suggestionItem.classList.add("suggestion-item");
        suggestionItem.textContent = suggestion;
        suggestionItem.addEventListener("click", () => {
          buscarInput.value = suggestion;
          suggestionsContainer.classList.add("hidden");
          buscarInput.dispatchEvent(new Event('input'));
        });
        suggestionsContainer.appendChild(suggestionItem);
      });
      suggestionsContainer.classList.remove("hidden");
    } else {
      suggestionsContainer.classList.add("hidden");
    }
  }

  buscarInput.addEventListener("focus", () => {
    if (buscarInput.value.trim().length > 0) {
      updateSuggestions(buscarInput.value.trim().toLowerCase());
    }
  });

  buscarInput.addEventListener("blur", () => {
    setTimeout(() => {
      suggestionsContainer.classList.add("hidden");
    }, 100);
  });
}
