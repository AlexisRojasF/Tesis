const { Router } = require('express');
const { check } = require('express-validator');


const {
    emailExiste,
    usuariolExistePorId } = require('../helpers/db-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {
    crearUsuario,
    actualizarUsuario,
    findUsuarios,
    borrarUsuario } = require('../controllers/Usuarios');

const router = Router();



router.post('/nuevo/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('genero', 'El genero es obligatorio').not().isEmpty(),
    check('email', 'El Email es obligatorio').isEmail(),
    check('email').custom(emailExiste),
    check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6 }),
    validarCampos
], crearUsuario)

router.put('/actalizar/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(usuariolExistePorId),
    validarCampos
], actualizarUsuario);

router.get('/usuarios/', findUsuarios);

router.delete('/borrar/',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(usuariolExistePorId),
    validarCampos
], borrarUsuario);

module.exports = router;