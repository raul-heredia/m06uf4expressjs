var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('127.0.0.1:27017/projecteExpress');

var partidas2Jug = require('../data/Partida2JugService');
var partidas4Jug = require('../data/Partida4JugService');

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
  res.render('lobby', { title: 'Lobby', username: usuari });
});


/* LOGICA PUNTUACIONS */

router.post('/puntuacions2Jug', function (req, res, next) {
  let aPuntuacions = [];
  async function carregaPuntuacions() {
    let puntuacions = await db.collection('jugadors').find({}, {}, function (e, jugadors) {
      jugadors.forEach(jugador => {
        aPuntuacions.push(
          { nomJugador: jugador.usuari, topRecord: jugador.topPuntuacio1v1 }
        )
      })
      console.log(aPuntuacions)
      if (puntuacions) {
        //res.send(`Usuari: ${usuari.usuari} Contrasenya: ${usuari.contrasenya}`);
        res.render('puntuacions', {
          title: "Puntuacions 2 Jugadors", aPuntuacions: aPuntuacions.sort(function (a, b) {
            return b.topRecord - a.topRecord;
          })
        })
      } else {
        next(createError(404));
      }
    });
  }
  carregaPuntuacions();
});

router.post('/puntuacions4Jug', function (req, res, next) {
  let aPuntuacions = [];
  async function carregaPuntuacions() {
    let puntuacions = await db.collection('jugadors').find({}, {}, function (e, jugadors) {
      jugadors.forEach(jugador => {
        aPuntuacions.push(
          { nomJugador: jugador.usuari, topRecord: jugador.topPuntuacio4v4 }
        )
      })
      console.log(aPuntuacions)
      if (puntuacions) {
        //res.send(`Usuari: ${usuari.usuari} Contrasenya: ${usuari.contrasenya}`);
        res.render('puntuacions', {
          title: "Puntuacions 4 Jugadors", aPuntuacions: aPuntuacions.sort(function (a, b) {
            return b.topRecord - a.topRecord;
          })
        })
      } else {
        next(createError(404));
      }
    });
  }
  carregaPuntuacions();
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
        jugador.color = "azul";
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
              jugador.color = "rojo";
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
        taulell.set('10-1', nomJugador)
        let jugadors = [];
        let jugador = new Jugador(nomJugador)
        jugador.color = "azul";
        jugadors.push(jugador);
        let partida = new Partida(codiPartida, jugadors);
        partida.taulell = taulell;
        partidas4Jug.push(partida);
        console.log(partidas4Jug)
        console.log(partidas4Jug[0].jugadors)
        res.render('partida4Jug', { title: 'Partida 4 jugadors', nomJugador: nomJugador, codiPartida: codiPartida })
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
              let numeroJugador = partida.jugadors.length;
              let jugador = new Jugador(nomJugador);
              switch (numeroJugador) {
                case 1: // Si el length es 1 (Es el 2 porque no ha entrado aun)
                  partida.taulell.set('1-10', nomJugador);
                  jugador.color = "rojo";
                  break;
                case 2: // Si el length es 2 (Es el 3 porque no ha entrado aun)
                  partida.taulell.set('1-1', nomJugador);
                  jugador.color = "naranja";
                  break;
                case 3: // Si el length es 3 (Es el 4 porque no ha entrado aun)
                  partida.taulell.set('10-10', nomJugador);
                  jugador.color = "verde";
                  break;
              }
              partida.jugadors.push(jugador);
              res.render('partida4Jug', { title: 'Partida 4 jugadors', nomJugador: nomJugador, codiPartida: codiPartida })
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