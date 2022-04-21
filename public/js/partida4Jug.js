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
    const guanyador = document.getElementById('guanyador');
    const segon = document.getElementById('segon');
    const tercer = document.getElementById('tercer');
    const quart = document.getElementById('quart');
    const tornarEnrere = document.getElementById('tornarEnrere');

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
    socket.on('partidaAcabada4Jug', function (data) {
        if (data.codiPartida == numeroPartida) {
            console.log("Acabada", data)
            jugadors = data.jugadors.sort(function (a, b) {
                return b.puntuacio - a.puntuacio;
            })

            let jugador1NouRecord = jugadors[0].nouRecord ? "<b>Nou Record!</b>" : "";
            let jugador2NouRecord = jugadors[1].nouRecord ? "<b>Nou Record!</b>" : "";
            let jugador3NouRecord = jugadors[2].nouRecord ? "<b>Nou Record!</b>" : "";
            let jugador4NouRecord = jugadors[3].nouRecord ? "<b>Nou Record!</b>" : "";

            console.log('Partida acabada');
            partidaAcabada.innerHTML = "Partida Acabada";
            guanyador.innerHTML = `<b>Guanyador:</b> ${jugadors[0].nomJugador}  <b>Puntuació:</b> ${jugadors[0].puntuacio} ${jugador1NouRecord}`;
            segon.innerHTML = `<b>Posició 2:</b> ${jugadors[1].nomJugador}  <b>Puntuació:</b> ${jugadors[1].puntuacio} ${jugador2NouRecord}`;
            tercer.innerHTML = `<b>Posició 3:</b> ${jugadors[2].nomJugador}  <b>Puntuació:</b> ${jugadors[2].puntuacio} ${jugador3NouRecord}`;
            quart.innerHTML = `<b>Posició 4:</b> ${jugadors[3].nomJugador}  <b>Puntuació:</b> ${jugadors[3].puntuacio} ${jugador4NouRecord}`;
            tornarEnrere.classList.remove("hidden");
        }
    })
}