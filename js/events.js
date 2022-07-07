// CREACION DE ELEMENTOS 

let parrafo = document.createElement("p");
parrafo.innerHTML = "<h6>¡Gracias por visitarnos!</h6>"; 
document.body.append(parrafo);


// Validaciones:

const form = document.getElementById("form");


// Obtenemos todos los form que necesitamos validar
const forms = document.querySelectorAll('.needs-validation')

// Iteramos sobre ellos y evitamos el comportamiento por default y la propagación del evento
Array.from(forms).forEach(form => {
  form.addEventListener('submit', event => {
    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }

    form.classList.add('invalid-feedback')
  }, false)
});

// LIBRERIA SWEET ALERT

const envioFormulario = document.getElementById("btnEnviar");

envioFormulario.addEventListener("click", () => {
    swal({
        title: "Genial",
        text: "Tu mensaje ha sido enviado con éxito, a la brevedad nos estaremos contactando con Ud.",
        icon: "success",
        confirm: "Ok",        
    })
})