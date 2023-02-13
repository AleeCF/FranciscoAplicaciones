const boton = document.getElementById('btnEmpezar');
const tablaclas = document.getElementById('Tabla');
const verde = document.getElementById('verde');
const amarillo = document.getElementById('amarillo');
const azul = document.getElementById('azul');
const rojo = document.getElementById('rojo');
const blanco = document.getElementById('blanco');
var simon = document.getElementById("simon");
var texto = document.getElementById("texto");
let nombre;
simon.style.display = "none";

const colores = {
	verde,
	amarillo,
	azul,
	rojo,
	blanco
}

colores.verde.addEventListener('click', elegirColor);
colores.amarillo.addEventListener('click', elegirColor);
colores.rojo.addEventListener('click', elegirColor);
colores.azul.addEventListener('click', elegirColor);
colores.blanco.addEventListener('click', elegirColor);

//Aqui se controla el sonido y la velocidad a la que ira el juego, si la velocidad no esta dentro del rango se volvera a pedir que se introduzca
// un valor valido.
document.getElementById("Reproducir").style.display = "none";
velocidad = prompt("Por favor ingresa la velocidad del juego deseada: entre 500 y 1000");

while (velocidad < 500 || velocidad > 1000) {
	alert("El valor introducido no esta entre 500 y 1000). Por favor, introduce un valor correcto");
	velocidad = prompt("Por favor ingresa la velocidad del juego deseada: entre 500 y 1000");
}

//Se declaran las variables que se van a usar en el juego.

let contador = 0;
let secuencia = [];
let nivel = 0;
let subnivel = 0;
const ultimo = 5;
const espera = velocidad.value;
const esperaMedia = 1500;
const eliminarColor = 350;
const numColores = 5;
let jugadores = [];


// Se prepara el juego con la funcioon Iniciar.
function iniciar() {

	texto.style.display = "none";
	let nombres = [];
	nombre = prompt("Por favor ingresa tu nombre: ");
	nombres.push(nombre);
	localStorage.setItem("nombres", JSON.stringify(nombres));


	for (i = 0; i < jugadores.length; i++) {
		if (jugadores[i] == null) {
			localStorage.setItem("nombre", nombre);
		} else {
			i++
		}
	}
	simon.style.display = 'block';

	//Aqui añadimos la musica que se reproducira cuando pulsemos el boton de comenzar.
	let botonReproducir = document.getElementById("Reproducir");
	let miMusica = document.getElementById("Musica");
	Musica.play();

	secuencia = new Array(ultimo);
	secuencia = secuencia.fill(0);
	secuencia = secuencia.map(n => Math.floor(Math.random() * numColores));
	nivel = 0;
	subnivel = 0;

	// Aqui se muestran los botones de cmenzar y Clasificacion.
	boton.classList.add('hide');
	tablaclas.style.display = 'block';

	// mostramos la primer secuencia del luego
	iluminarSecuencia();
}

// prepara el final del juego
function terminarJuego() {
	localStorage.setItem("contador", contador);
	Musica.pause();
	tablaclas.style.display = 'block';
	boton.classList.remove('hide');
	nivel = -1;
}

function iluminarSecuencia() {
	for (let i = 0; i <= nivel; i++) {
		const color = transformarNumeroAColor(secuencia[i]);
		setTimeout(() => iluminarColor(color), espera * i);
	}
}

function iluminarColor(color) {
	colores[color].classList.add('light');
	setTimeout(() => apagarColor(color), eliminarColor);
}

function apagarColor(color) {
	colores[color].classList.remove('light');
}

function transformarNumeroAColor(numero) {
	switch (numero) {
		case 0: return 'rojo';
		case 1: return 'verde';
		case 2: return 'amarillo';
		case 3: return 'azul';
		case 4: return 'blanco';
	}
}

// al hacer clic en un botón, evalúa si la secuencia es correcta, si el boton pulsado es correcto, avanzara de nivel y sumara 1 al contador, aumentando 
// la puntuacion por cada acierto.
function elegirColor(ev) {
	if (nivel === -1) return;

	const nombreColor = ev.target.dataset.color;
	const numeroColor = transformarColorANumero(nombreColor);
	iluminarColor(nombreColor);

	if (numeroColor === secuencia[subnivel]) {
		contador++;
		subnivel++;
		if (subnivel > nivel) {
			nivel++;
			if (nivel === ultimo) {
				alert("Has terminado el juego!, tu puntacion es: " + contador);

				terminarJuego();
			}
			else {
				subnivel = 0;
				setTimeout(iluminarSecuencia, esperaMedia);
			}
		}
	}
	else {
		alert("tu puntacion es: " + contador);
		terminarJuego();

	}

	let puntuaciones = [];
	puntuaciones.push(contador);
	localStorage.setItem("puntuaciones", JSON.stringify(puntuaciones));


}

function transformarColorANumero(color) {
	switch (color) {
		case 'rojo': return 0;
		case 'verde': return 1;
		case 'amarillo': return 2;
		case 'azul': return 3;
		case 'blanco': return 4;
	}
}


function clasificacion() {

	let LocalNombres = JSON.parse(localStorage.getItem("nombres"));
	let LocalPuntuaciones = JSON.parse(localStorage.getItem("puntuaciones"));

	table = document.createElement("table");
	table.style.width = "50%";
	simon.style.display = "none";

	let headerRow = table.insertRow();
	let headerCell1 = headerRow.insertCell();
	let headerCell2 = headerRow.insertCell();

	headerCell1.innerHTML = "Nombre";
	headerCell2.innerHTML = "Puntuación";

	for (let i = 0; i < LocalNombres.length; i++) {
		for (let j = 0; j < LocalPuntuaciones.length; j++) {

			let row = table.insertRow();
			let cell1 = row.insertCell();
			let cell2 = row.insertCell();

			cell1.innerHTML = LocalNombres[i];
			cell2.innerHTML = LocalPuntuaciones[j];

		}
	}


	document.body.appendChild(table);
};
