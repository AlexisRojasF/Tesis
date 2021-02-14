const { Router } = require('express');
const { check } = require('express-validator');
const {
    validarCampos,
    validarToken,
    tieneRole,
    esAdmin } = require('../middlewares');

const {
    SettingslExistePorId } = require('../helpers/db-validator');

const {
    crearSettings, 
    habilitarFormularios,

} = require('../controllers/Settings');



const router = Router();


router.post('/nuevo', [validarToken,esAdmin], crearSettings);

router.put('/formularios/', [
    validarToken,
    esAdmin,], habilitarFormularios);






module.exports = router;