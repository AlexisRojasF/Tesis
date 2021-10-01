const { response, request } = require('express');
const { Formulario, Estudiante } = require('../models');


//Crear Formulario
const crearFormulario = async (req = request, res = response) => {

    const { activo,
        reflexivo,
        teorico,
        pragmatico, } = req.body;

    const usuario = req.usuario;

    try {

        formulario = new Formulario();

        formulario.formulario.activo = activo;
        formulario.formulario.reflexivo = reflexivo;
        formulario.formulario.teorico = teorico;
        formulario.formulario.pragmatico = pragmatico;

        const estudiante = await Estudiante.findOneAndUpdate({ usuario_id: usuario._id }, { $addToSet: { formularios: formulario.id } });
        await formulario.save();

        res.json({
            formulario,
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


//eliminar Formulario cambiar estado a false
const borrarFormulario = async (req = request, res = response) => {

    const { id } = req.params;
    const formulario = await Formulario.findOneAndUpdate(id, { estado: false });

    res.json({
        msg: 'borrar',
        formulario,
    })

}


//Traer una lista de Formulario paginada
const buscarFormulario = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true };

    const [total, formularios] = await Promise.all([
        Formulario.countDocuments(query),
        Formulario.find(query)
            .limit(Number(limite))
            .skip(Number(desde))
    ]);

    res.json({
        msg: 'Formularios paginados',
        total,
        formularios
    })
}

//traer formularios de un usuario por id
const buscarFormularioPorId = async (req = request, res = response) => {

const { id } = req.params;
 

const {formularios} = await Estudiante.findOne({usuario_id : id });
   console.log(formularios);
    res.json({
        msg: 'formularios',
        formularios
    })
}
//traer formulario d id
const FormularioPorId = async (req = request, res = response) => {

    const { id } = req.params;

    const formulario = await Formulario.findById(id);

    res.json({
        msg: 'formulario',
        formulario
    })
}


module.exports = {
    crearFormulario,
    borrarFormulario,
    buscarFormulario,
    buscarFormularioPorId,
    FormularioPorId

}