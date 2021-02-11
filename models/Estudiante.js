const { Schema , model } = require('mongoose');

const EstudianteSchema = Schema({

    Usuario_id:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    Programa_id:{
        type: Schema.Types.ObjectId,
        ref: 'Programa'
    },
    Formularios:[{
        type: Schema.Types.ObjectId,
        ref: 'Formulario'
    }],
    Grupos:[{
        type: Schema.Types.ObjectId,
        ref: 'Grupos'
    }]

});

module.exports = model('Estudiante', EstudianteSchema);