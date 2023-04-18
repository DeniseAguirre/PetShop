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


$('.btn-number').click(function(e){
    e.preventDefault();
    
    fieldName = $(this).attr('data-field');
    type      = $(this).attr('data-type');
    var input = $("input[name='"+fieldName+"']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if(type == 'minus') {
            
            if(currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
            } 
            if(parseInt(input.val()) == input.attr('min')) {
                $(this).attr('disabled', true);
            }

        } else if(type == 'plus') {

            if(currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
            }
            if(parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }

        }
    } else {
        input.val(0);
    }
});
$('.input-number').focusin(function(){
   $(this).data('oldValue', $(this).val());
});
$('.input-number').change(function() {
    
    minValue =  parseInt($(this).attr('min'));
    maxValue =  parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());
    
    name = $(this).attr('name');
    if(valueCurrent >= minValue) {
        $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Sorry, the minimum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    if(valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Sorry, the maximum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    
    
});
$(".input-number").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) || 
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

// <a href="./assets/pages/detail.html?id=${detalle.id}" class="col-4 rows-1 btn btn-warning">detalles</a>