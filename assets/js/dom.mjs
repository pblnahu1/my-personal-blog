const w = window;
const d = document;

let main = d.getElementById("main");
let contenedorArticulos = d.getElementById("contenedor-articulos");

export function fnElementsDOM(articulo) {
  function fnArticulosMain(articulo) {
    let element_items = d.createElement("div");
    element_items.classList.add("items");
    element_items.id = `i-${articulo.id}`;
  
    let imagen_info_contenedor = d.createElement("div");
    imagen_info_contenedor.classList.add("c-it-img-info");
    
    let titulo_contenedor = d.createElement("div");
    titulo_contenedor.classList.add("title-article");
    
    let title = d.createElement("h3");
    title.classList.add("title-desc");
    title.textContent = articulo.titulo;
  
    titulo_contenedor.appendChild(title);
    
    let info_contenedor_articulo = d.createElement("div");
    info_contenedor_articulo.classList.add("info-art");
    
    if (articulo.hashtags) {
      let hash_contenedor = d.createElement("div");
      hash_contenedor.classList.add("content-hash");
  
      for (let tag in articulo.hashtags) {
        if (articulo.hashtags.hasOwnProperty(tag)) {
          let hashtag = articulo.hashtags[tag];
          let tagElement = d.createElement("span");
          tagElement.classList.add("size-info-art", "hashtag");
          tagElement.textContent = `#${hashtag}`;
          hash_contenedor.appendChild(tagElement);
        }
      }

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
    
    let imagen_container = d.createElement("div");
    imagen_container.classList.add("c-img-art");
  
    let image = d.createElement("img");
    image.src = articulo.imagen;
    image.alt = articulo.titulo;
  
    imagen_container.appendChild(image);

    imagen_info_contenedor.appendChild(titulo_contenedor);
    imagen_info_contenedor.appendChild(info_contenedor_articulo);
    imagen_info_contenedor.appendChild(imagen_container);
    
    let button_container = d.createElement("div");
    button_container.classList.add("c-it-btn-more");
    
    let like_button = d.createElement("button");
    like_button.classList.add("btn-likes", "btn-link");
    like_button.id = `btn-likes-item-${articulo.id}`;
    like_button.title = "Me encanta";
  
    let like_icon = d.createElement("i");
    like_icon.classList.add("fa-solid", "fa-heart");
  
    let like_contador = d.createElement("div");
    like_contador.id = "number-likes";
    like_contador.textContent = "0";
  
    like_button.appendChild(like_icon);
    like_button.appendChild(like_contador);

    let comment_boton = d.createElement("button");
    comment_boton.classList.add("btn-comments", "btn-link");
    comment_boton.id = `btn-comments-item-${articulo.id}`;
    comment_boton.title = "Comentar";
  
    let comment_icon = d.createElement("i");
    comment_icon.classList.add("fa-solid", "fa-comment-dots");
  
    comment_boton.appendChild(comment_icon);

    let boton_more_info_link = d.createElement("a");
    boton_more_info_link.classList.add("btn-more", "btn-link");
    boton_more_info_link.id = `btn-more-link-item-${articulo.id}`;
    boton_more_info_link.href = articulo.url;
    boton_more_info_link.target = "_blank";
    boton_more_info_link.title = "Link";
  
    let boton_more_info_icon = d.createElement("i");
    boton_more_info_icon.classList.add("fa-solid", "fa-link");
  
    boton_more_info_link.appendChild(boton_more_info_icon);
  
    button_container.appendChild(like_button);
    button_container.appendChild(comment_boton);
    button_container.appendChild(boton_more_info_link);
  
    element_items.appendChild(imagen_info_contenedor);
    element_items.appendChild(button_container);
  
    contenedorArticulos.appendChild(element_items);
  }

  function fnArticulosModal(articulo) {
    let btnAbrirModal = d.getElementById(`i-${articulo.id}`);

    let modal = d.createElement("div");
    modal.classList.add("modal");
    modal.id = `mi-modal-item-${articulo.id}`;
    main.appendChild(modal);

    recorroBtns(modal, btnAbrirModal);
  }

  function recorroBtns(modal, btnAbrirModal) {
    const btn_likes = d.querySelectorAll(`#btn-likes-item-${articulo.id}`);
    btn_likes.forEach(btn => {
      btn.addEventListener("click", () => {
        modal.style.display = "none";
      });
    });
  
    const btn_comments = d.querySelectorAll(`#btn-comments-item-${articulo.id}`);
    btn_comments.forEach(btn => {
      btn.addEventListener("click", () => {
        modal.style.display = "none";
      });
    });

    handleClickModal(modal, btnAbrirModal, articulo);
  }

  function handleClickModal(modal, btnAbrirModal, articulo) {
    btnAbrirModal.onclick = function (e) {
      if (
        e.target.id === btnAbrirModal.id ||
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
    };

    fnContenidoCadaModal(modal, articulo);
  }

  function fnContenidoCadaModal(modal, articulo) {
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

    let boton_link = d.createElement("a");
    boton_link.classList.add("boton-link-modal");
    boton_link.innerHTML = `Leer <li class="fa-solid fa-up-right-from-square"></li>`;
    boton_link.href = `${articulo.url}`;
    boton_link.target = "_blank";
    secciones_botones_2.appendChild(boton_link);

    let spanCerrar = d.createElement("span");
    spanCerrar.classList.add("cerrar");
    spanCerrar.innerHTML = "&times;";
    secciones_botones_2.appendChild(spanCerrar);

    handleClickCerrarSpan(modal, spanCerrar);

    let main_modal = d.createElement("div");
    main_modal.classList.add("main-modal");
    modal_contenido.appendChild(main_modal);

    let seccion_articulo = d.createElement("section");
    seccion_articulo.classList.add("section-articulo", "seccion-articlo-articulo");
    seccion_articulo.id = `seccion_articulo_${articulo.id}`;
    main_modal.appendChild(seccion_articulo);

    let separador = d.createElement("hr");
    separador.classList.add("article-separator");
    main_modal.appendChild(separador);

    let seccion_articulo_info = d.createElement("section");
    seccion_articulo_info.classList.add("section-articulo", "seccion-articulo-info");
    seccion_articulo_info.id = `seccion_articulo_info_${articulo.id}`;
    main_modal.appendChild(seccion_articulo_info);

    let art = d.createElement("article");
    art.classList.add("articulo");
    art.id = `data-${articulo.id}`;
    seccion_articulo.appendChild(art);

    let title_text = d.createElement("h2");
    title_text.classList.add("title-text-article");
    title_text.id = `title-text-${articulo.id}`;
    title_text.textContent = `${articulo.titulo}`;
    art.appendChild(title_text);

    let cita_description = d.createElement("blockquote");
    let desc = d.createElement("p");
    desc.textContent = `${articulo.description}`;
    art.appendChild(cita_description);
    cita_description.appendChild(desc);

    if (articulo.hashtags) {
      let hash_contenedor = d.createElement("div");
      hash_contenedor.classList.add("content-hash");

      for (let tag in articulo.hashtags) {
        if (articulo.hashtags.hasOwnProperty(tag)) {
          let hashtag = articulo.hashtags[tag];
          let tagElement = d.createElement("span");
          tagElement.classList.add("size-info-art", "hashtag");
          tagElement.textContent = `#${hashtag}`;
          hash_contenedor.appendChild(tagElement);
        }
      }

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

      art.appendChild(hash_contenedor);
      art.appendChild(span_contenedor);
    } else {
      console.error("El objeto hashtags no está definido para este articulo")
    }

    let img_modal_content = d.createElement("div");
    img_modal_content.classList.add("img-modal-content");
    art.appendChild(img_modal_content);

    let img_modal = d.createElement("img");
    img_modal.src = articulo.imagen;
    img_modal.alt = articulo.titulo;
    img_modal_content.appendChild(img_modal);

    let contenedor_botones_modal = d.createElement("div");
    contenedor_botones_modal.classList.add("contenedor-botones-modal");
    art.appendChild(contenedor_botones_modal);

    let button_container_modal = d.createElement("div");
    button_container_modal.classList.add("c-it-btn-more", "c-it-btn-more-modal");

    // creo el boton de me gusta
    let like_button_modal = d.createElement("button");
    like_button_modal.classList.add("btn-likes", "btn-link");
    like_button_modal.id = `btn-likes-item-${articulo.id}`;
    like_button_modal.title = "Me encanta";

    let like_icon_modal = d.createElement("i");
    like_icon_modal.classList.add("fa-solid", "fa-heart");

    let like_contador_modal = d.createElement("div");
    like_contador_modal.id = "number-likes";
    like_contador_modal.textContent = "0";

    like_button_modal.appendChild(like_icon_modal);
    like_button_modal.appendChild(like_contador_modal);

    let comment_boton_modal = d.createElement("a");
    comment_boton_modal.classList.add("btn-comments", "btn-link");
    comment_boton_modal.id = `btn-comments-item-${articulo.id}`;
    comment_boton_modal.href = "#";
    comment_boton_modal.textContent = "Comentar";
    comment_boton_modal.title = "Comentar";

    let comment_icon_modal = d.createElement("i");
    comment_icon_modal.classList.add("fa-solid", "fa-comment-dots");
    comment_boton_modal.appendChild(comment_icon_modal);

    let bookmark_modal = d.createElement("a");
    bookmark_modal.classList.add("bookmark-btn-modal", "btn-link");
    bookmark_modal.id = `bookmark-btn-article-${articulo.id}`;
    bookmark_modal.href = "#";
    bookmark_modal.textContent = "Guardar";
    bookmark_modal.title = "Guardar Artículo";

    let bookmark_modal_icon = d.createElement("i");
    bookmark_modal_icon.classList.add("fa-solid", "fa-bookmark");
    bookmark_modal.appendChild(bookmark_modal_icon);

    let boton_more_info_link_modal = d.createElement("a");
    boton_more_info_link_modal.classList.add("btn-more", "btn-link");
    boton_more_info_link_modal.id = `btn-more-link-item-${articulo.id}`;
    boton_more_info_link_modal.href = articulo.url;
    boton_more_info_link_modal.target = "_blank";
    boton_more_info_link_modal.title = "Copiar";
    boton_more_info_link_modal.textContent = "Copiar";

    let boton_more_info_icon_modal = d.createElement("i");
    boton_more_info_icon_modal.classList.add("fa-solid", "fa-link");

    boton_more_info_link_modal.appendChild(boton_more_info_icon_modal);

    button_container_modal.appendChild(like_button_modal);
    button_container_modal.appendChild(comment_boton_modal);
    button_container_modal.appendChild(bookmark_modal);
    button_container_modal.appendChild(boton_more_info_link_modal);

    contenedor_botones_modal.appendChild(button_container_modal);

    // Seccion comentarios (<article>)
    let article_comments = d.createElement("article");
    article_comments.classList.add("article-comments");
    seccion_articulo.appendChild(article_comments);

    let comentariosTitulo = d.createElement("h4");
    comentariosTitulo.textContent = "¿Qué opinas?";
    article_comments.appendChild(comentariosTitulo);

    let formularioComentario = d.createElement("form");
    formularioComentario.classList.add("formulario-comentario");
    article_comments.appendChild(formularioComentario);

    let inputComentario = d.createElement("textarea");
    inputComentario.classList.add("input-comentario");
    inputComentario.placeholder = "Comparta con otros sus opiniones...";
    formularioComentario.appendChild(inputComentario);

    let botonAgregarComentario = d.createElement("button");
    botonAgregarComentario.classList.add("btn-agregar-comentario");
    botonAgregarComentario.textContent = "Comentar";
    formularioComentario.appendChild(botonAgregarComentario);

    botonAgregarComentario.addEventListener("click", function (event) {
      event.preventDefault();
      let comentariosListaContenedor = d.createElement("div");
      comentariosListaContenedor.classList.add("comentarios-lista-contenedor");
      article_comments.appendChild(comentariosListaContenedor);

      let comentarioTexto = inputComentario.value.trim();
      if (comentarioTexto !== "") {

        let contenedor_respuestas_span = d.createElement("div");
        contenedor_respuestas_span.classList.add("contenedor-respuestas-span", "contenedores-comment");
        comentariosListaContenedor.appendChild(contenedor_respuestas_span);

        let contenedor_acciones_botones = d.createElement("div");
        contenedor_acciones_botones.classList.add("contenedor-acciones-botones", "contenedores-comment");
        comentariosListaContenedor.appendChild(contenedor_acciones_botones);

        let comentarioElemento = d.createElement("span");
        comentarioElemento.classList.add("comentario");
        comentarioElemento.textContent = comentarioTexto;

        let like_button_comments = d.createElement("button");
        like_button_comments.classList.add("btn-likes-comment", "btn-link", "btn-count-comment");
        like_button_comments.id = `btn-likes-comment-item-${articulo.id}`;
        like_button_comments.title = "Me encanta";

        let like_icon_comments = d.createElement("i");
        like_icon_comments.classList.add("fa-solid", "fa-thumbs-up");

        let like_contador_comments = d.createElement("div");
        like_contador_comments.id = "number-likes-comment";
        like_contador_comments.textContent = "0";

        like_button_comments.appendChild(like_icon_comments);
        like_button_comments.appendChild(like_contador_comments);

        let dislike_button_comments = d.createElement("button");
        dislike_button_comments.classList.add("btn-dislikes-comment", "btn-link", "btn-count-comment");
        dislike_button_comments.id = `btn-dislikes-comment-item-${articulo.id}`;
        dislike_button_comments.title = "No me gusta";

        let dislike_icon_comments = d.createElement("i");
        dislike_icon_comments.classList.add("fa-solid", "fa-thumbs-down");

        let dislike_contador_comments = d.createElement("div");
        dislike_contador_comments.id = "number-dislikes-comment";
        dislike_contador_comments.textContent = "0";

        dislike_button_comments.appendChild(dislike_icon_comments);
        dislike_button_comments.appendChild(dislike_contador_comments);

        let respuestas_comentarios = 1;
        let responder_btn_comments = d.createElement("button");
        responder_btn_comments.classList.add("btn-responder", "btn-link");
        responder_btn_comments.id = `btn-responder-comentario-${respuestas_comentarios++}`;
        responder_btn_comments.textContent = "Responder";
        responder_btn_comments.title = "Responder";

        contenedor_respuestas_span.appendChild(comentarioElemento);
        contenedor_acciones_botones.appendChild(like_button_comments);
        contenedor_acciones_botones.appendChild(dislike_button_comments);
        contenedor_acciones_botones.appendChild(responder_btn_comments);

        inputComentario.value = "";
      }
    });

    let recomendaciones_btn = d.createElement("div");
    recomendaciones_btn.classList.add("container-btn-recomendar");
    recomendaciones_btn.textContent = "Acá irá para copiar el link, y compartir en redes sociales";
    seccion_articulo_info.appendChild(recomendaciones_btn);
  }
  
  function handleClickCerrarSpan(modal, spanCerrar) {
    spanCerrar.onclick = function (e) {
      e.stopPropagation();
      modal.style.display = "none";
    }

    hideModalOnClickOutside(modal);
  }

  fnArticulosMain(articulo);
  fnArticulosModal(articulo);
}

function hideModalOnClickOutside(modal) {
  w.addEventListener('click', function(event) {
    if (event.target.classList.contains("modal")) {
      modal.style.display = 'none';
    }
  });
}

