const { Schema, model } = require('mongoose');

const FormularioSchema = Schema({

    create_ad: {
        type: Date,
        default: Date.now,
    },
    formulario: {
        activo: Number,
        reflexivo: Number,
        teorico: Number,
        pragmatico: Number,
    },
    estado: {
        type: Boolean,
        default: true
    },

});

module.exports = model('Formulario', FormularioSchema);