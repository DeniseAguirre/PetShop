const boton=document.getElementById(`boton`)
const form = document.getElementById(`formulario`)


console.log(nombre.value)
boton.addEventListener( `click`,()=>{
    const nombre  = document.getElementById(`nombre`)
const apellido = document.getElementById(`apellido`)
const comentario= document.getElementById(`comentario`)

if (!nombre.value||!apellido.value||!comentario.value){
    alert(`¡tiene que rellenar los campos!`)
    
} else{

    alert("¡La consulta se ha enviado correctamente!")


}
    
})



