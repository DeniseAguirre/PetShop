let urlArticulos = location.search
// console.log(urlArticulos)
let parametros = new URLSearchParams(urlArticulos)
// console.log(parametros)
let idArticulos= parametros.get("_id")

const url = `https://mindhub-xj03.onrender.com/api/petshop`
const $contenedorDetalles=document.getElementById(`contenedorDetalles`)
fetch(url)
.then(response => response.json())
.then (datos=>{    
    console.log(datos)
    let letterFound = datos.find(cart => cart._id == idArticulos)
    console.log(letterFound);
    crearDetalles(letterFound)

})
.catch(err=>console.log(err))

// console.log([document]);



function crearDetalles( detalle ){
    let template=``
    template = `
    <div class="row contenedorgeneral rounded-5 p-1 d-flex justify-content-center" style="background-color: rgb(242, 225, 155);">
    <div class=" text-center col-md-6" >
            <img class="rounded-5 img-fluid col-6 pt-4 " id="imgarticles" src="${detalle.imagen}" alt="..." >
        </div>
                    <div class="p-1 col-6 d-flex text-center"id="nuevo">
                        
                        <h3><b>${detalle.producto}</b></h3>   
                        <p><Categoria: ${detalle.categoria}</p> 
                        
                        <p>${detalle.descripcion}</p>
                        <p><b>DISPONIBLES: ${detalle.disponibles}</p> 
                        <h3>Precio: $${detalle.precio}</h3> 
                        <label for="cantidad">Cantidad:</label>
                        <input type="number" id="cantidad" name="cantidad" value="0" min="0" max="${detalle.disponibles}">
                        <button type="button" class="comprar col-4 btn btn-outline-success btn-lg"><b>Añadir al carrito</b></button>
                        
        </div>

    
` 
$contenedorDetalles.innerHTML=template
}



// <a href="./assets/pages/detalle.html?id=${detalle.id}" class="col-4 rows-1 btn btn-warning">detalles</a>