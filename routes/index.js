var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('127.0.0.1:27017/projecteExpress');

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
          console.log("Ya existe la partida")
        };
      });
      if (!isPartida) {
        let jugadors = [];
        let files = [1, 2, 3, 4, 5], columnes = [1, 2, 3, 4, 5];
        let taulell = new Map();
        files.forEach(fila => {
          columnes.forEach(columna => {
            taulell.set(`${fila}-${columna}`, "");
          })
        })
        taulell.set("5-1", nomJugador);
        let jugador = new Jugador(nomJugador)
        jugadors.push(jugador);
        let partida = new Partida(codiPartida, jugadors);
        partida.taulell = taulell;
        partidas2Jug.push(partida);
        console.log(partidas2Jug)
        console.log("Codi partida: ", partida.codiPartida, "Jugadors: ", partida.jugadors.map(j => { return j.nomJugador }));
        // res.render('partida2Jug', { title: 'Partida 2 jugadors', jugadors: partida.jugadors.map(j => { return j.nomJugador }), codiPartida: codiPartida })
        res.render('partida2Jug', { title: 'Partida 2 jugadors', nomJugador: nomJugador, codiPartida: codiPartida })
      }
      break;
    case "unirse":
      partidas2Jug.forEach(partida => {
        if (partida.codiPartida == codiPartida) {
          if (partida.jugadors.length < 2) {
            if (partida.jugadors[0].nomJugador != nomJugador) {
              let jugador = new Jugador(nomJugador);
              partida.taulell.set("1-5", nomJugador);
              partida.jugadors.push(jugador);
              // res.render('partida2Jug', { title: 'Partida 2 jugadors', jugadors: partida.jugadors.map(j => { return j.nomJugador }), codiPartida: codiPartida })
              console.log(partida)
              console.log("Codi partida: ", partida.codiPartida, "Jugadors: ", partida.jugadors.map(j => { return j.nomJugador }));
              res.render('partida2Jug', { title: 'Partida 2 jugadors', nomJugador: nomJugador, codiPartida: codiPartida })
            }
          } else {
            // res.render('partida2Jug', { title: 'Partida 2 jugadors', jugadors: partida.jugadors.map(j => { return j.nomJugador }), codiPartida: codiPartida })
            res.render('partida2Jug', { title: 'Partida 2 jugadors', nomJugador: nomJugador, codiPartida: codiPartida })
          }
        };
      });
      // console.log(partidas2Jug)
      //console.log(partidas2Jug[0].jugadors);
      break;
  }
});

/* LOGICA CREAR UNIRSE PARTIDA 4 JUGADORES */
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
        let files = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], columnes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        let taulell = new Map();
        files.forEach(fila => {
          columnes.forEach(columna => {
            taulell.set(`${fila}-${columna}`, "");
          })
        })
        let jugadors = [];
        let jugador = new Jugador(nomJugador)
        jugadors.push(jugador);
        let partida = new Partida(codiPartida, jugadors);
        partida.taulell = taulell;
        partidas4Jug.push(partida);
        console.log(partidas4Jug)
        console.log(partidas4Jug[0].jugadors)
        res.render('partida4Jug', { title: 'Partida 4 jugadors', jugadors: partida.jugadors.map(j => { return j.nomJugador }), codiPartida: codiPartida })
      }
      break;
    case "unirse":
      partidas4Jug.forEach(partida => {
        if (partida.codiPartida == codiPartida) {
          if (partida.jugadors.length < 4) {
            let isJugadorDintre = false;
            partida.jugadors.forEach(jugador => {
              if (jugador.nomJugador == nomJugador) isJugadorDintre = true;
            })
            if (!isJugadorDintre) {
              let jugador = new Jugador(nomJugador);
              partida.jugadors.push(jugador);
              res.render('partida4Jug', { title: 'Partida 4 jugadors', jugadors: partida.jugadors.map(j => { return j.nomJugador }), codiPartida: codiPartida })
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
  //res.send(`${codiPartida}, ${accio}`);
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
}

module.exports = router;