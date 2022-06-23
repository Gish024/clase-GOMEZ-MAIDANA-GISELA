//FILTRADO DE PRODUCTOS Y PROCESO DE COMPRA
//Clase para construir productos

class Producto {
    constructor (nombre, precio, stock){
        this.nombre= nombre;
        this.precio= Number(precio);
        this.stock= stock;
    }
    actualizarStock(x){
        this.stock= this.stock - x;
    }
}

const arrayProductos = [];
arrayProductos.push(new Producto ("medallones de garbanzos", 600, 50));
arrayProductos.push(new Producto ("medallones de arroz yamaní y espinaca", 600, 50));
arrayProductos.push(new Producto ("medallones de lenteja", 600, 50));
arrayProductos.push(new Producto ("tarta de choclo", 800, 50));
arrayProductos.push(new Producto ("tarta de espinaca", 800, 50));
arrayProductos.push(new Producto ("albóndigas de lenteja", 500, 50));
arrayProductos.push(new Producto ("prepizza de zanahoria", 400, 50));
arrayProductos.push(new Producto ("panqueques de espinaca", 300, 0));

//FUNCIONES PARA ORDENAR UNA LISTA

const mostrarListaOrdenada = () => {
    let array = [];
    arrayProductos.forEach(producto => array.push(producto.nombre+" $"+producto.precio));
    alert("Lista de precios:"+"\n"+array.join("\n"))
}

//FUNCIONES PARA EL PROCESO DE COMPRA
let total = 0;

const agregarProductoAlCarrito = () => {
    let otroProducto;
    let producto = "";
    let cantidad = 0;
    let precio = 0;

//Ciclo para sumar productos al carrito

    do {
        producto = prompt ("¿Querés comprar medallones de garbanzos, medallones de arroz yamaní y espinaca, medallones de lenteja y zanahoria, tarta de choclo, tarta de espinaca, albóndigas de lenteja, prepizza de zanahoria o panqueques de espinaca?"); 
        cantidad = parseInt(prompt ("¿Cuántos querés comprar?"));
        console.log(cantidad)

        switch (producto) {
            case arrayProductos[0].nombre:
                arrayProductos[0].actualizarStock(cantidad);
                if (arrayProductos[0].stock < 0 || isNaN(cantidad)){
                    alert("Lo sentimos. En este momento no tenemos stock")
                    arrayProductos[0].stock=arrayProductos[0].stock+cantidad;
                     precio = 0;
                    cantidad = 0;
                }else{
                    precio= arrayProductos[0].precio;
                }
                break;
            case arrayProductos[1].nombre:
                arrayProductos[1].actualizarStock(cantidad);
                if (arrayProductos[1].stock<0 || isNaN(cantidad)){
                    alert("Lo sentimos. En este momento no tenemos stock")
                    arrayProductos[1].stock=arrayProductos[1].stock+cantidad;
                    precio = 0;
                    cantidad = 0;
                }else{
                    precio= arrayProductos[1].precio;
                }
                break;
            case arrayProductos[2].nombre:
                arrayProductos[2].actualizarStock(cantidad);
                if (arrayProductos[2].stock<0 || isNaN(cantidad)){
                    alert("Lo sentimos. En este momento no tenemos stock")
                    arrayProductos[2].stock=arrayProductos[2].stock+cantidad;
                    precio = 0;
                    cantidad = 0;
                }else{
                    precio= arrayProductos[2].precio;
                }
                break;
            case arrayProductos[3].nombre:
                arrayProductos[3].actualizarStock(cantidad);
                if (arrayProductos[3].stock<0 || isNaN(cantidad)){
                    alert("Lo sentimos. En este momento no tenemos stock")
                    arrayProductos[3].stock=arrayProductos[3].stock+cantidad;
                    precio = 0;
                    cantidad = 0;
                }else{
                    precio= arrayProductos[3].precio;
                }
                break;
            case arrayProductos[4].nombre:
                arrayProductos[4].actualizarStock(cantidad);
                if (arrayProductos[4].stock<0 || isNaN(cantidad)){
                    alert("Lo sentimos. En este momento no tenemos stock")
                    arrayProductos[4].stock=arrayProductos[4].stock+cantidad;
                    precio = 0;
                    cantidad = 0;
                }else{
                    precio= arrayProductos[4].precio;
                }
                break;
            case arrayProductos[5].nombre:
                arrayProductos[5].actualizarStock(cantidad);
                if (arrayProductos[5].stock<0 || isNaN(cantidad)){
                    alert("Lo sentimos. En este momento no tenemos stock")
                    arrayProductos[5].stock=arrayProductos[5].stock+cantidad;
                    precio = 0;
                    cantidad = 0;
                }else{
                    precio= arrayProductos[5].precio;
                }
                break;
            case arrayProductos[6].nombre:
                arrayProductos[6].actualizarStock(cantidad);
                if (arrayProductos[6].stock<0 || isNaN(cantidad)){
                    alert("Lo sentimos. En este momento no tenemos stock")
                    arrayProductos[6].stock=arrayProductos[6].stock+cantidad;
                    precio = 0;
                    cantidad = 0;
                }else{
                    precio= arrayProductos[6].precio;
                }
                break;
            case arrayProductos[7].nombre:
                arrayProductos[7].actualizarStock(cantidad);
                if (arrayProductos[7].stock<0 || isNaN(cantidad)){
                    alert("Lo sentimos. En este momento no tenemos stock")
                    arrayProductos[7].stock=arrayProductos[7].stock+cantidad;
                    precio = 0;
                    cantidad = 0;
                }else{
                    precio= arrayProductos[7].precio;
                }
                break;
            default:
                alert("Alguno de los datos ingresados es incorrecto");
                precio= 0;
                cantidad= 0;
        }
        total = total + precio*cantidad;
        otroProducto = confirm("¿Querés agregar otro producto?");
    } while (otroProducto);
}

//Función para calcular el descuento
const obtenerDescuento = (total) => {
    if (total>=3000){
        total = total*0.80;
        alert("Tenés 20% de descuento")
    }
    return total;
}

//Función para calcular el envío
const obtenerPrecioDeEnvio = (total) => {
    let confirmacion = confirm("¿Querés envio a domicilio?");
    if (confirmacion && total>=3000){
        alert("Tenés envío gratis. El total de tu compra es $"+total);
    }else if (confirmacion && total<3000 && total!=0){
        total=total+400;
        alert("El envío cuesta $400. El total de tu compra asciende a $"+total);
    }else{
        alert("El total de tu compra es $"+total);
    }
    return total;
}

//Calculo la cantidad de cuotas
let cuotas = 0;
const obtenerCantidadDeCuotas = () => {

    let confirmacion = confirm("¿Querés pagar en cuotas?");
    if(confirmacion) {
        cuotas=  parseInt(prompt("¿En cuántas cuotas querés pagar?"));
        if (cuotas==0){
            cuotas=1;
        }else if (isNaN(cuotas)){
            obtenerCantidadDeCuotas();
        }
    }else {
        cuotas= 1;
    }
    return cuotas;
}

//Calculo los intereses de las cuotas
const obtenerIntereses = (cuotas) => {
    if (cuotas==1){
        return 0;
    }else{
        let tasa = 12.3+ cuotas*0.2;
        return tasa*cuotas;
    }
}

//Calculo el total de carrito
const obtenerTotal = (total, cuotas, intereses) => {
    total = (total+intereses)
    let valorCuota= total/cuotas;
    alert ("El total a pagar es $"+total+" en "+cuotas+" cuotas de $"+Math.ceil(valorCuota));
}

//LLAMADO A LAS FUNCIONES
const comprarProductos = () => {
    agregarProductoAlCarrito();
    obtenerTotal (obtenerPrecioDeEnvio(obtenerDescuento(total)), obtenerCantidadDeCuotas(), obtenerIntereses(cuotas));
}

comprarProductos();
