//variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 60;
let tiempoRegresivo = null;
let timerInicial = 60;
let tiempoRegresivoId = null;

let winAudio = new Audio("./assets/sounds/win1.wav");
let loseAudio = new Audio("./assets/sounds/lose.wav");
let clickAudio = new Audio("./assets/sounds/click.wav");
let errorAudio = new Audio("./assets/sounds/error.wav");
let succesAudio = new Audio("./assets/sounds/succes.wav");

//elementos html
let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t-restante");

//números aleatorios
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => {
  return Math.random() - 0.5;
});
console.log(numeros);

//funciones
function contarTiempo() {
  tiempoRegresivoId = setInterval(() => {
    timer--;
    mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
    if (timer == 0) {
      clearInterval(tiempoRegresivoId);
      bloquearTarjetas();
      loseAudio.play();
      mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 🤦‍♂️`;
      mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 🤣`;
    }
  }, 1000);
}

function bloquearTarjetas() {
  for (let i = 0; i <= 15; i++) {
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = `<img src="./assets/img/${numeros[i]}.png" alt="">`;
    tarjetaBloqueada.disable = true;
  }
}

function reset() {
  window.location.reload();
}

// funcion principal
function destapar(id) {
  if (temporizador == false) {
    contarTiempo();
    temporizador = true;
  }

  tarjetasDestapadas++;

  if (tarjetasDestapadas == 1) {
    tarjeta1 = document.getElementById(id);
    primerResultado = numeros[id];
    tarjeta1.innerHTML = `<img src="./assets/img/${primerResultado}.png" alt="">`;
    clickAudio.play();
    //deshabilitar boton
    tarjeta1.disable = true;
  } else if (tarjetasDestapadas == 2) {
    tarjeta2 = document.getElementById(id);
    segundoResultado = numeros[id];
    tarjeta2.innerHTML = `<img src="./assets/img/${segundoResultado}.png" alt="">`;
    tarjeta2.disable = true;

    //aumentar movimientos
    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

    if (primerResultado == segundoResultado) {
      tarjetasDestapadas = 0;

      //aumentar aciertos
      aciertos++;
      mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
      succesAudio.play();

      if (aciertos == 8) {
        winAudio.play();
        clearInterval(tiempoRegresivoId);
        mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😁`;
        mostrarTiempo.innerHTML = `¡Felicitaciones 🎊! Tu tiempo fue de ${
          timerInicial - timer
        } segundos`;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 😎`;
      }
    } else {
      errorAudio.play();
      setTimeout(() => {
        tarjeta1.innerHTML = '<img src="assets/img/question-mark.png" />';
        tarjeta2.innerHTML = '<img src="assets/img/question-mark.png" />';
        tarjeta1.disable = false;
        tarjeta2.disable = false;
        tarjetasDestapadas = 0;
      }, 800);
    }
  }
}
