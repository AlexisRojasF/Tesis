const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required:[ true, 'El rol debe ser obligatorio'],
        default:'USUARIO_ROL',
        emun:['ADMIN_ROLE','ESTUDIANTE_ROLE','PROFESOR_ROL','USUARIO_ROL']
    },
    genero: {
        type: String,
        default: 'indefinido',
        required: true
    },
    domicilio: {
        departamento: String,
        cuidad: String,
        direccion: String
    },
    avatar: {
        type: String,
    },
    estudiante: {
        type: Schema.Types.ObjectId,
        ref: 'Estudiante'
    },

    profesor: {
        type: Schema.Types.ObjectId,
        ref: 'Profesor'
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'Admin'
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});


UsuarioSchema.methods.toJSON = function () {
    let { __v, password, ...usuario } = this.toObject();;

    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);