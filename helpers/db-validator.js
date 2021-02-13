
const Usuario = require("../models/Usuario");
const Estudiante = require("../models/Estudiante");
const Profesor = require("../models/Profesor");
const Admin = require("../models/Admin");
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
const EstudiantelExistePorId = async (id = '') => {

    const existeEstudiante = await Estudiante.findById(id);

    if (!existeEstudiante) {

        throw new Error(`El id: ${id} no existe`);
    }
}
const ProfesorlExistePorId = async (id = '') => {

    const existeProfesor = await Profesor.findById(id);

    if (!existeProfesor) {

        throw new Error(`El id: ${id} no existe`);
    }
}
const AdminlExistePorId = async (id = '') => {

    const existeAdmin = await Admin.findById(id);

    if (!existeAdmin) {

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
    validarRol,
    EstudiantelExistePorId,
    ProfesorlExistePorId,
    AdminlExistePorId
}