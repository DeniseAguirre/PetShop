const container = document.getElementById("cartas-juguetes");
const containerCategorias = document.getElementById("category-js")
const containerSearch = document.getElementById("search-js");

let petshopData, productosJuguetes, perros, gatos,productosFiltrados;
let categoriaSeleccionada = "Todos";

//petición
const url = "https://mindhub-xj03.onrender.com/api/petshop"
fetch(url) 
    .then(response => response.json())
    .then (datos => {
            petshopData = datos;
            console.log(petshopData)
            productosJuguetes = petshopData.filter(productos => productos.categoria == "jugueteria");
            console.log(productosJuguetes)
            printCards(productosJuguetes, container)
            perros = filtroMascotas(productosJuguetes, "perro")
            console.log(perros)
            gatos = filtroMascotas(productosJuguetes, "gato")
            console.log(gatos) 
    })
    .catch(err => console.log("Error :", err))

    function cardTemplate(producto) {
      return ` <div class="card shadow m-4 card-body" style="width: 18rem; mt-1">
      <img src="${producto.imagen}" class="card-img-top" alt="img">
      <div class="card-body text-center mb-2">
      <h5 class="card-title">${producto.producto}</h5>
      <p>Precio:${" $" + producto.precio}</p>
      <p>Stock:${producto.disponibles}</p>
      <a href="./assets/pages/detail.html?id=${producto._id}" class="btn m-2 btn btn-warning">detalles</a>
      </div>
      <footer class="footer-cards text-center">
      <label for="cantidad">Cantidad:</label>
      <input type="number" id="cantidad" name="cantidad" value="0" min="0" max="${producto.disponibles}">
      <a href="./assets/pages/details.html?id=" class="btn text-center buttons-nav m-2">Añadir al carrito</a>
      </footer>
      </div> `;
  }
  
  function printCards(listaProductos, contenedor) {
      let template = ` `;
      for (let producto of listaProductos) {
      template += cardTemplate(producto);
      }
      if (listaProductos.length === 0) {
      template = `<h4>No se encontraron resultados</h4>`;
      }
      contenedor.innerHTML = template;
  }
  
  function filtroMascotas(productos, text) {
      const mascotaElegida = productos.filter((productos) =>
      productos.descripcion.toLowerCase().includes(text.toLowerCase()) || productos.producto.toLowerCase().includes(text.toLowerCase())
      );
      return mascotaElegida;
  }
  
  function filtroTexto(productos, texto) {
      const filtradosTexto = productos.filter((producto) =>
      producto.producto.toLowerCase().includes(texto.toLowerCase()) 
      // || producto.descripcion.toLowerCase().includes(texto.toLowerCase())
      );
      return filtradosTexto;
  }
  
  
  //evenListeners
  containerCategorias.addEventListener("click", (e) => {
      let inputSearch = document.getElementById("search-js");
  
      if (e.target.tagName === "A") {
          categoriaSeleccionada = e.target.getAttribute("data-value");
          const enlaces = containerCategorias.querySelectorAll('a');
          enlaces.forEach(enlace => enlace.classList.remove('active'));
          e.target.classList.add('active');
      } 
      // let categoriaSeleccionada = containerTodos.textContent.trim();
      if (categoriaSeleccionada === "Todos"){
          productosFiltrados = productosJuguetes;
      }
      if (categoriaSeleccionada === "Perros"){
          productosFiltrados = perros;
      }
      if (categoriaSeleccionada === "Gatos"){
          productosFiltrados = gatos;
      }
  
      if(inputSearch.value !== ""){
          
      let textoBuscado = inputSearch.value;
      console.log(textoBuscado);
      let resultadoFiltro = filtroTexto(productosFiltrados, textoBuscado)
      printCards(resultadoFiltro, container);
      } else {
          printCards(productosFiltrados, container);
      }
      
  });
  
  
  containerSearch.addEventListener("input", (e) => {
      
      let inputSearch = document.getElementById("search-js");
      
  
      if (e.target.tagName === "A") {
          categoriaSeleccionada = e.target.getAttribute("data-value");
          const enlaces = containerCategorias.querySelectorAll('a');
          enlaces.forEach(enlace => enlace.classList.remove('active'));
          e.target.classList.add('active');
      } 
      if (categoriaSeleccionada === "Todos"){
          productosFiltrados = productosJuguetes;
      }
      if (categoriaSeleccionada === "Perros"){
          productosFiltrados = perros;
      }
      if (categoriaSeleccionada === "Gatos"){
          productosFiltrados = gatos;
      }
      if(inputSearch.value !== ""){
          
      let textoBuscado = inputSearch.value;
      console.log(textoBuscado);
      let resultadoFiltro = filtroTexto(productosFiltrados, textoBuscado)
      printCards(resultadoFiltro, container);
      } else {
          printCards(productosFiltrados, container);
      }
  });
