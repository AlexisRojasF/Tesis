const { response, request } = require('express');
const Programa = require('../models/Programa');
const Facultad = require('../models/Facultad');

//Crear Programa
const crearPrograma = async (req = request, res = response) => {

    const {nombre ,facultadID} = req.body;
    
    const LowerNombre = nombre.toLowerCase();

    try {

        let programa = await Programa.findOne({ nombre: LowerNombre });

        if (programa) {

            return res.status(400).json({
                ok: false,
                msg: 'la facultad ya existe en la db'
            })
        }

        programa = new Programa();

        programa.nombre = LowerNombre;
        programa.facultad_id = facultadID;


        const facultad =  await Facultad.findByIdAndUpdate(facultadID, { $addToSet: { programa_id: programa.id  } } );
        await programa.save();
    


        res.json({
            programa,
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

//Actualizar Programa

const actualizarPrograma = async (req = request, res = response) => {

    const { id } = req.params;
    const body = req.body

    const programa = await Programa.findByIdAndUpdate(id, body);

    res.json({
        msg: 'Actulizar',
        programa
    })

}
//-------------------------------


//eliminar Programa cambiar estado a false
const borrarPrograma = async (req = request, res = response) => {

    const { id } = req.params;
    const { facultadID } = req.body;
    const programa = await Programa.findByIdAndUpdate(id, { estado: false });
    const facultad = await Facultad.findByIdAndUpdate(facultadID, { $pull: { programa_id: programa.id  } } );

    res.json({
        msg: 'borrar',
        programa,
        facultad
    })

}

//Traer una lista de Programa paginada
const buscarPrograma = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true };



    const [total, programas] = await Promise.all([
        Programa.countDocuments(query),
        Programa.find(query)
            .limit(Number(limite))
            .skip(Number(desde))
    ]);


    res.json({
        msg: 'usuarios paginador',
        total,
        programas
    })
}

//--------------------------------------





module.exports = {
    crearPrograma,
    actualizarPrograma,
    borrarPrograma,
    buscarPrograma

}