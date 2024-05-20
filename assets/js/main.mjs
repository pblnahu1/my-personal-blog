import { fnElementsDOM } from "./dom.mjs";
import { fnLikesItems } from "./likes.mjs";
import { fnSearchItems } from "./search.mjs";
import { fn_render_dom } from "./render_dom.mjs";

const d = document;

let numArticulosMostrados = 0
const numArticulosPorMostrar = 3

let fnArtMostrar = () => { /* Esta función se ejecutará más adelante */ };

let contenedorArticulos = d.getElementById("contenedor-articulos");

/**
 * Una función que filtra articulos por su ID y muestra el resultado..
 * #EnProcesoDeDesarrollo
 * @param {array} a - El array de los artículos a filtrar
 * @return {void} No retorna ningún valor
 */
export const mostrarMasArticulos = () => {
  const $btnVerMas = d.getElementById("action-btn-ver-mas");

  fnArtMostrar = (a) => {
    $btnVerMas.addEventListener("click", () => {
      const inicio = numArticulosMostrados;
      numArticulosMostrados += numArticulosPorMostrar;
      
      // const artMostrar = a.filter(art => {
      //   return art.id > ultimoArticuloID && art.id <= ultimoArticuloID + 3;
      // })

      const artMostrar = a.slice(inicio, numArticulosMostrados);

      artMostrar.forEach(articulo => {
        fn_render_dom(articulo);
        // fnElementsDOM(articulo);
        // fnSearchItems();
      })

      console.log(artMostrar)
      contenedorArticulos.appendChild(artMostrar)

      fnLikesItems();
    })
  }  
}

/**
 * Obtiene datos de "data-articles.json" y llama a fnArtMostrar con los datos recuperados.
 * #EnProcesoDeDesarrollo
 * @return {Promise<void>} No retorna ningún valor
 */
export const fetchingArtMostrar = async () => {
  const response = await fetch("assets/js/data-articles.json")
  const data = await response.json()
  fnArtMostrar(data.articulos)
}