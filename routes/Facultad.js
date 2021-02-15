const { Router } = require('express');
const { check } = require('express-validator');
const {
    validarCampos,
    validarToken,
    esAdmin, } = require('../middlewares');

const {
    FacultadlExistePorId } = require('../helpers/db-validator');

const { 
    crearFacultad,
    borrarFacultad,
    buscarFacultad,
    } = require('../controllers/Facultad');

const router = Router();


router.post('/nuevo', [validarToken], crearFacultad);

router.delete('/borrar/:id', [
    validarToken,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(FacultadlExistePorId),
    esAdmin,
    validarCampos], borrarFacultad);


    
router.get('/buscar', [validarToken, esAdmin], buscarFacultad);

module.exports = router;