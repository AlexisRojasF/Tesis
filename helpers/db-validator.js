
const Usuario = require("../models/Usuario");
const Role = require("../models/Role");


const emailExiste = async (email = '') => {

    const emailExist = await Usuario.findOne({ email });

    if (emailExist) {

        throw new Error(`El correo: ${email} ya esta registrado`);
    }
}
const usuariolExistePorId = async (id = '') => {

    const existeUsuario = await Usuario.findById(id);

    if (!existeUsuario) {

        throw new Error(`El id: ${id} no existe`);
    }
}

const validarRol = async (rol = '') => {

    const existRole = await Role.findOne({ rol });
    if (!existRole) {
        throw new Error(`El Rol: ${rol} no existe`);
    }
}

module.exports = {
    emailExiste,
    usuariolExistePorId,
    validarRol
}