const container = document.getElementById("cards-farmacia");
let petshopData;

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