var express = require('express');
var monk = require('monk');
var db = monk('localhost:27017/projecteExpress');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/iniciarSessio', function (req, res, next) {
  const usuari = req.body.usuari;
  const contrasenya = req.body.contrasenya;

  async function login(usr, passwd) {
    let usuari = await db.collection('jugadors').findOne({ usuari: usr, contrasenya: passwd })
    if (usuari) {
      //res.send(`Usuari: ${usuari.usuari} Contrasenya: ${usuari.contrasenya}`);
      res.redirect(`/lobby?usuari=${usuari.usuari}`)
    } else {
      res.render('index', { title: "Error d'autenticació" })
    }
  }
  login(usuari, contrasenya);
});

router.post('/crearCompte', function (req, res, next) {
  const usuari = req.body.usuari;
  const contrasenya = req.body.contrasenya;
  const repContrasenya = req.body.repContrasenya;

  res.send(`Usuari: ${usuari} Contrasenya: ${contrasenya} repContrasenya: ${repContrasenya}`);
});



module.exports = router;
