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
    <div class="row contenedorgeneral p-1 d-flex justify-content-center" style="background-color: rgb(242, 225, 155);">
    <div class=" text-center col-md-6" >
            <img class="img-fluid col-6 pt-4 " id="imgarticles" src="${detalle[1].imagen}" alt="..." >
        </div>
                    <div class="p-1 col-6 d-flex text-center"id="nuevo">
                        <h5 class="card-title">NOMBRE PRODUCTO</h5>
                        <h3><b>${detalle[1].producto}</b></h3>   
                        <p><Categoria: ${detalle[0].categoria}</p> 
                        <p><b><b>Descripcion:</b></p>
                        <p>${detalle[1].descripcion}</p>
                        <p><b>DISPONIBLES: ${detalle[1].disponibles}</p> 
                        <h3>Price: $${detalle[1].precio}</h3> 
        </div>

    
`
$contenedorDetalles.innerHTML=template
}


// <a href="./assets/pages/detail.html?id=${detalle.id}" class="col-4 rows-1 btn btn-warning">detalles</a>