import { mostrarMasArticulos, fetchingArtMostrar } from "./main.mjs";
import { fnSearchItems } from "./search.mjs";
import { fnElementsDOM } from "./dom.mjs";
import { fnLikesComments, fnLikesItems } from "./likes.mjs";
// import { fn_render_dom } from "./render_dom.mjs";
import hamburguerMenu from "./menu-bar-mobile.mjs";
import darkMode from "./dark-mode.mjs";

const d = document;

d.addEventListener("DOMContentLoaded", () => {
  /**
   * Función que carga elementos desde un archivo JSON, crea elementos, y manejar la funcionalidad de búsqueda y "me gustas".
   *
   * @param None
   * @return None
   */
  const loadingElements = () => {
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
          // fn_render_dom(articulo);
          fnElementsDOM(articulo);
        })
        // invoco a fnSearchItems una vez después de cargar todos los elementos
        fnLikesItems();
        fnLikesComments();
        fnSearchItems();
      })
      .catch(error => console.error("Hubo un error al hacer la solicitud al archivo JSON", error));
  }

  hamburguerMenu(".menu-bars", ".nav-bar", ".nav-links");

  darkMode(".darkmode");

  

  /**
   * Una función que llama a loadingElements, mostrarMasArticulos y fetchingArtMostrar.
   *
   * @param {} - 
   * @return {} - 
   */
  const render = () => {
    loadingElements();
    mostrarMasArticulos();
    fetchingArtMostrar();
  }

  render();
});
