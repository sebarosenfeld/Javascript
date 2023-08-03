Swal.fire({
    title: 'Bienvenido a WIOR Insumos Hospitalarios',
    timer: 2000,
    showConfirmButton: false
})

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// let mostrarProductos = (productos) => {

//     let listaProductos = document.querySelector("#product-cards");

//     productos.forEach((producto) => {

//         let cardHTML = `
//         <div class="col-md-4 mb-4">
//           <div class="card">
//             <img src="${producto.imagen}" class="card-img-top" alt="Imagen del producto">
//             <div class="card-body">
//               <h5 class="card-title">${producto.descripcion}</h5>
//               <p class="card-text">Precio: $${producto.precio.toFixed(2)}</p>
//               <input type="number" class="form-control mb-2" placeholder="Cantidad" value="0" data-producto-id="${producto.id}"> <!-- Agregamos el atributo data-producto-id -->
//               <button class="btn btn-agregar-carrito" data-producto-id="${producto.id}">Agregar al carrito</button>
//             </div>
//           </div>
//         </div>
//         `;

//         listaProductos.innerHTML += cardHTML;

//         let boton = document.getElementsByClassName("btn-agregar-carrito");

//         boton.addEventListener("click", () => {
//             agregarAlCarrito(producto.id);
//         })
//     });
// }

// let mostrarProductos = (productos) => {

let listaProductos = document.querySelector("#product-cards");

for (let i = 0; i < productos.length; i++) {
    let producto = productos[i];

    let cardHTML = `
    <div class="col-md-4 mb-4">
      <div class="card">
        <img src="${producto.imagen}" class="card-img-top" alt="Imagen del producto">
        <div class="card-body">
          <h5 class="card-title">${producto.descripcion}</h5>
          <p class="card-text">Precio: $${producto.precio.toFixed(2)}</p>
          <input type="number" class="form-control mb-2" placeholder="Cantidad" value="0" data-producto-id="${producto.id}"> <!-- Agregamos el atributo data-producto-id -->
          <button class="btn btn-agregar-carrito" data-producto-id="${producto.id}">Agregar al carrito</button>
        </div>
      </div>
    </div>
    `;

    listaProductos.innerHTML += cardHTML;

    // let boton = document.getElementsByClassName("btn-agregar-carrito");

    // boton.addEventListener("click", () => {
    //     agregarAlCarrito(producto.id);
    // })
}

// let cantitdadInputs = document.querySelectorAll('input [type="number"]');


function agregarAlCarrito(id) {
    if (!carrito.some((producto) => producto.id == id)) {
        let producto = producto.find((producto) => producto.id == id);
        carrito.push(producto);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarProductos(productos)
}

