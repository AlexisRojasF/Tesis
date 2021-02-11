const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarToken,
    esAdmin,
    tieneRole, } = require('../middlewares')

const {
    emailExiste,
    usuariolExistePorId,
    validarRol } = require('../helpers/db-validator');
    
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
    check('rol').custom(validarRol),
    check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6 }),
    validarCampos
], crearUsuario)

router.put('/actalizar/:id', [
    validarToken,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(usuariolExistePorId),
    validarCampos
], actualizarUsuario);

router.get('/usuarios/', validarToken, findUsuarios);

router.delete('/borrar/:id', [
    validarToken,
    tieneRole('ESTUDIANTE_ROLE', ''),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(usuariolExistePorId),
    validarCampos
], borrarUsuario);

module.exports = router;