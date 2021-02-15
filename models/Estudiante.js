const { Schema , model } = require('mongoose');

const EstudianteSchema = Schema({

    usuario_id:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    programa_id:{
        type: Schema.Types.ObjectId,
        ref: 'Programa'
    },
    estado: {
        type: Boolean,
        default: true
    },
    formularios:[{
        type: Schema.Types.ObjectId,
        ref: 'Formulario'
    }],
    grupos:[{
        type: Schema.Types.ObjectId,
        ref: 'Grupo'
    }]

});

module.exports = model('Estudiante', EstudianteSchema);