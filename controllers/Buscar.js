const { response, request } = require('express');
const { coleccionesPermitidas } = require('../helpers/db-validator');
const { ObjectId } = require('mongoose').Types;
const { Usuario, Estudiante, Profesor, Admin,
    Facultad, Programa, Formulario, Grupo, } = require('../models');



//busqueda de usuarios
const buscarUsuarios = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {

        const usuario = await Usuario.findById(termino);

        return res.json({
            results: (usuario) ? [usuario] : []
        })

    }


    const regex = new RegExp(termino, 'i');

    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { email: regex }],
        $and: [{ estado: true }]
    })

    res.status(500).json({
        results: usuarios
    })

}


//busqueda de falcultab
const buscarFacultad = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {

        const facultad = await Facultad.find({
            $or: [{ programa_id: termino }, { _id: termino }],
            $and: [{ estado: true }]
        });

        return res.json({
            results: (facultad) ? [facultad] : []
        })

    }

    const regex = new RegExp(termino, 'i');

    const facutades = await Facultad.find({
        nombre: regex,
        $and: [{ estado: true }]
    })

    res.status(500).json({
        results: facutades
    })

}


//busqueda de Programa
const buscarPrograma = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {

        const programa = await Programa.find({
            $or: [{ facultad_id: termino }, { _id: termino }],
            $and: [{ estado: true }]
        });

        return res.json({
            results: (programa) ? [programa] : []
        })

    }

    const regex = new RegExp(termino, 'i');

    const programas = await Programa.find({
        nombre: regex,
        $and: [{ estado: true }]
    })

    res.status(500).json({
        results: programas
    })

}

// busquedas de estudiantes
const buscarGrupo = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino);
  
    if (esMongoID) {

        const grupo = await Grupo.find({
            $or: [{ profesor_id: termino }, { _id: termino }],
            $and: [{ estado: true }]
        });

        return res.json({
            results: (grupo) ? [grupo] : []
        })

    }

    const regex = new RegExp(termino, 'i');

    const grupos = await Grupo.find({
        nombre: regex,
        $and: [{ estado: true }]
    })

    res.status(500).json({
        results: grupos
    })

}


//metodo para hacer las busquedas
const buscar = async (req = request, res = response) => {


    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {

        return res.status(400).json({
            ok: false,
            msg: `las colecciones permitidas son: ${coleccionesPermitidas} `
        })
    }

    switch (coleccion) {

        case 'Facultad':
            buscarFacultad(termino, res);
            break;

        case 'Grupo':
            buscarGrupo(termino, res);
            break;

        case 'Programa':
            buscarPrograma(termino, res);
            break;

        case 'Usuario':
            buscarUsuarios(termino, res);
            break;

        default:
            res.status(500).json({
                msg: 'Se me olvido implementar esta busquedad'
            })

    }




}

module.exports = {
    buscar
}



