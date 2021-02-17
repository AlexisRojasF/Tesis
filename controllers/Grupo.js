const { response, request } = require('express');
const {Estudiante,Profesor,Grupo} = require('../models');


//Crear Grupo
const crearGrupo = async (req = request, res = response) => {

    const { nombre } = req.body;
    const usuario = req.usuario

    try {

        let grupo = await Grupo.findOne({ nombre: nombre });

        if (grupo) {

            return res.status(400).json({
                ok: false,
                msg: 'El grupo ya existe en la db'
            })
        }


        grupo = new Grupo();

        grupo.nombre = nombre;
        grupo.profesor_id = usuario._id;

        const profesor = await Profesor.findOneAndUpdate({ usuario_id: usuario._id }, { $addToSet: { grupos: grupo.id } });
        await grupo.save();

        res.json({
            grupo,
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


//eliminar Grupo cambiar estado a false
const borrarGrupo = async (req = request, res = response) => {

    const { id } = req.params;
    const grupo = await Grupo.findOneAndUpdate(id, { estado: false });

    res.json({
        msg: 'borrar',
        grupo,
    })

}


//Traer una lista de Formulario paginada
const buscargrupos = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true };

    const [total, grupos] = await Promise.all([
        Grupo.countDocuments(query),
        Grupo.find(query)
            .limit(Number(limite))
            .skip(Number(desde))
    ]);


    res.json({
        msg: 'Grupos paginados',
        total,
        grupos
    })
}


//Agregar al grupo 
const agregarEstudianteGrupo =  async (req = request, res = response) => {

    const { estudiante_id } = req.body;
    const { id } = req.params;

    try {

        const grupo = await  Grupo.findByIdAndUpdate( id ,{ $addToSet: { estudiantes: estudiante_id } } );
        const estudiante = await  Estudiante.findByIdAndUpdate( estudiante_id ,{ $addToSet: { grupos: id } } );

        res.json({
            msg: 'usuarios agregado',
            grupo,
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


//Agregar a solicitudes
const agregarEstudianteSolicitudes =  async (req = request, res = response) => {

    const { estudiante } = req.body;
    const { id } = req.params;

    try {

        const grupo = await  Grupo.findByIdAndUpdate( id ,{ $addToSet: { solicitudes: estudiante } } );

        res.json({
            msg: 'solicitud enviada',
            grupo
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj: 'Por favor comuniquese con el adminitrador'
        })
    }
}


//acptar a solicitudes
const aceptarSolicitudes =  async (req = request, res = response) => {

    const { estudiante_id } = req.body;
    const { id } = req.params;

    try {

        const grupo = await  Grupo.findOne( {solicitudes : estudiante_id} );

        if (grupo){

            await Grupo.findByIdAndUpdate(id ,{ $pull: { solicitudes: estudiante_id } } );
            await Grupo.findByIdAndUpdate(id ,{ $addToSet: { estudiantes: estudiante_id } } );
            const estudiante = await  Estudiante.findByIdAndUpdate( estudiante_id ,{ $addToSet: { grupos: id } } );


            res.json({
                msg: 'solicitud enviada',
                grupo,
                estudiante
            })
        }else{
            return res.status(500).json({
                ok: false,
                msj: 'Usuario no existe'
            })
        }


        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj: 'Por favor comuniquese con el adminitrador'
        })
    }
}


module.exports = {
    crearGrupo,
    borrarGrupo,
    buscargrupos,
    agregarEstudianteGrupo,
    agregarEstudianteSolicitudes,
    aceptarSolicitudes

}