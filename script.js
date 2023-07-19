alert ("Hola, bienvenido a WIOR Insumos Hospitalarios");

let respuesta = ""
let nuevaOperacion = false

do {
    pregunta ()
    nuevaOperacion = confirm ("Quieres comprar otro producto?")
    if (nuevaOperacion) {
        pregunta ()
        confirm ("Quieres comprar otro producto?")
    }
} while (nuevaOperacion)

function pregunta () {
    respuesta = prompt ("Que productos deseas comprar? Pañales, equipos de oxigenoterapia, descartables")
    alert ("Has elegido " + respuesta.toLowerCase ())

    switch (respuesta.toLowerCase ()) {
        case "pañales":
        alert ("Tenemos distintos tamaños de pañales")
        break;

        case "equipos de oxigenoterapia":
        alert ("Contamos con concentradores de oxigeno de ultima generación")
        break;

        case "descartables":
        alert ("Disponemos de gasas, apositos, jeringas, entre otros")
        break;

        default:
        alert ("Por favor seleccione una de las tres opciones")
        break;
    }
}