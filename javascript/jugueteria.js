const container = document.getElementById("cartas-juguetes");
const containerCategorias = document.getElementById("category-js")
const containerSearch = document.getElementById("search-js");

let petshopData, productosJuguetes, perros, gatos;

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
    return `
            <div class="card shadow p-2" style="width: 18rem;">
            <img src="${producto.imagen}" class="card-img-top h-50" alt="...">
            <div class="card-body text-center mb-3">
            <h5 class="card-title">${producto.producto}</h5>
            </div>
            <footer class="footer-cards text-center">
            <p>Precio:${" $" + producto.precio}</p>
            <a href="./assets/pages/details.html?id=" class="btn text-center buttons-nav">Detalles</a>
            </footer>
            </div>
           
               `;
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
    return productos.filter((producto) =>
    producto.producto.toLowerCase().includes(texto.toLowerCase()) || producto.descripcion.toLowerCase().includes(texto.toLowerCase())
    );
}

// function crossFilter(productos, text) {
//     const resultFilterProductos = filterProducts(productos, text);
//     const resultFilterText = filterText(resultFilterProductos, text);
//     return resultFilterText;
// }

//evenListeners
containerCategorias.addEventListener("click", (e) => {

    let categoriaSeleccionada;

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
  
    const textoBuscado = containerSearch.value;
    console.log(textoBuscado);
    let filtradosTexto = productosFiltrados.filter((producto) => {
      return (
        
        (producto.producto.toLowerCase().includes(textoBuscado.toLowerCase()) ||
          producto.descripcion.toLowerCase().includes(textoBuscado.toLowerCase()))
      );
    });
    printCards(filtradosTexto, container);
  });
  
  containerSearch.addEventListener("keyup", () => {
    
    
    const textoBuscado = containerSearch.value;
    const productosFiltrados = petshopData.filter((producto) => {
      return (
        producto.jugueteria === categoriaSeleccionada &&
        (producto.producto.toLowerCase().includes(textoBuscado.toLowerCase()) ||
          producto.descripcion.toLowerCase().includes(textoBuscado.toLowerCase()))
      );
    });
    printCards(productosFiltrados, container);
  });