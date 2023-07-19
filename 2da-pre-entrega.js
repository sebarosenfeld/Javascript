let productos = [
    {
      id: 1,
      nombreProducto: "Niño",
      precio: 1000,
    },
    {
      id: 2,
      nombreProducto: "Juvenil",
      precio: 1500,
    },
    {
      id: 3,
      nombreProducto: "Adulto",
      precio: 2500,
    },
    {
      id: 4,
      nombreProducto: "Adulto XG",
      precio: 3000,
    },
    
];
  
let carrito = [];

alert("Bienvenido a pañalera Wior")
  
function elegirProducto() {
    let seleccion = prompt("Ingrese el tamaño de pañal que desea comprar: (Niño, Juvenil, Adulto, Adulto XG)");
    
    producto = productos.find((p) => p.nombreProducto.toLowerCase() === seleccion.toLowerCase());
}
  
function agregarCantidad() {
    if (producto) {
      let cantidad = parseInt(prompt("Ingrese la cantidad que desea:"));
      carrito.push({
        producto: producto.nombreProducto,
        cantidad: cantidad,
        subtotal: producto.precio * cantidad
      });
    } else {
      alert("El producto seleccionado no existe. Por favor, vuelva a intentarlo.");
    }
}
  
function confirmarCarrito() {
    while (true) {
      elegirProducto();
      agregarCantidad();
  
      if (!confirm("¿Desea agregar otro producto al carrito?")) {
        break;
      }
    }
}
  
function calcularTotal() {
    console.log("Carrito de compras:");
    carrito.forEach((item) => {
        alert(`Su carrito contiene: ${item.cantidad} pañales de ${item.producto}`)
        console.log(`- ${item.cantidad} ${item.producto}: ${item.subtotal}`);
    });
  
    let total = carrito.reduce((sum, item) => sum + item.subtotal, 0);
    alert(`Total a pagar: ${total}`)
    console.log(`Total a pagar: ${total}`);
}
  
function vaciarCarrito() {
    carrito = [];
    console.log("El carrito ha sido vaciado.");
}
  
confirmarCarrito();

if (carrito.length > 0) {
    if (confirm("¿Desea vaciar el carrito?")) {
      vaciarCarrito();
    }
}

calcularTotal();
  