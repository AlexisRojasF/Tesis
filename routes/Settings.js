const { Router } = require('express');
const { check } = require('express-validator');
const {
    validarToken,
    esAdmin } = require('../middlewares');

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