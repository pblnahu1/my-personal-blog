
const d = document;

let numArticulosMostrados = 0
const numArticulosPorMostrar = 3

let fnArtMostrar = (a) => { /* Esta función se ejecutará más adelante */ };

/**
 * Una función que filtra articulos por su ID y muestra el resultad..
 * #EnProcesoDeDesarrollo
 * @param {array} a - El array de los artículos a filtrar
 * @return {void} No retorna ningún valor
 */
export const mostrarMasArticulos = () => {
  const $btnVerMas = d.getElementById("action-btn-ver-mas");
  const ultimoArticuloID = 8;

  fnArtMostrar = (a) => {
    const artMostrar = a.filter(art => {
      return art.id > ultimoArticuloID && art.id <= ultimoArticuloID + 3;
    }) 

    console.log(artMostrar)
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

  // data.articulos.forEach(articulo => {
  //   fnArtMostrar(articulo)
  // })

  // for (let i = numArticulosMostrados; i < numArticulosPorMostrar; i++) { }
}