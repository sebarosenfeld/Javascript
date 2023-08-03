Swal.fire({
    title: 'Bienvenido a WIOR Insumos Hospitalarios',
    timer: 2000,
    showConfirmButton: false
})

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let productCards = document.querySelector("#product-cards");

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

    productCards.innerHTML += cardHTML;
}

let cantitdadInputs = document.querySelectorAll('input [type="number"]');

for (let i = 0; i < cantitdadInputs.length; i++) {
    let input = cantitdadInputs[i]
    input.addEventListener("input", actualizarCantidad)
}

let agregarButtons = document.getElementsByClassName("btn-agregar-carrito")

for (let i = 0; i < agregarButtons.length; i++) {
    let button = agregarButtons[i]
    button.addEventListener("click", agregarAlCarrito)
}

function actualizarCantidad(event) {
    let input = event.target
    let productoId = input.getAttribute("data-producto-id")
    let cantidad = parseInt(input.value)

    let producto = productos.find((producto) => producto.id == parseInt(productoId))
    producto.cantidad = cantidad

    localStorage.setItem("carrito", JSON.stringify(carrito))
}

function agregarAlCarrito(event) {
    let button = event.target
    let productoId = button.getAttribute("data-producto-id")
    let producto = productos.find((producto) => producto.id == parseInt(productoId))
    let productoEnCarrito = carrito.find((item) => item.id == producto.id)

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += producto.cantidad;
        Toastify({
            text: "has añadido el producto",
        }).showToast();
    } else {
        carrito.push({ ...producto })
        Toastify({
            text: "has añadido el producto",
        }).showToast();
    }

    console.log("producto agregado al carrito - ID:" + productoId)

    console.log("carrito", carrito)

    localStorage.setItem("carrito", JSON.stringify(carrito))
}