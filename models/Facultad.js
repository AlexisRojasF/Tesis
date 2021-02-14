const { Schema , model } = require('mongoose');

const FalcultadSchema = Schema({

    programa_id:[{
        type: Schema.Types.ObjectId,
        ref: 'Falcultad'
    }],
    estado:{
        type: Boolean,
        default: true
    },
    nombre:{
        type: String,
        required: true
    }

});

module.exports = model('Falcultad', FalcultadSchema);