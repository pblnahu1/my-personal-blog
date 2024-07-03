const d = document;

export function fnLikesItems() {
  const btnLikesCount = d.querySelectorAll(".btn-likes");
  btnLikesCount.forEach(btn => {
    btn.removeEventListener("click", handleLikeClick);
    btn.addEventListener("click", handleLikeClick);
  });
}

export function fnLikesComments() {
  const btnLikesCountComment = d.querySelectorAll(".btn-count-comment");
  btnLikesCountComment.forEach(btn => {
    btn.removeEventListener("click", handleLikeCommentClick);
    btn.addEventListener("click", handleLikeCommentClick);
  });
}

function handleLikeClick(event) { 
  
  event.stopPropagation();

  const target = event.currentTarget; 
  const like_contador = target.querySelector("#number-likes");

  if (like_contador) {
    let like = parseInt(like_contador.textContent) || 0;  
    like++;
    like_contador.textContent = like.toString();
  }
}


function handleLikeCommentClick(event) {
  event.stopPropagation();
  const target = event.currentTarget;

  const contenedor = target.closest(".contenedor-acciones-botones");
  if (!contenedor) {
    console.log("no se encontró el contenedor con los botones de los comentarios");
    return;
  } 

  const like_contador_comentario = target.querySelector("#number-likes-comment");
  const dislike_contador_comentario = target.querySelector("#number-dislikes-comment");

  console.log(like_contador_comentario);
  console.log(dislike_contador_comentario);

  if (like_contador_comentario) {
    let like_comment = parseInt(like_contador_comentario.textContent) || 0;
    like_comment++;
    console.log(like_comment);
    like_contador_comentario.textContent = like_comment.toString();
    console.log(like_contador_comentario);
  }


  if (dislike_contador_comentario) {
    let dislike_comment = parseFloat(dislike_contador_comentario.textContent) || 0;
    dislike_comment++;
    console.log(dislike_comment);
    dislike_contador_comentario.textContent = dislike_comment.toString();
    console.log(dislike_contador_comentario);
  }
}