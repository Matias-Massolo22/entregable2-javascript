/*Funcion constructora*/ 
class Botin {
    constructor(id, nombre, precio){
    
    this.id=id;
    this.nombre=nombre;
    this.precio=precio;
}
    //Mostrar Botin
    mostrarBotin (){
        return `Id: ${this.id}, Nombre: ${this.nombre}, Precio: ${this.precio}`;
    }
}

const botinesNike = [
    new Botin("NLunGatSb", "Nike Lunar Gato SB II", 125000),
    new Botin("NStrGat", "Nike Street Gato", 113000),
    new Botin("NTieLeg8", "Nike Tiempo Legend 8", 100000)
];

const botinesAdidas = [
    new Botin("ACopMun1", "Adidas Copa Mundial", 155000),
    new Botin("AMessF50", "Adidas Messi F50", 137000),
    new Botin("ACopMun2", "Adidas Copa Mundial", 150000)
];

const botinesJoma = [
    new Botin("JDribling", "Joma Dribling", 76000),
    new Botin("JLiga5", "Joma Liga 5", 95000),
    new Botin("JTopFl", "Joma Top Flex", 105000)
];



const todosLosProductos = [...botinesNike, ...botinesAdidas, ...botinesJoma];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function actualizarPantalla() {
    const displayCantProductos = document.getElementById('cant-productos');
    const displayCantItems = document.getElementById('cant-items');
    const displayMontoTotal = document.getElementById('monto-total');
    const totalDinero = carrito.reduce((acc, p) => acc + p.precio, 0);
    displayCantProductos.innerText = carrito.length;
    displayCantItems.innerText = carrito.length;
    displayMontoTotal.innerText = `$${totalDinero.toLocaleString()}`;
}

// Función para agregar productos
function agregarAlCarrito(producto) {
    carrito.push(producto);
    
    // Guardamos en LocalStorage (esto cumple con el requisito de la entrega)
    localStorage.setItem("carrito", JSON.stringify(carrito));
    
    // Refrescamos la pantalla
    actualizarPantalla();
}


// Escuchamos los clics en los botones de "Agregar al carrito"
document.addEventListener("click", (e) => {
    // Si el elemento clickeado tiene la clase 'btn-agregar'
    if (e.target.classList.contains("btn-agregar")) {
        const idBoton = e.target.id;
        
        const productoEncontrado = todosLosProductos.find(p => p.id === idBoton);

        if (productoEncontrado) {
            agregarAlCarrito(productoEncontrado);
        }
    }
});

actualizarPantalla();




function renderizarProductos(lista, idContenedor) {
    const contenedor = document.getElementById(idContenedor);
    
    contenedor.innerHTML = "";

    // Se Recorremos la lista de botines
    lista.forEach(botin => {
        
        const article = document.createElement("article");
        
        article.innerHTML = `
            <img src="/imagenes/${botin.id}.png" alt="${botin.nombre}">
            <p>${botin.nombre}</p>
            <p>$${botin.precio.toLocaleString()}</p>
            <button type="button" class="btn-agregar" id="${botin.id}">Agregar al carrito</button>
        `;
        
        contenedor.appendChild(article);
    });
}

// Llamar la funcion de cada marca
renderizarProductos(botinesNike, "contenedor-nike");
renderizarProductos(botinesAdidas, "contenedor-adidas");
renderizarProductos(botinesJoma, "contenedor-joma");