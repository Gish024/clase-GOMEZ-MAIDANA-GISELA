
const form = document.querySelector("#form");

const DateTime = luxon.DateTime;

const now = DateTime.now();

form.addEventListener("submit", (e) => {
  const name = document.querySelector("#validationDefault01").value;
  const lastName = document.querySelector("#validationTooltip02").value;
  e.preventDefault();
  e.stopPropagation();
    Swal.fire({
      title: `¡Gracias por confiar en PURO SABOR! ${name} ${lastName}`,
      html: `<span class="sweet-fechas">Fecha: ${now.toLocaleString()}</span>
             <br>
            <span class="sweet-fechas pt-2"> A la brevedad te enviaremos un correo electrónico con todos los detalles.</span>`,             
      color: "rgb(108, 106, 106)",
      confirmButtonText: "Continuar",
      confirmButtonColor: "#567bf5",
      imageUrl: "../resources/logo.jpg",
      imageAlt: "PURO SABOR LOGO",
      imageWidth: 150,
      imageHeight: 150,
      background: "#96efa5",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "../index.html";
      }
    });
    
    setTimeout(() => (window.location.href = "../index.html"), 15000);
  });

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

