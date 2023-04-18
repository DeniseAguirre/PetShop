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
    <div class="card-body product">
        <h4 class="card-title">${producto.producto}</h4>

        <span class="precio">$${producto.precio}</span>
        <p>Stock disponible: ${producto.disponibles} unid.</p>
        <a href="./assets/pages/detail.html?_ID=${producto._id}" class="">Detalles</a>
    </div>
    <div class="card-footer c-footer d-flex justify-content-around align-items-center">
        <div class="cantidad">
            <label for="cantidad">Cantidad:</label>
            <input type="number" id="cantidad" name="cantidad" value="1" min="0" max="${producto.disponibles}">
        </div>
        <button class="add-to-cart btn btn-producto">Agregar al carrito</button>
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

// Obtener el botón "Agregar al carrito"
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Crear un objeto para almacenar los productos del carrito
let cart = [];

// Agregar un evento click a cada botón "Agregar al carrito"
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Obtener la cantidad ingresada por el usuario
      const cantidad = parseInt(button.previousElementSibling.querySelector('input').value);
      console.log(cantidad)
  
      // Obtener la información del producto desde el elemento padre del botón
      const card = button.closest('.card');
      const producto = {
        id: card.dataset.productId,
        imagen: card.querySelector('.card-img-top').src,
        nombre: card.querySelector('.card-title').textContent,
        precio: parseFloat(card.querySelector('.precio').textContent.slice(1)),
        disponibles: parseInt(card.querySelector('.disponibles').textContent),
        cantidad: cantidad
      };

       // Verificar si el producto ya se encuentra en el carrito
    const existingProductIndex = cart.findIndex(item => item.id === producto.id);
    if (existingProductIndex >= 0) {
      // Si el producto ya está en el carrito, actualizar su cantidad
      cart[existingProductIndex].cantidad += cantidad;
    } else {
      // Si el producto no está en el carrito, agregarlo
      cart.push(producto);
    }

    // Actualizar la cantidad de productos y el subtotal del carrito
    updateCart();
  });
});

function updateCart() {
    // Obtener el elemento del carrito y el elemento donde se mostrará la cantidad de productos
    const cartElement = document.querySelector('#cart');
    const quantityElement = document.querySelector('#cart-quantity');
  
    // Calcular la cantidad total de productos y el subtotal del carrito
    let quantity = 0;
    let subtotal = 0;
    cart.forEach(item => {
      quantity += item.cantidad;
      subtotal += item.cantidad * item.precio;
    });
  
    // Actualizar la cantidad de productos y el subtotal del carrito
    quantityElement.textContent = quantity;
    cartElement.querySelector('.subtotal').textContent = `$${subtotal.toFixed(2)}`;
  
    // Crear una lista de los productos del carrito
    const productList = cart.map(item => {
      return `
        <li>
          <img src="${item.imagen}" alt="">
          <div>
            <h5>${item.nombre}</h5>
            <span>${item.cantidad} x $${item.precio.toFixed(2)}</span>
          </div>
          <button class="remove-item">Eliminar</button>
        </li>
      `;
    }).join('');
  
    // Mostrar la lista de productos del carrito
    cartElement.querySelector('ul').innerHTML = productList;
  
    // Agregar un evento click a cada botón "Eliminar"
  const removeButtons = cartElement.querySelectorAll('.remove-item');
  removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Obtener el ID del producto a eliminar
      const productId = button.closest('li').dataset.productId;

      // Eliminar el producto del carrito
      cart = cart.filter(item => item.id !== productId);

      // Actualizar la cantidad de productos y el subtotal del carrito
      updateCart();
    });
  });
}