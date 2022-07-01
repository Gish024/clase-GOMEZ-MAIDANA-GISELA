
// SALUDO

let saludo = document.getElementById("saludar");

const saludoCliente = prompt("¡Bienvenido a nuestra tienda online! Ingrese por favor su nombre: ");

saludo.innerText = '¡Hola ' +saludoCliente+ ' selecciona los productos que quieres comprar!';

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


  // -- localStorage -- 

  const primerCompraGet = () => {
    if (localStorage.getItem("compra")) {
      compra = JSON.parse(localStorage.getItem("compra"));
      pinCarr();
    }
  };

   // --- PINTAR CARRITO ---
  
  const carrito = document.querySelector("#carrito").content;
  const fragmento = document.createDocumentFragment();
  
  const listaProductos = document.querySelector(".list-products"); 
  
  // - Donde se pintaran nuestros costos

  const carrSubTotal = document.querySelector(".carrito-subTotal");
  const carrEnvio = document.querySelector(".carrito-envio");
  const carrIva = document.querySelector(".carrito-iva");
  const carrTotal = document.querySelector(".carrito-total");
  
  const pinCarr = () => {

    listaProductos.innerHTML = ""; 
    Object.values(compra).forEach((producto) => {
      if (producto.price > 0) {
        
        carrito.querySelectorAll("h5")[0].textContent = producto.name;
        carrito.querySelectorAll("p")[1].textContent = producto.amount;
        carrito.querySelectorAll("a")[2].textContent = producto.amount * producto.price;
  
        const clone = carrito.cloneNode(true);
        fragmento.appendChild(clone);
      }
    });

    listaProductos.appendChild(fragmento);
  
    pinCostos();
  };
  
  // --- Costos ---

  const pinCostos = () => {
    const subTotal = Object.values(compra).reduce(
      (acc, { amount, price }) => acc + price * amount,
      0
    );
  
    carrSubTotal.textContent = "$ " + subTotal;
  
    const iva = subTotal * 0.21;
    carrIva.textContent = "$ " + Math.trunc(iva);
  
    let envio = 0;
  
    const mostrarEnvio = () => {
      if (total > 3000) {
        envio = 0;
      } else {
        envio = 200;
      }
    };
  
    const total = subTotal + iva + envio;
    carrTotal.textContent = "$ " + total;
  
    mostrarEnvio();
    carrEnvio.textContent = "$ " + envio;
  };
  
   
  const cards = document.querySelector("#carrito div");
  
  // PINTAR CARDS 
  
  function showProducts(array) {
  array.forEach((el) => {
    if (el.precio > 0) {
      carrito.querySelector(".card-title").textContent = el.name;
      carrito.querySelector(".card-text").textContent = el.precio;    
      carrito.querySelector(".btn-compra").dataset.id = el.id;
      const clone = carrito.cloneNode(true);
      fragmento.appendChild(clone);
    }
  });
  cards.appendChild(fragmento);
}
  
  //--- SELECCION DE PRODUCTOS ---
  
  let compraItems = {};
  
  // --- AGREGAR AL CARRITO ---
  cards.addEventListener("click", (e) => {
    addCarrito(e);
  });
  
  const addCarrito = (e) => {
    if (e.target.classList.contains("btn-compra")) {
      setCarrito(e.target.parentElement);
    }
  
    e.stopPropagation();
  };
  
  const setCarrito = (objeto) => {
    const producto = {
      id: objeto.querySelector(".btn-compra").dataset.id,
      name: objeto.querySelector(".card-title").textContent,
      price: objeto.querySelector(".card-text").textContent,
      amount: 1,
    };
  
    if (compraItems.hasOwnProperty(producto.id)) {
      producto.amount = compraItems[producto.id].amount + 1;
    }
  
    compraItems[producto.id] = { ...producto };
    pintaCarro();
  };

  const carritoDos = document.querySelector(".card").content;  
  const lista = document.querySelector(".list-product");


  
  function pintaCarro() {
  lista.innerHTML = "";
  Object.values(compraItems).forEach((producto) => {
    if (producto.price > 0) {
      
      carritoDos.querySelectorAll("h5")[0].textContent = producto.name;
      carritoDos.querySelectorAll("p")[1].textContent = producto.amount;
      carritoDos.querySelectorAll("a")[2].textContent = producto.amount * producto.price;

      const clone = carritoDos.cloneNode(true);
      fragmento.appendChild(clone);
    }
  });
  lista.appendChild(fragmento);

  pinItems();
  segundaCompra();
}
  
  // --- Pintamos los costos del segundo carrito --
  
  const pinItems = () => {
    const subTotal = Object.values(compraItems).reduce(
      (acc, { amount, price }) => acc + price * amount,
      0
    );
  
    carritoSubTotal.textContent = "$ " + subTotal;
  
    const iva = subTotal * 0.21;
    carritoIva.textContent = "$ " + Math.trunc(iva);
  
    let envio = 0;
  
    const mostrarEnvio = () => {
      if (total > 3000) {
        envio = 0;
      } else {
        envio = 200;
      }
    };
    const total = subTotal + iva + envio;
    carritoTotal.textContent = "$ " + total;
  
    mostrarEnvio();
    carritoEnvio.textContent = "$ " + envio;
  };
  
  // LOCALSTORAGE
  const segundaCompra = () => {
    localStorage.setItem("productos", JSON.stringify(compraItems));
  };
  
  const segundaCompraGet = () => {
    if (localStorage.getItem("productos")) {
      compraItems = JSON.parse(localStorage.getItem("productos"));
      pintaCarro();
    }
  };


  
  













  