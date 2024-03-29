window.onload = main;

function main() {
    document.getElementById('1-6').classList.add("rojo");
    document.getElementById('6-1').classList.add("azul");

    const taula = document.getElementById('taula');
    var socket = io();
    var celdaClickada;
    const numeroPartida = document.getElementById('codiPartida').innerHTML;
    const usuari = document.getElementById('nomJugador').innerHTML;
    const partidaAcabada = document.getElementById('partidaAcabada');
    const guanyador = document.getElementById('guanyador');
    const segon = document.getElementById('segon');
    const tornarEnrere = document.getElementById('tornarEnrere');

    taula.addEventListener('click', (ev) => {
        celdaClickada = ev.target.id;
        console.log(celdaClickada);
        socket.emit('celda2Jug', {
            numeroPartida: numeroPartida, celdaClickada: celdaClickada, jugador: usuari
        });
    });
    // Lo que recibe del otro
    socket.on('celdaMoviment2Jug', function (data) {
        console.log(data)
        console.log('CLIENT -> dades rebudes del servidor->' + data.celda);
        if (data.codiPartida == numeroPartida) document.getElementById(data.celda).classList.add(data.color);
    });

    socket.on('partidaAcabada2Jug', function (data) {
        if (data.codiPartida == numeroPartida) {
            console.log("Acabada", data)
            jugadors = data.jugadors.sort(function (a, b) {
                return b.puntuacio - a.puntuacio;
            })

            let jugador1NouRecord = jugadors[0].nouRecord ? "<b>Nou Record!</b>" : "";
            let jugador2NouRecord = jugadors[1].nouRecord ? "<b>Nou Record!</b>" : "";

            console.log('Partida acabada');
            partidaAcabada.innerHTML = "Partida Acabada";
            guanyador.innerHTML = `<b>Guanyador:</b> ${jugadors[0].nomJugador}  <b>Puntuació:</b> ${jugadors[0].puntuacio} ${jugador1NouRecord}`;
            segon.innerHTML = `<b>Posició 2:</b> ${jugadors[1].nomJugador}  <b>Puntuació:</b> ${jugadors[1].puntuacio} ${jugador2NouRecord}`;
            tornarEnrere.classList.remove("hidden");
        }
    })


}