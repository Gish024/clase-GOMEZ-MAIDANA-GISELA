//Desafio entregable N° 1//


// Algoritmo con condicional

let nombreUsuario = prompt("Ingrese nombre de usuario");
if (nombreUsuario == "") {
 alert("Debe ingresar un nombre de usuario");
}
else {
 alert("¡Bienvenido/a " + nombreUsuario+" a la tienda online de Puro Sabor!");
}



// Algoritmo utilizando un ciclo

let numeroDeId = 0;
do{
 numeroDeId = prompt("Registre número de ID");
 alert("Su número de ID a sido registrado correctamente"); 
 }while(parseInt(numeroDeId));
alert("Ingrese un número de ID válido");




// Simulador interactivo
class Pedido {
    constructor(producto,cantidad,precio) {
        this.producto = producto,
        this.cantidad = cantidad,
        this.precio = precio,
        this.descuento = 0,
        this.subTotal = 0,
        this.total = 0
    }

    calcularSubTotal () {
        this.subTotal = this.precio * this.cantidad;
    }

    calcularDescuento() {
        if (this.subTotal >= 3000) {
            this.descuento = 500;
        } else {
            this.descuento = 0;
        }
    }

    calcularIva() {
        return this.subTotal * 0.21;
    }

    calcularTotal() {
        this.total = (this.subTotal + this.calcularIva()) - this.descuento;
    }
}

const compra = () => {
    let producto = 0;
    let cantidad = 0;
    let precio = 0;

    while ( producto == 0 || producto > 14 || !producto) {
        producto = parseInt(prompt("Ingrese el producto que desea comprar:\n 1: Medallones de arroz yamaní con espinaca ($500)\n 2: Medallones de arroz yamaní con acelga ($500)\n 3: Medallones de arroz yamaní con remolacha ($500)\n 4: Medallones de lentejas y zanahoria ($500)\n 5: Medallones de garbanzo y zapallo ($500)\n 6: Prepizza de zanahoria ($200)\n 7: Prepizza de brócoli ($200)\n 8: Prepizza de coliflor ($200)\n 9: Canelones de espinaca ($600)\n 10: Canelones de choclo ($600)\n 11: Albóndigas de lentejas ($600)\n 12: Albóndigas de garbanzos ($600)\n 13: Tarta de choclo ($250)\n 14: Tarta de espinaca ($250)"))
    }

    switch(producto) {
        case 1:
            producto = "Medallones de arroz yamaní con espinaca";
            precio = 500;
            break;
        case 2:
            producto = "Medallones de arroz yamaní con acelga";
            precio = 500;
            break;
        case 3:
            producto = "Medallones de arroz yamaní con remolacha";
            precio = 500;
            break;
        case 4:
            producto = "Medallones de lentejas y zanahoria";
            precio = 500;
            break;
        case 5:
            producto = "Medallones de garbanzo y zapallo";
            precio = 500;
            break;
        case 6:
            producto = "Prepizza de zanahoria";
            precio = 200;
            break;
        case 7:
            producto = "Prepizza de brócoli";
            precio = 200;
            break;
        case 8:
            producto = "Prepizza de coliflor";
            precio = 200;
            break;
        case 9:
            producto = "Canelones de espinaca";
            precio = 600;
            break;
        case 10:
            producto = "Canelones de choclo";
            precio = 600;
            break;
        case 11:
            producto = "Albóndigas de lentejas";
            precio = 600;
            break;
        case 12:
            producto = "Albóndigas de garbanzos";
            precio = 600;
            break;
        case 13:
            producto = "Tarta de choclo";
            precio = 250;
            break;
        case 14:
            producto = "Tarta de espinaca";
            precio = 250;
            break;             
    }

    while ( cantidad == 0 || !cantidad) {
        cantidad = parseInt(prompt("Producto seleccionado: "+ producto + "\n Indique la cantidad deseada"));
    }   
    
    const compra = new Pedido(producto, cantidad, precio);
    
    return compra;
};

const pedido = compra();

pedido.calcularSubTotal();
pedido.calcularDescuento();
pedido.calcularTotal();

console.log(pedido);

alert("Compra realizada con éxito: \n\n"+
    "- "+pedido.producto+ " x "+pedido.cantidad+ ": $"+pedido.precio * pedido.cantidad +"\n"+
    "- IVA 21%: $"+pedido.calcularIva()+"\n" +
    "- Descuento por compra al por mayor: $"+pedido.descuento+ "\n\n" +
    "- Total a abonar: $"+pedido.total 
    );



















