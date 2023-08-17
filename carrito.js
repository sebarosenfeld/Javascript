// sweet alert para dar la bienvenida a la pagina
Swal.fire({
    title: 'Bienvenido a WIOR Insumos Hospitalarios',
    timer: 1500,
    showConfirmButton: false
})

// Iniciamos la variable carrito con el contenido de localStorage. Si no hay nada, lo iniciamos como un array vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Traigo el array desde el JSON
function getProductos () {
	return fetch('./productos.json') .then ((response) => response.json())
}

// FUNCION BUSCADOR
function buscarInfo(buscado, array) {
	// Recorro el array
    let busqueda = array.filter(
        (producto) => producto.nombreProducto.toLowerCase().includes(buscado.toLowerCase())
    )
	// Establezco la variable
	let coincidencia = document.getElementById("coincidencia")
	// Si no encuentra lo que el cliente busca, devuelve "no hay coincidencias". Si lo encuentra, devuelve el producto
    if (busqueda.length == 0) {
        coincidencia.innerHTML = ""
        let nuevoDiv = document.createElement("div")
        nuevoDiv.innerHTML = `<p> No hay coincidencias</p>`
        coincidencia.appendChild(nuevoDiv)
        mostrarProductos(array)
    } else {
        coincidencia.innerHTML = ""
        mostrarProductos(busqueda)
    }
}

// FUNCION ORDENAR DE MAYOR A MENOR
function ordenarMayorMenor(array) {
    let mayorMenor = [].concat(array)
    mayorMenor.sort((a, b) => (b.precio - a.precio))
    mostrarProductos(mayorMenor)
}

// FUNCION ORDENAR DE MENOR A MAYOR

function ordenarMenorMayor(array) {
    let menorMayor = [].concat(array)
    menorMayor.sort((a, b) => (a.precio - b.precio))
    mostrarProductos(menorMayor)
}

// MOSTRAR LOS PRODUCTOS
const mostrarProductos = (productos) => {
	// Capturo el contenedor donde voy a renderizar los productos
	const contenedorProductos = document.querySelector("#product-cards");
	// Limpio el contenedor por si había algo anteriormente
	contenedorProductos.innerHTML = "";
	// Recorro el array y por cada uno creo una card para mostrar en pantalla
	productos.forEach((producto) => {
		const li = document.createElement("li");
		li.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombreProducto}"/>
    <h3>${producto.nombreProducto}</h3>
    <p class="product-description">${producto.descripcion}</p>
    <p class="product-price">$${producto.precio}</p>
    <button id="agregar-${producto.id}" class="add-to-cart">Agregar al carrito</button>`;
		// Agrego la card al contenedor
		contenedorProductos.appendChild(li);
		// Ahora la card está en el DOM. El botón ya existe, por lo tanto lo capturo
		const boton = document.getElementById(`agregar-${producto.id}`);
		// Agrego evento al botón capturado.
		boton.addEventListener("click", () => {
			// Si hacemos clic en el botón, se agrega al carrito
			agregarAlCarrito(productos, producto.id);
		});
	});
};

// AGREGAR AL CARRITO
const agregarAlCarrito = (productos, id) => {
	// Si el producto no está en el carrito, lo agregamos
	if (!carrito.some((producto) => producto.id === id)) {
		// Buscamos el producto en el array de productos
		const producto = productos.find((producto) => producto.id === id);
		// Agregamos un nuevo objeto con el contenido del producto y un campo cantidad en 1
		carrito.push({ ...producto, cantidad: 1 });
		// Con la toastify le mostramos al usuario que el producto elegido se añadio correctamente 
		Toastify({
			text: "has añadido el producto",
			duration: 1000,
	   	}).showToast();
	} else {
		// Si el producto está en el carrito, lo buscamos y le incrementamos las unidades
		const producto = carrito.find((producto) => producto.id === id);
		producto.cantidad++;
		// Con la toastify le mostramos al usuario que el producto elegido se añadio correctamente 
		Toastify({
			text: "has añadido el producto",
			duration: 1000,
	  	}).showToast();
	}
	// Guardamos el carrito en el localStorage para tenerlo actualizado si recargamos la página porque hicimos cambios
	localStorage.setItem("carrito", JSON.stringify(carrito));
	// Actualizamos la vista del carrito porque hemos hecho cambios
	mostrarCarrito();
};

// FUNCION MOSTRAR CARRITO
const mostrarCarrito = () => {
	// Capturo el contenedor donde voy a renderizar los productos
	let modalBody = document.getElementById ("modal-body")
	// Limpio el contenedor por si había algo anteriormente
	modalBody.innerHTML = "";
	// Sólo agregaremos un contenedor con productos si el carrito no está vacío
	if (carrito.length > 0) {
		// Creo el contenedor donde colocaré los productos y lo agrego al DOM
		const productsCart = document.createElement("ul");
		productsCart.classList.add("productsCart");
		modalBody.appendChild(productsCart);
		// Creo el contenedor donde colocaré el total, lo calculo y lo agrego al DOM
		const contenedorTotal = document.createElement("p");
		contenedorTotal.classList.add("total")
		actualizarTotal(contenedorTotal);
		modalBody.appendChild(contenedorTotal);
		// Recorro el array y por cada uno creo una card para mostrar en pantalla
		carrito.forEach((producto) => {
			const li = document.createElement("li");
			li.innerHTML = `
			<img src="${producto.imagen}" alt="${producto.nombreProducto}" />
			<div class="productContent">
				<h3>${producto.nombreProducto}</h3>
				<p class="product-description">${producto.descripcion}</p>
				<p class="product-price">$${producto.precio}</p>
				<div class="counter">
				<button id="decrementar-${producto.id}" class="button">-</button>
				<span class="product-price">${producto.cantidad}u.</span>
				<button id="incrementar-${producto.id}" class="button">+</button>
				</div>
			</div>
			<button id="eliminar-${producto.id}" class="remove">Eliminar</button>
		`;
			// Agrego la card al contenedor
			productsCart.appendChild(li);
			// Ahora la card está en el DOM. El botón ya existe, por lo tanto lo capturo
			const boton = document.getElementById(`eliminar-${producto.id}`);
			// Agrego evento al botón capturado.
			boton.addEventListener("click", () => {
				// Si hacemos clic en el botón, se elimina del carrito
				eliminarProducto(producto.id);
			});

			// Capturo el botón decrementar y le agrego un evento.
			const decrementar = document.getElementById(`decrementar-${producto.id}`);
			decrementar.addEventListener("click", () => {
				decrementarProducto(producto.id);
			});

			// Capturo el botón incrementar y le agrego un evento.
			const incrementar = document.getElementById(`incrementar-${producto.id}`);
			incrementar.addEventListener("click", () => {
				incrementarProducto(producto.id);
			});
		});
	} else {
		// Si el carrito está vacío, muestro un texto
		modalBody.innerHTML = '<p class="empty">No hay productos</p>';
	}
};

// DECREMENTAR PRODUCTO
const decrementarProducto = (id) => {
	const producto = carrito.find((producto) => producto.id === id);
	// Si es 1, hay que eliminarlo porque no podemos tener cantidad cero
	if (producto.cantidad === 1) {
		eliminarProducto(producto.id);
	} else {
		producto.cantidad--;
		// Guardamos el carrito en el localStorage para tenerlo actualizado si recargamos la página porque hicimos cambios
		localStorage.setItem("carrito", JSON.stringify(carrito));
		// Actualizamos la vista del carrito porque hemos hecho cambios
		mostrarCarrito();
	}
};

// INCREMENTAR PRODUCTO
const incrementarProducto = (id) => {
	const producto = carrito.find((producto) => producto.id === id);
	producto.cantidad++;
	// Guardamos el carrito en el localStorage para tenerlo actualizado si recargamos la página porque hicimos cambios
	localStorage.setItem("carrito", JSON.stringify(carrito));
	// Actualizamos la vista del carrito porque hemos hecho cambios
	mostrarCarrito();
};

// ELIMINAR PRODUCTO
const eliminarProducto = (id) => {
	// Genero un nuevo carrito con todos los productos menos el que hemos seleccionado
	carrito = carrito.filter((producto) => producto.id !== id);
	// Guardamos el carrito en el localStorage para tenerlo actualizado si recargamos la página porque hicimos cambios
	localStorage.setItem("carrito", JSON.stringify(carrito));
	// Actualizamos la vista del carrito porque hemos hecho cambios
	mostrarCarrito();
};

// ACTUALIZAR PRODUCTO
const actualizarTotal = (contenedor) => {
	// Calculo el total 
	const total = carrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0);
	// Muestro el total
	contenedor.textContent = `Total: $${total}`;
};

getProductos ().then (productos => {
	mostrarProductos(productos)
	buscador.addEventListener("input", () => {
		buscarInfo(buscador.value, productos)
	})
	mostrarCarrito(productos)
	let selectOrden = document.getElementById ("selectOrden")
	selectOrden.addEventListener("change", () => {
    	if (selectOrden.value == 1) {
        ordenarMayorMenor(productos)
    	}
		else if (selectOrden.value == 2) {
        ordenarMenorMayor(productos)
    	} else {
		mostrarCarrito(productos)
		}
	})
})