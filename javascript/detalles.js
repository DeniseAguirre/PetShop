const url = `https://mindhub-xj03.onrender.com/api/petshop`
const $contenedorDetalles=document.getElementById(`contenedorDetalles`)
fetch(url)
.then(response => response.json())
.then (datos=>{
    losArticulos=datos
    console.log(losArticulos)
    crearDetalles(losArticulos)
})
.catch(err=>console.log(err))

console.log([document]);

let urlArticulos = location.search
console.log(urlArticulos)
let parametros = new URLSearchParams(urlArticulos)
console.log(parametros)
let idArticulos= parametros.get("id")

console.log(idArticulos)

function crearDetalles( detalle ){
    let template=``
    template = `
            <div class="col-5">
            <img class="img-fluid " id="imgarticles" src="${detalle.imagen}" alt="..." >
        </div>
                    <div class="p-4 col-5 d-flex " id="nuevo">
                        <h4 class="card-title">NOMBRE PRODUCTO</h4>
                        <p>${detalle.nombre}</p>   
                        <p><b>Categoria: ${detalle.categoria}}</p> 
                        <p><b>DISPONIBLES: ${detalle.disponibles}}</p> 
                            <p><b>Price: ${detalle.precio}}</p> 
        </div>

    
`
$contenedorDetalles.innerHTML=template
}


// <a href="./assets/pages/detail.html?id=${detalle.id}" class="col-4 rows-1 btn btn-warning">detalles</a>