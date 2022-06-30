// CREACION DE ELEMENTOS 

let parrafo = document.createElement("p");
parrafo.innerHTML = "<h6>Gracias por visitarnos</h6>"; 
document.body.append(parrafo);


const nombre = document.getElementById("validationTooltip01");
const apellido = document.getElementById("validationTooltip02");
const email = document.getElementById("validationTooltipUsername");
const ciudad = document.getElementById("validationTooltip03");
const provincia = document.getElementById("validationTooltip04");
const telefono = document.getElementById("validationTooltip05");
const mensaje = document.getElementById("validationTooltip06");


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



// EVENTO MOUSE

let botonClick = document.getElementById("boton")
botonClick.onclick = () => {console.log("Click")}
botonClick.onmousemove = () => {console.log("Move")}


// Validaciones:

const formulario = document.querySelectorAlld('needs-validation');

Array.from(formulario).forEach(form => {
  form.addEventListener('submit', event => {
    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }

    form.classList.add('was-validated')
  }, false)
});

// SWEET ALERT

const envioFormulario = document.getElementById("btnEnviar");

envioFormulario.addEventListener("click", () => {
    swal({
        title: "Genial",
        text: "Tu mensaje ha sido enviado con éxito, a la brevedad nos estaremos contactando con Ud.",
        icon: "success",
        confirm: "Ok",        
    })
})