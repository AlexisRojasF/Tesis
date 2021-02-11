
const Usuario = require("../models/Usuario");


const emailExiste = async (email = '') => {

    const emailExist = await Usuario.findOne({ email });

    if (emailExist) {

        throw new Error(`El correo: ${email} ya esta registrado`);
    }
}
const usuariolExistePorId = async (id = '') => {

    const existeUsuario = await Usuario.findOne({ id });

    if (!existeUsuario) {

        throw new Error(`El id: ${id} no existe`);
    }
}

module.exports = {
    emailExiste,
    usuariolExistePorId
}