const { Schema , model } = require('mongoose');

const AdminSchema = Schema({

    usuario_id:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    estado: {
        type: Boolean,
        default: true
    },


});

module.exports = model('Admin', AdminSchema);