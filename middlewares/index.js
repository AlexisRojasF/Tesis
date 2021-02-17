

const validarCampos = require('../middlewares/validar-campos');
const validarToken = require('../middlewares/Validar-Token');
const validarRoles = require('../middlewares/validar-roles');
const validarArchivo = require('../middlewares/validar-archivo');

module.exports = {
    ...validarCampos,
    ...validarToken,
    ...validarRoles,
    ...validarArchivo,
}