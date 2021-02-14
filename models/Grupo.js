const { Schema , model } = require('mongoose');

const GrupoSchema = Schema({

    profesor_id:{
        type: Schema.Types.ObjectId,
        ref: 'Profesor'
    },
    estudiantes:[{
        type: Schema.Types.ObjectId,
        ref: 'Estudiante'
    }],
    solicitudes:[{
        type: Schema.Types.ObjectId,
        ref: 'Estudiante'
    }],
    nombre:{
        type: String,
        required: true
    },   
    estado:{
        type: Boolean,
        default: true
    },

});

module.exports = model('Grupo', GrupoSchema);