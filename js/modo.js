import { eliminarProductoCarrito } from "./compra.js";

const modalContenedor = document.querySelector('comprar')
const abrirCarrito = document.getElementById('demo');

abrirCarrito.addEventListener('click', () => {
    modalContenedor.classList.toggle('modal-active')
});



