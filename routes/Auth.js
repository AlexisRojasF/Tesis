const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/Auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login',[
    check('email', 'El Email es obligatorio').isEmail(),
    check('password', 'El password es obligatoria ').not().isEmpty(),
    validarCampos
],login );

module.exports = router