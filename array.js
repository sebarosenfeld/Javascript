let productos = [
    {
        id: 1,
        nombreProducto: "Niño",
        descripcion: "Tamaño de 0 a 5kg",
        precio: 1000,
        imagen: "./assets/imagen-pañal-niño.webp"
    },

    {
        id: 2,
        nombreProducto: "Juvenil - chico",
        descripcion: "Tamaño de 5 a 10kg",
        precio: 1500,
        imagen: "./assets/imagen-pañal-juvenil-chico.webp"
    },

    {
        id: 3,
        nombreProducto: "Juvenil - mediano",
        descripcion: "Tamaño de 10 a 20kg",
        precio: 1500,
        imagen: "./assets/imagen-pañal-juvenil-mediano.webp"
    },

    {
        id: 4,
        nombreProducto: "Adulto",
        descripcion: "Tamaño de 20 a 50kg",
        precio: 2500,
        imagen: "./assets/imagen-pañal-adulto-grande.webp"
    },

    {
        id: 5,
        nombreProducto: "Adulto XG",
        descripcion: "Tamaño de 50 a 100kg",
        precio: 3000,
        imagen: "./assets/imagen-pañal-adulto-extra-grande.webp"
    }

];

let carrito = [];

// if (localStorage.getItem("carrito")) {
//     carrito = JSON.parse(localStorage.getItem("carrito"))
// } else {
//     carrito.push ({...producto})
//     localStorage.setItem("carrito", JSON.stringify(carrito))
// }