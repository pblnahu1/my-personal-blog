const w = window;
const d = document;

let main = d.getElementById("main");
let contenedorArticulos = d.getElementById("contenedor-articulos");

export function fnElementsDOM(articulo) {
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
      (e.target.closest(".items") &&
      !e.target.classList.contains("btn-likes") ||
      !e.target.classList.contains("btn-link"))
    ) {
      d.querySelectorAll(".modal").forEach((modal) => {
        modal.style.display = "none";
      });
      modal.style.display = "block";
    } else {
      if (e.currentTarget === e.target && e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A') {
        modal.style.display = "block";
      }
    }
  }

  // Contenido de cada Modal
  let modal_contenido = d.createElement("div");
  modal_contenido.classList.add("modal-contenido");
  modal.appendChild(modal_contenido);

  let header_modal = d.createElement("div");
  header_modal.classList.add("header-modal-content");
  modal_contenido.appendChild(header_modal);

  let secciones_botones_1 = d.createElement("div");
  secciones_botones_1.classList.add("contenedor-botones-atrás", "seccion-btn-modal");
  header_modal.appendChild(secciones_botones_1);

  let boton_atras = d.createElement("button");
  boton_atras.innerHTML = "&#8592;";
  boton_atras.classList.add("boton-atras", "btn-modal-header");
  secciones_botones_1.appendChild(boton_atras);

  let boton_avanzar = d.createElement("button");
  boton_avanzar.innerHTML = "&#8594;";
  boton_avanzar.classList.add("boton-avanzar", "btn-modal-header");
  secciones_botones_1.appendChild(boton_avanzar);

  let secciones_botones_2 = d.createElement("div");
  secciones_botones_2 = d.createElement("div");
  secciones_botones_2.classList.add("contenedor-botones-cerrar-link", "seccion-btn-modal");
  header_modal.appendChild(secciones_botones_2);

  let boton_link = d.createElement("button");
  boton_link.classList.add("boton-link-modal");
  boton_link.innerHTML = `Leer <li class="fa-solid fa-up-right-from-square"></li>`;
  secciones_botones_2.appendChild(boton_link);

  let spanCerrar = d.createElement("span");
  spanCerrar.classList.add("cerrar");
  spanCerrar.innerHTML = "&times;";
  secciones_botones_2.appendChild(spanCerrar);

  spanCerrar.onclick = function (e) {
    e.stopPropagation();
    modal.style.display = "none";
  }

  w.onclick = function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  };
}