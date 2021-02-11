const { response, request } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');


//Crear Usuario

const crearUsuario = async (req = request, res = response) => {

    const {
        email,
        password,
        nombre,
        domicilio,
        genero } = req.body;

    usuario = new Usuario({ email, password, nombre, domicilio, genero });

    //Encriptar contraseña 
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //Guardar el la base de datos
    await usuario.save();

    //Generar token

    // const token = await generarJWT(usuario.id, usuario.Nombre, usuario.Email);

    res.status(200).json({
        ok: true,
        usuario

    })


}

//---------------------------------------

//Actulizar usuario en la base de datos
const actualizarUsuario = async (req = request, res = response) => {

    const { id } = req.params;

    const { _id, password, google, email, ...resto } = req.body;

    //Validar Contra base de datos

    if (password) {

        //Encriptar contraseña 
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);

    }

    const usuario = await Usuario.findOneAndUpdate(id, resto);


    res.json({
        msg: 'Actulizar',
        usuario
    })

}
//-----------------------------

//Traer una lista de usuarios paginada
const findUsuarios = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query
    const query = { estado : true };


    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .limit(Number(limite))
            .skip(Number(desde))
    ]);


    res.json({
        msg: 'usuarios paginador',
        total,
        usuarios
    })
}

//--------------------------------------



//Borrar Usuario de la base de datos (estado:false)

const borrarUsuario =async (req = request, res = response) => {

const { id } = req.params;

const usuario = await Usuario.findByIdAndUpdate(id, {estado : false} );


}


//------------------------------------


module.exports = {
    crearUsuario,
    actualizarUsuario,
    findUsuarios,
    borrarUsuario
}
