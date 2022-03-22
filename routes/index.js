var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Iniciar Sessió' });
});

router.get('/crearCompte', function(req, res, next) {
  res.render('crearCompte', { title: 'Crear Compte' });
});


module.exports = router;
