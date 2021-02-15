const { Router } = require('express');
const { check } = require('express-validator');
const {
    validarCampos,
    validarToken,
    esAdmin, } = require('../middlewares');

const {
    AdminlExistePorId } = require('../helpers/db-validator');

const { 
    crearAdmin,
    actualizarAdmin,
    borrarAdmin,
    buscarAdmin, } = require('../controllers/Admin');
    
const router = Router();


router.post('/nuevo', [validarToken], crearAdmin);

router.delete('/borrar/:id', [
    validarToken,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(AdminlExistePorId),
    esAdmin,
    validarCampos], borrarAdmin);


router.put('/actulizar/:id', [
    validarToken,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(AdminlExistePorId),
    esAdmin,
    validarCampos], actualizarAdmin);


router.get('/buscar', [validarToken, esAdmin], buscarAdmin);

module.exports = router;