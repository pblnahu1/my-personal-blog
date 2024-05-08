const w = window;
const d = document;

d.addEventListener("DOMContentLoaded", () => {
  const loadingElements = () => {
    
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
        console.log(data)
        data.articulos.forEach(articulo => {
          let element_items = d.createElement("div");
          element_items.classList.add("items");
          element_items.id = `i-${articulo.id}`;

          // creo el contenedor de la info de la imagen
          let imagen_info_contenedor = d.createElement("div");
          imagen_info_contenedor.classList.add("c-it-img-info");

          // creo el contenedor del titulo del articulo
          let titulo_contenedor = d.createElement("div");
          titulo_contenedor.classList.add("title-article");

          let title = d.createElement("h3");
          title.classList.add("title-desc");
          title.textContent = articulo.titulo;

          titulo_contenedor.appendChild(title);

          // creo el contenedor de la info del artículo
          let info_contenedor_articulo = d.createElement("div");
          info_contenedor_articulo.classList.add("info-art");

          if (articulo.hashtags) {
            // creo el contenedor de las etiquetas
            let hash_contenedor = d.createElement("div");
            hash_contenedor.classList.add("content-hash");

            // creo las etiquetas para cada hashtag
            for (let tag in articulo.hashtags) {
              if (articulo.hashtags.hasOwnProperty(tag)) {
                let hashtag = articulo.hashtags[tag];
                let tagElement = d.createElement("span");
                tagElement.classList.add("size-info-art", "hashtag");
                tagElement.textContent = `#${hashtag}`;
                hash_contenedor.appendChild(tagElement);
              }
            }

            // creo el contenedor de la fecha de publicacion y autor
            let span_contenedor = d.createElement("div");
            span_contenedor.classList.add("art-span");

            let fecha_publicacion = d.createElement("span");
            fecha_publicacion.classList.add("size-info-art", "fecha-publicacion");
            fecha_publicacion.textContent = articulo.fecha_publicacion;

            let autor = d.createElement("span");
            autor.classList.add("size-info-art", "autor");
            autor.textContent = articulo.autor;

            span_contenedor.appendChild(fecha_publicacion);
            span_contenedor.innerHTML += `<span style="margin: 0px 5px;">•</span>`;
            span_contenedor.appendChild(autor);

            info_contenedor_articulo.appendChild(hash_contenedor);
            info_contenedor_articulo.appendChild(span_contenedor);
          } else {
            console.error("El objeto hashtags no está definido para este articulo")
          }

          // creo el contenedor de la imagen
          let imagen_container = d.createElement("div");
          imagen_container.classList.add("c-img-art");
          
          let image = d.createElement("img");
          image.src = articulo.imagen;
          image.alt = articulo.titulo;

          imagen_container.appendChild(image);

          // agreggo elementos al contenedor principal edl artículo
          imagen_info_contenedor.appendChild(titulo_contenedor);
          imagen_info_contenedor.appendChild(info_contenedor_articulo);
          imagen_info_contenedor.appendChild(imagen_container);

          // creo el contenedor de botones adicionales
          let button_container = d.createElement("div");
          button_container.classList.add("c-it-btn-more");

          // creo el boton de me gusta
          let like_button = d.createElement("button");
          like_button.classList.add("btn-likes", "btn-link");
          like_button.id = `btn-likes-item-${articulo.id}`;
          like_button.title = "Me encanta";

          let like_icon = d.createElement("i");
          like_icon.classList.add("fa-solid", "fa-heart");

          let like_contador = d.createElement("div");
          like_contador.id = "number-likes";
          like_contador.textContent = "0"; // ponele q hay 12 me gustas, es a modo de ejemplo

          like_button.appendChild(like_icon);
          like_button.appendChild(like_contador);

          // creo el botón de comentarios
          let comment_boton = d.createElement("button");
          comment_boton.classList.add("btn-comments", "btn-link");
          comment_boton.id = `btn-comments-item-${articulo.id}`;
          comment_boton.title = "Comentar";

          let comment_icon = d.createElement("i");
          comment_icon.classList.add("fa-solid", "fa-comment-dots");

          comment_boton.appendChild(comment_icon);

          // creo el botón de más información
          let boton_more_info_link = d.createElement("a");
          boton_more_info_link.classList.add("btn-more", "btn-link");
          boton_more_info_link.id = `btn-more-link-item-${articulo.id}`;
          boton_more_info_link.href = articulo.url;
          boton_more_info_link.target = "_blank";
          boton_more_info_link.title = "Link";

          let boton_more_info_icon = d.createElement("i");
          boton_more_info_icon.classList.add("fa-solid", "fa-link");

          boton_more_info_link.appendChild(boton_more_info_icon);

          // agrego botones al contenedor de botones
          button_container.appendChild(like_button);
          button_container.appendChild(comment_boton);
          button_container.appendChild(boton_more_info_link);

          // agrego elementos al contenedor principal del artículo
          element_items.appendChild(imagen_info_contenedor);
          element_items.appendChild(button_container);

          // agrego el artículo al contenedor de artículos
          contenedorArticulos.appendChild(element_items);

          /**********************************************/

          // ventana emergente para cada Artículo con más información detallada.
          let btnAbrirModal = d.getElementById(`i-${articulo.id}`);
          
          let modal = d.createElement("div");
          modal.classList.add("modal");
          modal.id = `mi-modal-item-${articulo.id}`;
          main.appendChild(modal);
          
          const btn_likes = d.querySelectorAll(".btn-likes");
          btn_likes.forEach(btn => {
            btn.addEventListener("click", () => {
              modal.style.display = "none";
            });
          });

          const btn_comments = d.querySelectorAll(".btn-comments");
          btn_comments.forEach(btn => {
            btn.addEventListener("click", () => {
              modal.style.display = "none";
            });
          });

          btnAbrirModal.onclick = function (e) {
            if (e.target.id === btnAbrirModal.id ||
              e.target.id === `btn-comments-item-${articulo.id}` ||
              e.target.closest(".items") &&
              !e.target.classList.contains("btn-likes") ||
              !e.target.classList.contains("btn-link")
            ) {
              btn_likes.forEach(btn => {
                btn.click();
              })
              btn_comments.forEach(btn => {
                btn.click();
              })
              d.querySelectorAll(".modal").forEach(modal => {
                modal.style.display = "none";
              });
              modal.style.display = "block";
            } else {
              if (e.currentTarget === e.target && e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A') {
                modal.style.display = "block";
              }
            }
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

          w.onclick = function (e) {
            if (e.target === modal) {
              modal.style.display = "none";
            }
          };
        });
        /** fin de este codigo */


        // este es el código para el evento de búsqueda!
        const buscarInput = d.getElementById("id-input-search");
        buscarInput.addEventListener("input", () => {
          const searchText = buscarInput.value.trim().toLowerCase(); //esto es: recupera el valor ingresado y no importa si es mayus o minus
          const items = contenedorArticulos.querySelectorAll(".items");
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
        /** fin de este codigo */

        const btnLikesCount = d.querySelectorAll(".btn-likes");
        btnLikesCount.forEach(btn => {
          btn.addEventListener("click", () => {
            const like_contador = btn.querySelector("#number-likes");
            let like = parseInt(like_contador.textContent);
            like++;
            like_contador.textContent = like.toString();
          });
        });
      })
      .catch(error => console.error("Hubo un error al hacer la solicitud al archivo JSON", error));
  }

  const render = () => {
    loadingElements();
  }

  render();
});
