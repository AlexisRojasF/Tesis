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
    asignaturas:[{
        type: String,
    }],
    grupos:[{
        type: Schema.Types.ObjectId,
        ref: 'Grupos'
    }]

});

module.exports = model('Profesor', ProfesorSchema);