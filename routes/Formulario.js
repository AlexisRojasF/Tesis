const { Router } = require('express');
const { check } = require('express-validator');
const {
    validarCampos,
    validarToken,
    tieneRole,
    esAdmin } = require('../middlewares');

const {
    FormulariolExistePorId,
    usuariolExistePorId } = require('../helpers/db-validator');

const {
    crearFormulario,
    borrarFormulario,
    buscarFormulario,
    buscarFormularioPorId,
    FormularioPorId
} = require('../controllers/Formulario');

const router = Router();


router.post('/nuevo', [validarToken], crearFormulario);

router.delete('/borrar/:id', [
    validarToken,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(FormulariolExistePorId),
    tieneRole("ADMIN_ROLE", "ESTUDIANTE_ROLE"),
    validarCampos], borrarFormulario);

router.get('/formularios/:id', [
    validarToken,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(usuariolExistePorId),
    tieneRole("ADMIN_ROLE", "ESTUDIANTE_ROLE"),
    validarCampos],buscarFormularioPorId
    );

router.get('/formulario/:id', [
    validarToken,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(FormulariolExistePorId),
    tieneRole("ADMIN_ROLE", "ESTUDIANTE_ROLE"),
    validarCampos],FormularioPorId
    );




router.get('/buscar', [validarToken, esAdmin], buscarFormulario);

module.exports = router;