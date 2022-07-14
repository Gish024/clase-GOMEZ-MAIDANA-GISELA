
// SALUDO

let saludo = document.getElementById("saludar");

const saludoCliente = prompt("¡Bienvenido a nuestra tienda online! Ingrese por favor su nombre: ");

saludo.innerText = '¡Hola  ' +saludoCliente+ '!'+ ' Seleccioná los productos que querés comprar:';

console.log( saludo.innerText ) 

// Importamos los productos desde el json

import { pedirProduct } from "./data.js";
const jsonProducts = await pedirProduct();

// Filtramos array
const setArray = () => {
  const newArr = [];
  jsonProducts.forEach((e) => {
    for (let i = 0; i < e.length; i++) {
      newArr.push(e[i]);
    }
  });

  return newArr;
};

// Limpiamos los productos duplicados

const filtrarDuplicados = (arr) => {
  const productoDuplicado = arr.map((array) => {
    return [array.name, array];
  });

  return [...new Map(productoDuplicado).values()];
};

// Seteamos los dos array que usaremos

const array = filtrarDuplicados(setArray());
let newArray = array;

// DOMcontentload

document.addEventListener("DOMContentLoaded", () => {});

// -- LocalStorage -- traemos el carrito del localStorage
let compra = {};
const compraGet = () => {
  if (localStorage.getItem("compra")) {
    compra = JSON.parse(localStorage.getItem("compra"));
    pintarCarrito();
  }
};

// PINTAMOS CARRITO

// - Templates carrito -
const templateCarrito = document.querySelector("#template-carrito").content;
const fragment = document.createDocumentFragment();

const listProducts = document.querySelector("#list-product");

const pintarCarrito = () => {
  listProducts.innerHTML = ""; // evitamos que recarge nuevamente los productos
  Object.values(compra).forEach((producto) => {
    if (producto.price > 0) {
      // evitamos que muestre los productos con precio > 0
      templateCarrito.querySelectorAll("td")[0].textContent = producto.name;
      templateCarrito.querySelectorAll("td")[1].textContent = producto.amount;
      templateCarrito.querySelectorAll("td")[2].textContent =
        producto.amount * producto.price;

      const clone = templateCarrito.cloneNode(true);
      fragment.appendChild(clone);
    }
  });
  listProducts.appendChild(fragment);

  setCostosItems();
};

// - template cards -
const template = document.querySelector("#template").content;
const cards = document.querySelector("#items");

//--- PINTAR CARDS ---

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

// -- Eliminar cards 
function removeCards() {
  let cards = document.querySelectorAll(".card");

  for (let i = 0; i < cards.length; i++) {
    document.querySelector(".card").remove();
  }
}
showProduct(newArray);

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

  // Toastyfy
  if (producto.price > 0) {
    Toastify({
      text: `Añadiste: ${producto.name}
    Cantidad: ${producto.amount}`,
      duration: 2500,
      gravity: "bottom",
      position: "left",
      className: "toasty",
      style: {
        backgroundImage: "url(../img/pattern.png)",
        color: "#ffffff",
      },
    }).showToast();
  }
};

// --- PINTAR SEGUNDO CARRITO --- (de productos individuales)

const templateCarritoDos = document.querySelector(
  "#template-segundo-carrito"
).content;

const list = document.querySelector("#list-items");

const pintarSegundoCarrito = () => {
  list.innerHTML = ""; // evitamos que recarge nuevamente los productos
  Object.values(compraItems).forEach((producto) => {
    if (producto.price > 0) {
      // evitamos que muestre los productos con precio > 0
      templateCarritoDos.querySelectorAll("td")[0].textContent = producto.name;
      templateCarritoDos.querySelectorAll("td")[1].textContent =
        producto.amount;
      templateCarritoDos.querySelectorAll("td")[2].textContent =
        producto.amount * producto.price;
      templateCarritoDos.querySelector(".fa-trash").dataset.id = producto.id;

      const clone = templateCarritoDos.cloneNode(true);
      fragment.appendChild(clone);
    }
  });
  list.appendChild(fragment);

  segundaCompraStorage();
  setCostosItems();
  costosItemStorage();
  pintarCostos();
};

// --- Pintamos los costos del segundo carrito --

let costosItems = {
  total: 0,
  subTotal: 0,
  iva: 0,
  envio: 0,
};

let costosPc = {
  total: 0,
  subTotal: 0,
  iva: 0,
  envio: 0,
};

// --- Enviamos los costos al local storage ---
const setCostosItems = () => {
  let subTotalPc = Object.values(compraItems).reduce(
    (acc, { amount, price }) => acc + price * amount,
    0
  );

  let ivaPc = subTotalPc * 0.21;

  let envioPc = 0;

  const mostrarEnvio = () => {
    if (totalPc > 140000) {
      envioPc = 0;
    } else {
      envioPc = 800;
    }
  };

  let totalPc = subTotalPc + ivaPc + envioPc;

  mostrarEnvio();
  costosItems.total = totalPc;
  costosItems.subTotal = subTotalPc;
  costosItems.iva = ivaPc;
  costosItems.envio = envioPc;
  contar();
};

// -- storage de costos por items --
const costosItemStorage = () => {
  localStorage.setItem("costosItems", JSON.stringify(costosItems));
  costosItemGet();
  contar();
};

const costosItemGet = () => {
  if (localStorage.getItem("costosItems")) {
    costosItems = JSON.parse(localStorage.getItem("costosItems"));
    pintarCostos();
  }
};

// -- recuperamos los costos de arma tu pc --
const costosArmarPcStorageGet = () => {
  if (localStorage.getItem("costos pc")) {
    costosPc = JSON.parse(localStorage.getItem("costos pc"));
    pintarCostos();
    contar();
  }
};

// --- PINTAR COSTOS EN CARRITO ---

// - Donde se pintaran nuestros costos
const carritoSubTotal = document.querySelector(".carrito-subTotal");
const carritoEnvio = document.querySelector(".carrito-envio");
const carritoIva = document.querySelector(".carrito-iva");
const carritoTotal = document.querySelector(".carrito-total");

const pintarCostos = () => {
  if (costosPc.subTotal > 0 && costosItems.subTotal <= 0) {
    carritoSubTotal.textContent = "$ " + costosPc.subTotal;
    carritoIva.textContent = "$ " + Math.trunc(costosPc.iva);
    carritoTotal.textContent = "$ " + costosPc.total;
    carritoEnvio.textContent = "$ " + costosPc.envio;
  } else if (costosItems.subTotal > 0 && costosPc.subTotal <= 0) {
    carritoSubTotal.textContent = "$ " + costosItems.subTotal;
    carritoIva.textContent = "$ " + Math.trunc(costosItems.iva);
    carritoTotal.textContent = "$ " + costosItems.total;
    carritoEnvio.textContent = "$ " + costosItems.envio;
  } else if (costosPc.subTotal > 0 && costosItems.subTotal > 0) {
    let costosTotal = {
      total: 0,
      subTotal: 0,
      envio: 0,
      iva: 0,
    };

    costosTotal.total = costosPc.total + costosItems.total;
    costosTotal.subTotal = costosPc.subTotal + costosItems.subTotal;
    costosTotal.iva = costosPc.iva + costosItems.iva;
    if (costosTotal.total > 140000) {
      costosTotal.envio = 0;
    } else {
      costosTotal.envio = 800;
    }
    carritoSubTotal.textContent = "$ " + costosTotal.subTotal;
    carritoIva.textContent = "$ " + Math.trunc(costosTotal.iva);
    carritoTotal.textContent = "$ " + costosTotal.total;
    carritoEnvio.textContent = "$ " + costosTotal.envio;
  } else {
    carritoSubTotal.textContent = "$ " + costosPc.subTotal;
    carritoIva.textContent = "$ " + Math.trunc(costosPc.iva);
    carritoTotal.textContent = "$ " + costosPc.total;
    carritoEnvio.textContent = "$ " + costosPc.envio;
  }
};

// --- LOCALSTORAGE 2DO CARRITO ("PRODUCTOS")---
const segundaCompraStorage = () => {
  localStorage.setItem("productos", JSON.stringify(compraItems));
};

const segundaCompraGet = () => {
  if (localStorage.getItem("productos")) {
    compraItems = JSON.parse(localStorage.getItem("productos"));
    pintarSegundoCarrito();
  }
};

// --- Eliminar productos del carrito ---

const deleteAllBtn = document.querySelector("#delete-all");
const deleteAll = () => {
  localStorage.clear();
  location.reload();
};

// --- SWEET ALERT: delete all---

deleteAllBtn.addEventListener("click", () => {
  Swal.fire({
    title: "¿Esta seguro de vaciar el carrito?",
    text: "¡No podrás revertir esto!",
    color: "#fff",
    imageUrl: "../resources/logo.png",
    imageWidth: 150,
    imageHeight: 80,
    imageAlt: "logo Puro Sabor",
    showCancelButton: true,
    confirmButtonColor: "#ffb320",
    cancelButtonColor: "#ff205f",
    confirmButtonText: "Si, Vaciar",
    cancelButtonText: "Cancelar",
    background: "#1f2225",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteAll();
    }
  });
});

list.addEventListener("click", (e) => {
  deleteItem(e);
});

const deleteItem = (e) => {
  e.target;

  if (e.target.classList.contains("fa-trash")) {
    const producto = compraItems[e.target.dataset.id];
    producto.amount--;

    if (producto.amount === 0) {
      delete compraItems[e.target.dataset.id];
    }
    segundaCompraStorage();
    pintarSegundoCarrito();
  }
  contar();
  e.stopPropagation();
};

// --- BTN: FINALIZAR COMPRA (sweet alert)---

const finish = document.querySelector("#finish-buy");

finish.addEventListener("click", () => {
  if (
    !localStorage.getItem("costos pc") &&
    !localStorage.getItem("costosItems")
  ) {
    Swal.fire({
      text: "No has agregado productos a tu carro de compras",
      confirmButtonColor: "#ffb320",
      color: "#fff",
      confirmButtonText: "Continuar",
      imageUrl: "../img/logo.png",
      imageAlt: "HYPE LOGO",
      imageWidth: 150,
      imageHeight: 80,
      background: "#1f2225",
    });
  }
  if (
    localStorage.getItem("costos pc") ||
    localStorage.getItem("costosItems")
  ) {
    window.location.href = "../pages/compra.html";
  }
});

// --- pintar contador en carrito ---

export const contar = () => {
  const contador = document.querySelector("#contador");
  let cuenta = 0;

  for (let i in compraItems) {
    cuenta += compraItems[i].amount;
  }
  for (let i in compra) {
    cuenta += compra[i].amount;
  }

  contador.textContent = cuenta;
};

btnTop.addEventListener("click", topFunction);

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

contar();
segundaCompraGet();
compraGet();











  
  /*OPERADOR LOGICO OR
  
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

/*const btnBorrar = document.getElementById("delete-item");
console.log(btnBorrar)


/*
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
})*/




  
  













  