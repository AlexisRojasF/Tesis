const { Router } = require('express');
const { check } = require('express-validator');
const {
    validarCampos,
    validarToken,
    tieneRole,
    esAdmin } = require('../middlewares');

const { 
    GrupolExistePorId,
    EstudiantelExistePorId } = require('../helpers/db-validator');

const {
    crearGrupo,
    borrarGrupo,
    buscargrupos,
    agregarEstudianteGrupo,
    agregarEstudianteSolicitudes,
    aceptarSolicitudes

} = require('../controllers/Grupo');

const router = Router();


router.post('/nuevo', [validarToken, tieneRole("PROFESOR_ROLE")], crearGrupo);

router.delete('/borrar/:id', [
    validarToken,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(GrupolExistePorId),
    tieneRole("ADMIN_ROLE", "PROFESOR_ROLE"),
    validarCampos], borrarGrupo);

router.put('/agrergar/:id', [
    validarToken,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(GrupolExistePorId),
    check('estudiante_id', 'No es un ID valido').isMongoId(),
    check('estudiante_id').custom(EstudiantelExistePorId),
    tieneRole('PROFESOR_ROLE', 'ADMIN_ROLE'),
    validarCampos], agregarEstudianteGrupo);

router.put('/solicitud/:id', [
    validarToken,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(GrupolExistePorId),
    check('estudiante', 'No es un ID valido').isMongoId(),
    check('estudiante').custom(EstudiantelExistePorId),
    tieneRole('PROFESOR_ROLE', 'ADMIN_ROLE'),
    validarCampos], agregarEstudianteSolicitudes,
);
router.put('/aceptar/:id', [
    validarToken,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(GrupolExistePorId),
    check('estudiante_id', 'No es un ID valido').isMongoId(),
    check('estudiante_id').custom(EstudiantelExistePorId),
    tieneRole('PROFESOR_ROLE', 'ADMIN_ROLE'),
    validarCampos], aceptarSolicitudes,
);




router.get('/buscar', [validarToken, esAdmin], buscargrupos);

module.exports = router;