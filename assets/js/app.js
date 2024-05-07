document.addEventListener("DOMContentLoaded", () => {
  const loadingElements = () => {
    const d = document;
    
    let contenedorArticulos = d.getElementById("contenedor-articulos");

    fetch('assets/js/data-articles.json')
      .then(response => {
        if (!response.ok) {
          throw new Error("Network error was not ok.");
        }
        return response.json();
      })
      .then(data => {
        data.articulos.forEach(articulo => {
          let element_items = d.createElement("div");
          element_items.classList.add("items");
          element_items.id = `i-${articulo.id}`;

          element_items.innerHTML = `
            <div class="c-it-img-info">
              <div class="info-art">
                <span class="size-info-art fecha-publicacion">${articulo.fecha_publicacion}</span>
                <span class="size-info-art autor">Autor: ${articulo.autor}</span>
              </div>
              <div class="title-article">
                <h3 class="title-desc">${articulo.titulo}</h3>
              </div>
              <div class="c-img-art">
                <img src="${articulo.imagen}" alt="${articulo.titulo}">
              </div>
            </div>
            <div class="c-it-btn-more">
              <a href="${articulo.url}" target="_blank" class="btn-more btn-link" id="btn-more-link-item-${articulo.id}">
                Link
                <i class="fa-solid fa-link"></i>
              </a>
              <button class="btn-fav btn-link" id="btn-fav-item-${articulo.id}">
                <i class="fa-solid fa-bookmark"></i>
              </button>
              <button class="btn-share btn-link" id="btn-share-item-${articulo.id}">
                <i class="fa-solid fa-share"></i>
              </button>
            </div>
          `;
          contenedorArticulos.appendChild(element_items);
        });

        // este es el código para el evento de búsqueda!
        const buscarInput = d.getElementById("id-input-search");
        buscarInput.addEventListener("input", () => {
          const searchText = buscarInput.value.trim().toLowerCase(); //esto es: recupera el valor ingresado y no importa si es mayus o minus
          const items = contenedorArticulos.querySelectorAll(".items");
          items.forEach(item => {
            const titulo = item.querySelector(".title-desc").textContent.trim().toLowerCase();
            if (titulo.includes(searchText)) {
              item.style.display = "block"; // mostrar el elemento si coincide con la búsqueda
            } else {
              item.style.display = "none"; // ocultar el elemento si no coincide con la búsqueda
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
      })
      .catch(error => console.error("Hubo un error al hacer la solicitud al archivo JSON", error));
  }

  const render = () => {
    loadingElements();
  }

  render();
});
