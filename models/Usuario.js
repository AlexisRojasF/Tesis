const { Schema , model } = require('mongoose');

const UsuarioSchema = Schema({

    nombre:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:[true,'La contraseña es obligatoria'],
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    rol:{
        estudiante:{ type: Schema.Types.ObjectId,
                    ref: 'Estudiante'},

        profesor:{ type: Schema.Types.ObjectId,
                    ref: 'Profesor'},

        admin:{ type: Schema.Types.ObjectId,
                    ref: 'Admin'},
    },
    genero:{
        type:String,
        required:true
    },
    domicilio:{
        departamento: String,
        cuidad: String,
        direccion: String
    },
    avatar:{
        type:String,
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
});


UsuarioSchema.methods.toJSON = function () {
    let {__v ,password, ...usuario} = this.toObject();;

    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);