import { actualizarCarrito } from "./carritoActualizado.js";
import { obtenerCarritoStorage, renderProductosCarrito } from "./compra.js";
import { productos } from "./stock.js";

document.addEventListener("DOMContentLoaded", () => {

  mostrarProductos(productos);

  if (localStorage.getItem("carrito")) {
    const carritoStorage = obtenerCarritoStorage();
    renderProductosCarrito(carritoStorage);
    actualizarCarrito(carritoStorage);
  }
})