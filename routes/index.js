var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/projecteExpress');

let partidas2Jug = [];
let partidas4Jug = [];
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Iniciar Sessió' });
});

router.get('/crearCompte', function (req, res, next) {
  res.render('crearCompte', { title: 'Crear Compte' });
});

/* LOGICA LOBBY */

router.get('/lobby', function (req, res, next) {
  usuari = req.query.usuari;
  arr = [
    { usr: "rahema", top1v1: 500 },
    { usr: "jubaal", top1v1: 250 }
  ]
  res.render('lobby', { title: 'Lobby', username: usuari, arr: arr });
});

/* LOGICA CREAR UNIRSE PARTIDA 2 JUGADORES */

router.post('/partida2Jug', function (req, res, next) {
  const codiPartida = req.body.codiPartida;
  const accio = req.body.accion;
  const nomJugador = req.body.nomJugador;
  switch (accio) {
    case "crear":
      let isPartida = false;
      partidas2Jug.forEach(partida => {
        if (partida.codiPartida == codiPartida) {
          isPartida = true;
          res.send("Error, ja existeix la partida");
        };
      });
      if (!isPartida) {
        let jugadors = [];
        let jugador = new Jugador(nomJugador)
        jugadors.push(jugador);
        let partida = new Partida(codiPartida, jugadors);
        partidas2Jug.push(partida);
        console.log(partidas2Jug)
        console.log(partidas2Jug[0].jugadors)
      }
      break;
    case "unirse":
      partidas2Jug.forEach(partida => {
        if (partida.codiPartida == codiPartida) {
          if (partida.jugadors.length < 2) {
            if (partida.jugadors[0].nomJugador != nomJugador) {
              let jugador = new Jugador(nomJugador);
              partida.jugadors.push(jugador);
            }
          } else {
            console.log("Error", nomJugador, "partida completa")
          }
        };
      });
      console.log(partidas2Jug)
      console.log(partidas2Jug[0].jugadors);
      break;
  }
  res.send(`${codiPartida}, ${accio}`);
});
router.post('/partida4Jug', function (req, res, next) {
  const codiPartida = req.body.codiPartida;
  const accio = req.body.accion;
  const nomJugador = req.body.nomJugador;
  switch (accio) {
    case "crear":
      let isPartida = false;
      partidas4Jug.forEach(partida => {
        if (partida.codiPartida == codiPartida) {
          isPartida = true;
          res.send("Error, ja existeix la partida");
        };
      });
      if (!isPartida) {
        let jugadors = [];
        let jugador = new Jugador(nomJugador)
        jugadors.push(jugador);
        let partida = new Partida(codiPartida, jugadors);
        partidas4Jug.push(partida);
        console.log(partidas4Jug)
        console.log(partidas4Jug[0].jugadors)
      }
      break;
    case "unirse":
      partidas4Jug.forEach(partida => {
        if (partida.codiPartida == codiPartida) {
          if (partida.jugadors.length < 4) {
            if (partida.jugadors[0].nomJugador != nomJugador) {
              let jugador = new Jugador(nomJugador);
              partida.jugadors.push(jugador);
            }
          } else {
            console.log("Error", nomJugador, "partida completa")
          }
        };
      });
      console.log(partidas4Jug)
      console.log(partidas4Jug[0].jugadors);
      break;
  }
  res.send(`${codiPartida}, ${accio}`);
});

class Partida {
  constructor(codiPartida, jugadors) {
    this.codiPartida = codiPartida;
    this.jugadors = jugadors;
  }
}

class Jugador {
  constructor(nomJugador) {
    this.nomJugador = nomJugador;
    this.puntuacio = 0;
  }
  /* get nomJugador(nombre) {
    this.nombre = nombre;
  } */
}

module.exports = router;
