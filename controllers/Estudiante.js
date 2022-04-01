const { response, request } = require('express');
const {Estudiante} = require('../models');


//Crear Estudiante
const crearEstudiante = async (req = request, res = response) => {

    const usuario = req.usuario;

    try {

        let estudiante = await Estudiante.findOne({ usuario_id: usuario._id });

        if (estudiante) {

            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese id'
            })
        }

        estudiante = new Estudiante();

        estudiante.usuario_id = usuario._id;
        usuario.estudiante = estudiante.id;

        await estudiante.save();
        await usuario.save();


        res.json({
            usuario,
            estudiante
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj: 'Por favor comuniquese con el adminitrador'
        })
    }
}

const crearEstudiantedesdeBack= async (req = request ) => {

    const usuario = req;

    try {

        let estudiante = await Estudiante.findOne({ usuario_id: usuario });

        if (estudiante) {
            return console.log('Un usuario existe con ese id');
          
        }

        estudiante = new Estudiante();

        estudiante.usuario_id = usuario._id;
        usuario.estudiante = estudiante.id;

        await estudiante.save();
        await usuario.save();

        console.log(usuario);
        console.log(estudiante);
    

    } catch (error) {
        console.log(error);

    }
}


//Actualizar Estudiante
const actualizarEstudiante = async (req = request, res = response) => {

    const { id } = req.params;
    const body = req.body

    const estudiante = await Estudiante.findByIdAndUpdate(id, body);

    res.json({
        msg: 'Actulizar',
        estudiante
    })

}


//eliminar estudiante cambiar estado a false
const borrarEstudiante = async (req = request, res = response) => {

    const { id } = req.params;
    const estudiante = await Estudiante.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'borrar',
        estudiante
    })

}


//Traer una lista de usuarios paginada
const buscarEstudiantes = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true };



    const [total, estudiantes] = await Promise.all([
        Estudiante.countDocuments(query),
        Estudiante.find(query)
            .limit(Number(limite))
            .skip(Number(desde))
    ]);


    res.json({
        msg: 'Estudiantes paginados',
        total,
        estudiantes
    })
}



module.exports = {
    crearEstudiante,
    actualizarEstudiante,
    borrarEstudiante,
    buscarEstudiantes
}