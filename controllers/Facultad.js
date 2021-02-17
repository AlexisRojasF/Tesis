const { response, request } = require('express');
const {Facultad} = require('../models');

//Crear Facultad
const crearFacultad = async (req = request, res = response) => {

    const facul = req.body;
    const nombre = facul.nombre.toLowerCase();

    try {

        let facultad = await Facultad.findOne({ nombre: nombre });

        if (facultad) {

            return res.status(400).json({
                ok: false,
                msg: 'la facultad ya existe en la db'
            })
        }

        facultad = new Facultad();

        facultad.nombre = nombre;

        await facultad.save();


        res.json({
            facultad
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj: 'Por favor comuniquese con el adminitrador'
        })
    }
}


//Actualizar Facultad
const actualizarFacultad = async (req = request, res = response) => {

    const { id } = req.params;
    const body = req.body

    const facultad = await Facultad.findByIdAndUpdate(id, body);

    res.json({
        msg: 'Actulizar',
        facultad
    })

}


//eliminar estudiante cambiar estado a false
const borrarFacultad = async (req = request, res = response) => {

    const { id } = req.params;
    const facultad = await Facultad.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'borrar',
        facultad
    })

}


//Traer una lista de usuarios paginada
const buscarFacultad = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true };

    const [total, facultades] = await Promise.all([
        Facultad.countDocuments(query),
        Facultad.find(query)
            .limit(Number(limite))
            .skip(Number(desde))
    ]);


    res.json({
        msg: 'facultades paginadas',
        total,
        facultades
    })
}


module.exports = {
    crearFacultad,
    borrarFacultad,
    buscarFacultad,
}