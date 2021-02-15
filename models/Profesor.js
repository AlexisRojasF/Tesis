const { Schema , model } = require('mongoose');

const ProfesorSchema = Schema({

    usuario_id:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    estado: {
        type: Boolean,
        default: true
    },

    //TODO: cambiar asignaturas a programas y hacer referecia a dicha collecion
    asignaturas:[{
        type: String,
    }],
    grupos:[{
        type: Schema.Types.ObjectId,
        ref: 'Grupo'
    }]

});

module.exports = model('Profesor', ProfesorSchema);