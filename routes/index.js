var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/projecteExpress');

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

module.exports = router;
