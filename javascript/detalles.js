const url = `https://mindhub-xj03.onrender.com/api/petshop`
const $contenedorDetalles=document.getElementById(`contenedorDetalles`)
fetch(url)
.then(response => response.json())
.then (datos=>{
    losArticulos=datos
    console.log(losArticulos)
})
.catch(err=>console.log(err))

console.log([document]);

let urlArticulos = location.search
console.log(urlArticulos)
let parametros = new URLSearchParams(urlArticulos)
console.log(parametros)
let idArticulos= parametros.get("_ID")
console.log(idArticulos)

