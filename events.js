
const form = document.querySelector("#form");

const DateTime = luxon.DateTime;

const now = DateTime.now();
const llegada = DateTime.fromObject({ day: now.day + 10 });

form.addEventListener("submit", (e) => {
  const name = document.querySelector("#validationDefault01").value;
  const lastName = document.querySelector("#validationTooltip02").value;
  e.preventDefault();
  e.stopPropagation();
  Swal.fire({
    title: `¡Gracias por confiar en PURO SABOR! ${name} ${lastName}`,
    html: `<span class="sweet-fechas">Fecha actual: ${now.toLocaleString()}</span>
          <span class="sweet-fechas pt-2">Te enviamos un correo electronico con el detalle de tu compra.</span>
          <span class="sweet-fechas pt-3">Fecha de entrega aproximada: ${llegada.toLocaleString()}</span>`,
    color: "#fff",
    confirmButtonText: "Continuar",
    confirmButtonColor: "#ffb320",
    imageUrl: "../resources/logo.jpg",
    imageAlt: "PURO SABOR LOGO",
    imageWidth: 150,
    imageHeight: 80,
    background: "#1f2225",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "../index.html";
    }
  });
  setTimeout(() => (window.location.href = "../index.html"), 15000);
  deleteStorage();
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

