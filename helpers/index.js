
const dbValidators = require('./db-validator');
const generarJWT = require('./jwt');
const googleVerify = require('./google-verify');
const subirArchivo = require('./subir-archivo');



module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo,
}