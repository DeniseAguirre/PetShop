const container = document.getElementById("cards-farmacia");
const containerCategorias = document.getElementById("category-js")
const containerSearch = document.getElementById("search-js");

let petshopData, productosFarmacia, perros, gatos, productosFiltrados;
let categoriaSeleccionada = "Todos";

//petición
const url = "https://mindhub-xj03.onrender.com/api/petshop"
fetch(url) 
    .then(response => response.json())
    .then (datos => {
            petshopData = datos;
            console.log(petshopData)
            productosFarmacia = petshopData.filter(productos => productos.categoria == "farmacia");
            console.log(productosFarmacia)
            printCards(productosFarmacia, container)
            perros = filtroMascotas(productosFarmacia, "perro")
            console.log(perros)
            gatos = filtroMascotas(productosFarmacia, "gato")
            console.log(gatos) 
    })
    .catch(err => console.log("Error :", err))




function cardTemplate(producto) {
    return ` <article class="card col-11 col-md-5 col-xl-3 m-2">
    <img class="card-img-top" src="${producto.imagen}" alt=""></img>
    <div class="card-body">
        <h4 class="card-title">${producto.producto}</h4>
        <span>$${producto.precio}</span>
        
    </div>
    <div class="card-footer c-footer d-flex justify-content-center align-items-center">
    <a href="#" class="btn btn-primary">Añadir al carrito</a>
    </div>
</article> `;
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
        productosFiltrados = productosFarmacia;
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
        productosFiltrados = productosFarmacia;
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