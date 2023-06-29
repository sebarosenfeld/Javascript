alert ("Hola, bienvenido a WIOR Insumos Hospitalarios");

let respuesta = ""
let nuevaOperacion = false

do {
    pregunta ()
    nuevaOperacion = confirm ("Quieres comprar otro producto?")
} while (nuevaOperacion)

function pregunta () {
    let respuesta = prompt ("Que productos deseas comprar? Pañales, equipos de oxigenoterapia, descartables")
    alert ("Has elegido " + respuesta)

    switch (respuesta) {
        case "pañales":
            return alert ("Tenemos distintos tamaños de pañales");

        case "equipos de oxigenoterapia":
            return alert ("Contamos con concentradores de oxigeno de ultima generación");

        case "descartables":
            return alert ("Disponemos de gasas, apositos, jeringas, entre otros")

        default:
            return alert ("Por favor seleccione una de las tres opciones")
    }
}

pregunta ()