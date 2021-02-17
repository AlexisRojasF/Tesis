const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivos, actulizarAvatar, mostrarAvatar, actulizarAvatarCloudinary} = require('../controllers/Uploads');
const { usuariolExistePorId } = require('../helpers');
const { validarCampos, validarToken ,validarArchivo } = require('../middlewares');

const router = Router();


router.post('/', [validarToken, validarArchivo], cargarArchivos);

router.put('/:id', [
    validarToken,
    validarArchivo,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(usuariolExistePorId),
    validarCampos], actulizarAvatarCloudinary);


router.get('/:id', [
    validarToken,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(usuariolExistePorId),
    validarCampos], mostrarAvatar);

module.exports = router