const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSingIn } = require('../controllers/Auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.post('/login',[
    check('email', 'El Email es obligatorio').isEmail(),
    check('password', 'El password es obligatoria ').not().isEmpty(),
    validarCampos
],login );

router.post('/google',[
    check('id_token', 'El password es obligatoria ').not().isEmpty(),
    validarCampos
],googleSingIn );

module.exports = router