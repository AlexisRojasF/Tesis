const { Schema , model } = require('mongoose');

const ProgramaSchema = Schema({

    facultad_id:{
        type: Schema.Types.ObjectId,
        ref: 'Falcultad'
    },
    estado:{
        type: Boolean,
        default: true
    },
    nombre:{
        type: String,
        required: true
    }

});

module.exports = model('Programa', ProgramaSchema);