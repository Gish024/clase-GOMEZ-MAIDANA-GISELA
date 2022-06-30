const nombre = document.getElementById("validationTooltip01");
const apellido = document.getElementById("validationTooltip02");
const email = document.getElementById("validationTooltipUsername");
const ciudad = document.getElementById("validationTooltip03");
const provincia = document.getElementById("validationTooltip04");
const telefono = document.getElementById("validationTooltip05");
const mensaje = document.getElementById("validationTooltip06");
const formulario = document.getElementById("form");

// EVENTO INPUT

nombre.addEventListener("input", () => {
 console.log(nombre.value)
})

apellido.addEventListener("input", () => {
    console.log(apellido.value)
})

email.addEventListener("input", () => {
    console.log(email.value)
})

mensaje.addEventListener("input", () => {
    console.log(mensaje.value)
})



// EVENTO CHANGE

ciudad.onchange = () => {console.log("valor1")};
provincia.onchange = () => {console.log("valor2")}
telefono.onchange = () => {console.log("valor3")}


// EVENTO SUBMIT

formulario. addEventListener ("submit", validarFormulario );
function validarFormulario (e){
 e.preventDefault ();
 alert ("¡Formulario Enviado con éxito!")
 console.log("Formulario Enviado "); 
}

// EVENTO MOUSE

let botonClick = document.getElementById("boton")
botonClick.onclick = () => {console.log("Click")}
botonClick.onmousemove = () => {console.log("Move")}


