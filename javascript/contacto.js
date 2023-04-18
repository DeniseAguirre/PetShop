const boton=document.getElementById(`boton`)
const form = document.getElementById(`formulario`)

boton.addEventListener( `click`,()=>{
    const nombre  = document.getElementById(`nombre`)
const apellido = document.getElementById(`apellido`)
const comentario= document.getElementById(`comentario`)
const email=document.getElementById(`email`)


if (!nombre.value||!apellido.value||!comentario.value||!email.value){
    swal ( "Ups" ,  "Tiene que rellenar los campos!" ,  "error" )
    
} else{
    swal("Que bueno!", "La Consulta se ha enviado correctamente!", "success");
}
    
})

