const d = document;

export function fnLikesItems() {
  const btnLikesCount = d.querySelectorAll(".btn-likes");
  btnLikesCount.forEach(btn => {
    btn.removeEventListener("click", handleLikeClick);
    btn.addEventListener("click", handleLikeClick);
  });
}

function handleLikeClick(event) { 
  event.stopPropagation();
  const target = event.currentTarget; 
  const like_contador = target.querySelector("#number-likes");
  let like = parseInt(like_contador.textContent);
  like++;
  like_contador.textContent = like.toString();
}