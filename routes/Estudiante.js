const { Router } = require('express');
const { check } = require('express-validator');
const {
    validarCampos,
    validarToken,
    esAdmin,
    tieneRole, } = require('../middlewares');

const {
    EstudiantelExistePorId } = require('../helpers/db-validator');

const { crearEstudiante,
    actualizarEstudiante,
    borrarEstudiante, 
    buscarEstudiantes} = require('../controllers/Estudiante');



const router = Router();


router.post('/nuevo', [validarToken], crearEstudiante);

router.delete('/borrar/:id', [
    validarToken,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(EstudiantelExistePorId),
    esAdmin,
    validarCampos], borrarEstudiante);


router.put('/actulizar/:id', [
    validarToken,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(EstudiantelExistePorId),
    tieneRole('ESTUDIANTE_ROLE', 'ADMIN_ROLE'),
    validarCampos], actualizarEstudiante);


    router.get('/buscar', [validarToken,esAdmin], buscarEstudiantes);

module.exports = router;