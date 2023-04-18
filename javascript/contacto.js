const boton=document.getElementById(`boton`)
const form = document.getElementById(`formulario`)


console.log(nombre.value)
boton.addEventListener( `click`,()=>{
    const nombre  = document.getElementById(`nombre`)
const apellido = document.getElementById(`apellido`)
const comentario= document.getElementById(`comentario`)

if (!nombre.value||!apellido.value||!comentario.value){
    swal ( "Ups" ,  "Tiene que rellenar los campos!" ,  "error" )
    
} else{

    swal("Que bueno!", "La Consulta se ha enviado correctamente!", "success");


}
})




