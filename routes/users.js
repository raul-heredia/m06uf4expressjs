var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/iniciarSessio', function (req, res, next) {
  const usuari = req.body.usuari;
  const contrasenya = req.body.contrasenya;

  res.send(`Usuari: ${usuari} Contrasenya: ${contrasenya}`);
});

router.post('/crearCompte', function (req, res, next) {
  const usuari = req.body.usuari;
  const contrasenya = req.body.contrasenya;
  const repContrasenya = req.body.repContrasenya;

  res.send(`Usuari: ${usuari} Contrasenya: ${contrasenya} repContrasenya: ${repContrasenya}`);
});



module.exports = router;
