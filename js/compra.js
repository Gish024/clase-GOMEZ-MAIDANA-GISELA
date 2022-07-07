
// SALUDO

let saludo = document.getElementById("saludar");

const saludoCliente = prompt("¡Bienvenido a nuestra tienda online! Ingrese por favor su nombre: ");

saludo.innerText = '¡Hola  ' +saludoCliente+ '!'+ ' Seleccioná los productos que querés comprar:';

console.log( saludo.innerText ) 

// OBJETOS y ARRAYS

const array = [
  {
    id: 1,
    name: "Medallones de Garbanzos",
    img: "../resources/medallongarbanzo.jpg",
    precio: 600,
  },
  {
    id: 2,
    name: "Medallones de Arroz Yamaní y espinaca",
    img: "../resources/medallonarroz.jpg",
    precio: 600,
  },
  {
    id: 3,
    name: "Medallones de Lenteja",
    img: "../resources/medallon.jpg",
    precio: 600,
  },
  {
    id: 4,
    name: "Tarta de choclo",
    img: "../resources/tartaschoclo.jpg",
    precio: 800,
  },
  {
    id: 5,
    name: "Tarta de espinaca",
    img: "../resources/tartaespinaca.jpg",
    precio: 800,
  },
  {
    id: 6,
    name: "Albondigas de Lentejas",
    img: "../resources/albondigas.jpg",
    precio: 500,
  },
  {
    id: 7,
    name: "Prepizza de Zanahoria",
    img: "../resources/pizzacaserazanahoria.jpg",
    precio: 400,
  },
  {
    id: 8,
    name: "Panqueques de espinaca",
    img: "../resources/panquequesespinaca.jpg",
    precio: 300,
  },
];

document.addEventListener("DOMContentLoaded", () => {
primerCompraGet();
segundaCompraGet() 
});

// OPERADOR LOGICO OR

const carrito = JSON.parse(localStorage.getItem('carrito')) || []


// LocalStorage -- 

const primerCompraGet = () => {
  if (localStorage.getItem("compra")) {
    compra = JSON.parse(localStorage.getItem("compra"));
    pintarCarrito();
  }
  };

// --- PINTAR CARRITO ---

const templateCarrito = document.querySelector("#template-carrito").content;
const fragment = document.createDocumentFragment();

const listaProductos = document.querySelector(".list-products"); 

// - Donde se pintaran nuestros costos

const carritoSubTotal = document.querySelector(".carrito-subTotal");
const carritoEnvio = document.querySelector(".carrito-envio");
const carritoIva = document.querySelector(".carrito-iva");
const carritoTotal = document.querySelector(".carrito-total");

const pintarCarrito = () => {

listaProductos.innerHTML = ""; 
Object.values(compra).forEach((producto) => {
  if (producto.price > 0) {
    
    templateCarrito.querySelectorAll("td")[0].textContent = producto.name;
    templateCarrito.querySelectorAll("td")[1].textContent = producto.amount;
    templateCarrito.querySelectorAll("td")[2].textContent = producto.amount * producto.price;

    const clone = templateCarrito.cloneNode(true);
    fragment.appendChild(clone);
  }
});

listaProductos.appendChild(fragment);

pintarCostos();
};

// --- Costos ---

const pintarCostos = () => {
const subTotal = Object.values(compra).reduce(
  (acc, { amount, price }) => acc + price * amount,
  0
);

carritoSubTotal.textContent = "$ " + subTotal;

const iva = subTotal * 0.21;
carritoIva.textContent = "$ " + Math.trunc(iva);

let envio = 0;


//OPERADOR TERNARIO

const mostrarEnvio = () =>  (total > 3000) ? true : false
mostrarEnvio ? ("envio = 0") : ("envio = 200");


const total = subTotal + iva + envio;
carritoTotal.textContent = "$ " + total;

mostrarEnvio();
carritoEnvio.textContent = "$ " + envio;
};

const template = document.querySelector("#template").content;
const cards = document.querySelector("#items");

// PINTAR CARDS 

const showProduct = (array) => {
  array.forEach((el) => {
    if (el.precio > 0) {
      template.querySelector("#cTitle").textContent = el.name;
      template.querySelector("#cText").textContent = el.precio;
      template.querySelector("#card-img").setAttribute("src", el.img);
      template.querySelector("#btn-compra").dataset.id = el.id;
      const clone = template.cloneNode(true);
      fragment.appendChild(clone);
    }
  });
  cards.appendChild(fragment);
};

//--- SELECCION DE PRODUCTOS ---
  
let compraItems = {};
  
// --- AGREGAR AL CARRITO ---
cards.addEventListener("click", (e) => {
  addCarrito(e);
});

const addCarrito = (e) => {
  if (e.target.classList.contains("btn-primary")) {
    setCarrito(e.target.parentElement);
  }

  e.stopPropagation();
};

const setCarrito = (objeto) => {
  const producto = {
    id: objeto.querySelector("#btn-compra").dataset.id,
    name: objeto.querySelector("#cTitle").textContent,
    price: objeto.querySelector("#cText").textContent,
    amount: 1,
  };

  if (compraItems.hasOwnProperty(producto.id)) {
    producto.amount = compraItems[producto.id].amount + 1;
  }

  compraItems[producto.id] = { ...producto };
  pintarSegundoCarrito();
};

// --- PINTAR SEGUNDO CARRITO --- (de productos individuales)

const templateCarritoDos = document.querySelector(
  "#template-segundo-carrito"
).content;

const lista = document.querySelector("#list-items");

const pintarSegundoCarrito = () => {
  lista.innerHTML = ""; // evitamos que recarge nuevamente los productos
  Object.values(compraItems).forEach((producto) => {
    if (producto.price > 0) {
      // evitamos que muestre los productos con precio > 0
      templateCarritoDos.querySelectorAll("td")[0].textContent = producto.name;
      templateCarritoDos.querySelectorAll("td")[1].textContent = producto.amount;
      templateCarritoDos.querySelectorAll("td")[2].textContent = producto.amount * producto.price;

      const clone = templateCarritoDos.cloneNode(true);
      fragment.appendChild(clone);
    }
  });
  lista.appendChild(fragment);

  pintarCostosItems();
  segundaCompraStorage();
};

// --- Pintamos los costos del segundo carrito --

const pintarCostosItems = () => {
  const subTotal = Object.values(compraItems).reduce(
    (acc, { amount, price }) => acc + price * amount,
    0
  );

  carritoSubTotal.textContent = "$ " + subTotal;

  const iva = subTotal * 0.21;
  carritoIva.textContent = "$ " + Math.trunc(iva);

  let envio = 0;


  //OPERADOR TERNARIO

const mostrarEnvio = () =>  (total > 3000) ? true : false
  mostrarEnvio ? ("envio = 0") : ("envio = 200");

  
  const total = subTotal + iva + envio;
  carritoTotal.textContent = "$ " + total;

  mostrarEnvio();
  carritoEnvio.textContent = "$ " + envio;
};

// --- LOCALSTORAGE 2DO CARRITO ---
const segundaCompraStorage = () => {
  localStorage.setItem("productos", JSON.stringify(compraItems));
};

const segundaCompraGet = () => {
  if (localStorage.getItem("productos")) {
    compraItems = JSON.parse(localStorage.getItem("productos"));
    pintarSegundoCarrito();
  }
};

// LIBRERIA SWEET ALERT 

const btnBorrar = document.querySelector('#delete-item');
btnBorrar.addEventListener('click', () => {
  Swal.fire({
    title: '¿Está seguro de eliminar el producto?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, seguro',
    cancelButtonText: 'No, no quiero'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
      title: '¡Eliminado!',
      icon: 'success',
      text: 'El producto ha sido eliminado'
      })
    }
  })
})

const btnAceptar = document.querySelector('#btnAceptar');

btnAceptar.addEventListener('click', () => {

  Swal.fire({
  title: 'Genial!',
  text: '¡Su compra ha sido exitosa!',
  icon: 'success',
  confirmButtonText: 'Cerrar' 
  })
})


  
  













  