const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSingIn, renovarJWT} = require('../controllers/Auth');
const { validarCampos, validarToken } = require('../middlewares/');

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

router.get('/', validarToken, renovarJWT )

module.exports = router