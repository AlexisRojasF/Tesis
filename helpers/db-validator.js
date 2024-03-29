const { Usuario, Estudiante, Profesor, Admin,
    Role, Facultad, Programa, Formulario, Grupo, } = require('../models');



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


const FacultadlExistePorId = async (id = '') => {

    const existeFacultad = await Facultad.findById(id);

    if (!existeFacultad) {

        throw new Error(`El id: ${id} no existe`);
    }
}


const ProgramalExistePorId = async (id = '') => {

    const existePrograma = await Programa.findById(id);

    if (!existePrograma) {

        throw new Error(`El id: ${id} no existe`);
    }
}


const FormulariolExistePorId = async (id = '') => {

    const existeFormulario = await Formulario.findById(id);

    if (!existeFormulario) {

        throw new Error(`El id: ${id} no existe`);
    }
}


const GrupolExistePorId = async (id = '') => {

    const existeGrupo = await Grupo.findById(id);

    if (!existeGrupo) {

        throw new Error(`El id: ${id} no existe`);
    }
}

const validarRol = async (rol = '') => {

    const existRole = await Role.findOne({ rol });
    if (!existRole) {
        throw new Error(`El Rol: ${rol} no existe`);
    }
}

const coleccionesPermitidas = [
    'Admin',
    'Estudiante',
    'Facultad',
    'Formulario',
    'Grupo',
    'Profesor',
    'Programa',
    'Role',
    'Settings',
    'Usuario',
];

module.exports = {
    emailExiste,
    usuariolExistePorId,
    validarRol,
    EstudiantelExistePorId,
    ProfesorlExistePorId,
    AdminlExistePorId,
    FacultadlExistePorId,
    ProgramalExistePorId,
    FormulariolExistePorId,
    GrupolExistePorId,
    coleccionesPermitidas
}