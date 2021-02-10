const { Router} = require('express');
const { usuarioGet } = require('../controllers/Usuarios');

const router = Router();



router.get('/', usuarioGet)




module.exports = router;