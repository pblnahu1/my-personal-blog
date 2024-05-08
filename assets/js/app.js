document.addEventListener("DOMContentLoaded", () => {
  const loadingElements = () => {
    const d = document;
    
    let main = d.getElementById("main");
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
              <div class="title-article">
                <h3 class="title-desc">${articulo.titulo}</h3>
              </div>
              <div class="info-art">
                <div class="content-hash">
                  <span class="size-info-art hashtag">#Desarrollo Web</span>
                  <span class="size-info-art hashtag">#Frameworks</span>
                  <span class="size-info-art hashtag">+1 tags</span>
                </div>
                <div class="art-span">
                  <span class="size-info-art fecha-publicacion">${articulo.fecha_publicacion}</span>
                  <span style="margin: 0px 5px;">•</span>
                  <span class="size-info-art autor">${articulo.autor}</span>
                </div>
              </div>
              <div class="c-img-art">
                <img src="${articulo.imagen}" alt="${articulo.titulo}">
              </div>
            </div>
            <div class="c-it-btn-more">
              <button class="btn-likes btn-link" id="btn-likes-item-${articulo.id}" title="Me encanta">
                <i class="fa-solid fa-heart"></i>
                <div id="number-likes">12</div>
              </button>
              <button class="btn-comments btn-link" id="btn-comments-item-${articulo.id}" title="Comentar">
                <i class="fa-solid fa-comment-dots"></i>
              </button>
              <a href="${articulo.url}" target="_blank" class="btn-more btn-link" id="btn-more-link-item-${articulo.id}" title="Link">
                <i class="fa-solid fa-link"></i>
              </a>
              <!--<button class="btn-bookmark btn-link" id="btn-bookmark-item-${articulo.id}">
                <i class="fa-solid fa-bookmark"></i>
              </button>-->
            </div>
          `;
          contenedorArticulos.appendChild(element_items);

          // ventana emergente para cada Artículo con más información detallada.
          let btnAbrirModal = d.getElementById(`i-${articulo.id}`);
          
          let modal = d.createElement("div");
          modal.classList.add("modal");
          modal.id = `mi-modal-item-${articulo.id}`;
          main.appendChild(modal);
          
          btnAbrirModal.onclick = function (e) {
            e.stopPropagation();
            modal.style.display = "block";
          }

          let modal_contenido = d.createElement("div");
          modal_contenido.classList.add("modal-contenido");
          modal.appendChild(modal_contenido);

          let spanCerrar = d.createElement("span");
          spanCerrar.classList.add("cerrar");
          spanCerrar.innerHTML = "&times;";
          modal_contenido.appendChild(spanCerrar);
          
          spanCerrar.onclick = function (e) {
            e.stopPropagation();
            modal.style.display = "none";
          }

          let parrafo = d.createElement("p");
          parrafo.innerText = "Hola, esta es una ventana emergente";
          modal_contenido.appendChild(parrafo);

          window.onclick = function (e) {
            if (e.target === modal) {
              modal.style.display = "none";
            }
          };
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
