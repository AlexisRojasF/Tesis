const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivos, actulizarAvatar} = require('../controllers/Uploads');
const { usuariolExistePorId } = require('../helpers');
const { validarCampos, validarToken ,validarArchivo } = require('../middlewares');

const router = Router();


router.post('/', [validarToken, validarArchivo], cargarArchivos);

router.put('/:id', [
    validarToken,
    validarArchivo,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(usuariolExistePorId),
    validarCampos], actulizarAvatar);

module.exports = router