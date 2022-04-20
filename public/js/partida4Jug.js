window.onload = main;

function main() {
    document.getElementById('1-10').classList.add("rojo");
    document.getElementById('1-1').classList.add("naranja");
    document.getElementById('10-1').classList.add("azul");
    document.getElementById('10-10').classList.add("verde");

    const taula = document.getElementById('taula');
    var socket = io();
    var celdaClickada;
    const numeroPartida = document.getElementById('codiPartida').innerHTML;
    const usuari = document.getElementById('nomJugador').innerHTML;
    taula.addEventListener('click', (ev) => {
        celdaClickada = ev.target.id;
        console.log(celdaClickada);
        socket.emit('celda4Jug', {
            numeroPartida: numeroPartida, celdaClickada: celdaClickada, jugador: usuari
        });
    });
    // Lo que recibe del otro
    socket.on('celdaMoviment4Jug', function (data) {
        console.log(data)
        console.log('CLIENT -> dades rebudes del servidor->' + data.celda);
        if (data.codiPartida == numeroPartida) document.getElementById(data.celda).classList.add(data.color);
    });
}