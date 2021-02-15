const { Router } = require('express');
const { check } = require('express-validator');
const {
    validarCampos,
    validarToken,
    esAdmin,
    tieneRole, } = require('../middlewares');

const {
    ProfesorlExistePorId } = require('../helpers/db-validator');

const { 
    crearProfesor,
    actualizarProfesor,
    borrarProfesor,
    buscarProfesors, 
    eliminarAsigntura,
    agregarAsigntura} = require('../controllers/Profesor');

const router = Router();


router.post('/nuevo', [validarToken], crearProfesor);

router.delete('/borrar/:id', [
    validarToken,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(ProfesorlExistePorId),
    esAdmin,
    validarCampos], borrarProfesor);


router.put('/actulizar/:id', [
    validarToken,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(ProfesorlExistePorId),
    tieneRole('Profesor_ROLE', 'ADMIN_ROLE'),
    validarCampos], actualizarProfesor);

router.put('/asignatura/delete/:id', [
    validarToken,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(ProfesorlExistePorId),
    tieneRole('PROFESOR_ROLE', 'ADMIN_ROLE'),
    validarCampos], eliminarAsigntura);

router.put('/asignatura/add/:id', [
    validarToken,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(ProfesorlExistePorId),
    tieneRole('PROFESOR_ROLE', 'ADMIN_ROLE'),
    validarCampos], agregarAsigntura);


router.get('/buscar', [validarToken, esAdmin], buscarProfesors);

module.exports = router;