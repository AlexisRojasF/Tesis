const { response, request } = require('express');
const {Profesor} = require('../models');

//Crear Profesor
const crearProfesor = async (req = request, res = response) => {

    const usuario = req.usuario;

    try {

        let profesor = await Profesor.findOne({ usuario_id : usuario._id });

        if (profesor) {

            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese id'
            })
        }

        profesor = new Profesor();

        profesor.usuario_id = usuario._id;
        usuario.profesor = profesor.id;

        await profesor.save();
        await usuario.save();

        
    res.json({
        usuario,
        profesor
    })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj: 'Por favor comuniquese con el adminitrador'
        })
    }
}

const crearProfesordesdeBack = async (req) => {

    const usuario = req;

    try {

        let profesor = await Profesor.findOne({ usuario_id: usuario._id });

        if (profesor) {

            return console.log('Un usuario existe con ese id'); 
        }

        profesor = new Profesor();

        profesor.usuario_id = usuario._id;
        usuario.profesor = profesor.id;

        await profesor.save();
        await usuario.save();


 

    } catch (error) {
        console.log(error);
     
    }
}


//Actualizar Profesor
const actualizarProfesor = async (req = request, res = response) => {

    const { id } = req.params;
    const body = req.body

    const profesor = await Profesor.findByIdAndUpdate(id,body );

    res.json({
        msg: 'Actulizar',
        profesor
    })

}


//eliminar estudiante cambiar estado a false
const borrarProfesor = async (req = request, res = response) => {

    const { id } = req.params;
    const profesor = await Profesor.findByIdAndUpdate(id,{ estado: false } );

    res.json({
        msg: 'borrar',
        profesor
    })

}


//Traer una lista de usuarios paginada
const buscarProfesors = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true };

    const [total, profesores] = await Promise.all([
        Profesor.countDocuments(query),
        Profesor.find(query)
            .limit(Number(limite))
            .skip(Number(desde))
    ]);


    res.json({
        msg: 'Profesores paginados',
        total,
        profesores
    })
}


// eliminar asignaturas 
const eliminarAsigntura =  async (req = request, res = response) => {

    const { id } = req.params;
    const {asignatura} = req.body

    const profesor =  await Profesor.findByIdAndUpdate(id, { $pull: { asignaturas: asignatura } } );

    res.json({
        msg: 'actualizar asignatura',
        profesor
    })

}


// Agregar  asignaturas 
const agregarAsigntura =  async (req = request, res = response) => {

    const { id } = req.params;
    const {asignatura} = req.body

    const profesor =  await Profesor.findByIdAndUpdate(id, { $addToSet: { asignaturas: asignatura } } );

    res.json({
        msg: 'actualizar asignatura',
        profesor
    })

}


module.exports = {
    crearProfesor,
    actualizarProfesor,
    borrarProfesor,
    buscarProfesors,
    eliminarAsigntura,
    agregarAsigntura,
    crearProfesordesdeBack
}