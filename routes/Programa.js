const { Router } = require('express');
const { check } = require('express-validator');
const {
    validarCampos,
    validarToken,
    esAdmin,
    tieneRole, } = require('../middlewares');

const {
    FacultadlExistePorId,
    ProgramalExistePorId } = require('../helpers/db-validator');

const {
    crearPrograma,
    actualizarPrograma,
    borrarPrograma,
    buscarPrograma
} = require('../controllers/Programa');



const router = Router();


router.post('/nuevo', [
    validarToken,
    check('facultadID', 'No es un facultadID valido').isMongoId(),
    check('facultadID').custom(FacultadlExistePorId),
    esAdmin,
    validarCampos], crearPrograma);

router.delete('/borrar/:id', [
    validarToken,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(ProgramalExistePorId),
    check('facultadID', 'No es un ID valido').isMongoId(),
    check('facultadID').custom(FacultadlExistePorId),
    esAdmin,
    validarCampos], borrarPrograma);


router.put('/actulizar/:id', [
    validarToken,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(ProgramalExistePorId),
    tieneRole('Facultad_ROLE', 'ADMIN_ROLE'),
    validarCampos], actualizarPrograma);




router.get('/buscar', [validarToken, esAdmin], buscarPrograma);

module.exports = router;