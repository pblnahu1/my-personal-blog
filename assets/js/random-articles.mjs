export function cargarArticulos(random_articles_contain, articuloActual) {
  fetch('assets/js/data-articles.json')
    .then(response => response.json())
    .then(data => {
      const articulos = data.articulos; // Acceder al array de artículos

      if (!articulos || articulos.length === 0) {
        console.error("El array de artículos está vacío o no es válido.");
        return;
      }

      const indicesMostrados = new Set();
      let contador = 0;

      while (indicesMostrados.size < 3 && contador < articulos.length) {
        const randomIndex = Math.floor(Math.random() * articulos.length);

        if (!indicesMostrados.has(randomIndex) && randomIndex !== articuloActual) {
          indicesMostrados.add(randomIndex);

          const randomArticulo = articulos[randomIndex];

          if (randomArticulo && randomArticulo.imagen && randomArticulo.titulo) {
            const articleElement = document.createElement("div");
            articleElement.classList.add('random-article');
            articleElement.innerHTML = `
            <img src="${randomArticulo.imagen}" alt="${randomArticulo.titulo}" />
            <h4>${randomArticulo.titulo}</h4>
          `;
            random_articles_contain.appendChild(articleElement);
          } else {
            console.error(`El artículo en el índice ${randomIndex} no tiene la propiedad imagen o título definida.`);
          }
        }

        contador++;
      }
    })
    .catch(error => console.error('Error al cargar los artículos:', error));
}