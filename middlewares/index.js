

const validarCampos = require('../middlewares/validar-campos');
const validarToken = require('../middlewares/Validar-Token');
const validarRoles = require('../middlewares/validar-roles');

module.exports = {
    ...validarCampos,
    ...validarToken,
    ...validarRoles,
}