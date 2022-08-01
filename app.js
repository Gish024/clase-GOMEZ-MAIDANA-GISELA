// Declaracion de variables

const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carrito = {}

// Eventos
// LocalStorage

document.addEventListener('DOMContentLoaded', e => {
    fetchData()
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
});

cards.addEventListener('click', e => { addCarrito(e) });

items.addEventListener('click', e => { btnAccion(e) });


// Traemos los productos

const fetchData = async () => {
    const res = await fetch('api.json');
    const data = await res.json()

    pintarCards(data)    
}


// Pintamos los productos

const pintarCards = data => {
    data.forEach(item => {
        if (item.precio > 0) {
            templateCard.querySelector('h5').textContent = item.name
            templateCard.querySelector('p').textContent = item.precio
            templateCard.querySelector('img').setAttribute("src", item.img)
            templateCard.querySelector('button').dataset.id = item.id

            const clone = templateCard.cloneNode(true)
            fragment.appendChild(clone)
        }
    }) 
    cards.appendChild(fragment)   
}


// Agregamos al carrito

const addCarrito = e => {    
    if(e.target.classList.contains('btn-dark')) {
        //console.log(e.target.dataset.id)
        //console.log(e.target.parentElement)
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = item => {
    //console.log(item)
    const producto = {
        id: item.querySelector('button').dataset.id,
        name: item.querySelector('h5').textContent,
        precio: item.querySelector('p').textContent,
        cantidad: 1
    }
    //console.log(producto)
    if(carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }
    carrito[producto.id]= {...producto}

    pintarCarrito();

    // Toastyfy

    if (producto.precio > 0) {
       Toastify({
           text: `Añadiste: ${producto.name} Cantidad: ${producto.precio}`,
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

const pintarCarrito = () => {
    //console.log(carrito)
    items.innerHTML = ''

    Object.values(carrito).forEach(producto => {
        if (producto.precio > 0) {
            templateCarrito.querySelector('th').textContent = producto.id
            templateCarrito.querySelectorAll('td')[0].textContent = producto.name
            templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
            templateCarrito.querySelector('.btn-info').dataset.id = producto.id
            templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
            templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio

            const clone = templateCarrito.cloneNode(true)
            fragment.appendChild(clone)
        }
    })
    items.appendChild(fragment)

    pintarFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const pintarFooter = () => {
    footer.innerHTML = ''

    if(Object.keys(carrito).length === 0) {
        footer.innerHTML = '<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>'
        
        return    
    }

// Sumamos cantidad y total

    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad,0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio,0)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

// Eliminar productos del carrito 

const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {     

    // SWEET ALERT: delete all
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

    carrito = {}
        pintarCarrito()
        localStorage.clear();
        location.reload();
    })
};


const btnAccion = e => {
    //console.log(e.target)

    //Accion de aumentar

    if (e.target.classList.contains('btn-info')) {
        //console.log(carrito[e.target.dataset.id])        

        const producto = carrito[e.target.dataset.id]        
        producto.cantidad++
        carrito[e.target.dataset.id] = {...producto}
        pintarCarrito()
    }
    
    //Accion para disminuir

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]        
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        }else {
            carrito[e.target.dataset.id] = {...producto}
        }
        pintarCarrito()
    }
    e.stopPropagation()
}


// FINALIZAR COMPRA CON SWEET ALERT

const finish = document.querySelector("#finish-buy");

/*finish.addEventListener("click", () => {
    if (!localStorage.getItem("costo") && !localStorage.getItem("costosItems")) {
        Swal.fire({
        text: "No has agregado productos a tu carrito de compras",
        confirmButtonColor: "#ffb320",
        color: "#fff",
        confirmButtonText: "Continuar",
        imageUrl: "./resources/logo.png",
        imageAlt: "logo Puro Sabor",
        imageWidth: 150,
        imageHeight: 80,
        background: "#1f2225",
        });
    }
    if (localStorage.getItem("costo") || localStorage.getItem("costosItems")) {
        window.location.href = "../index.html";
    }
});*/

