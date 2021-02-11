const { response, request } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleverify } = require('../helpers/google-verify');


const login = async (req = request, res = response) => {


    const { email, password } = req.body;


    try {
        //Verificar si el email existe

        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario / Password es incorrecto'
            })
        }

        //Verificar si el usuario esta activo

        if (!usuario.estado) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario / Password es incorrecto - estado:false'
            })
        }

        //Verificar la cantraseña 

        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {

            return res.status(400).json({
                ok: false,
                msg: 'Usuario / Password es incorrecto'
            })

        }

        //Generar el Jwt
        const token = await generarJWT(usuario.id);



        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj: 'Por favor hable con el adminitrador'
        })

    }
}

const googleSingIn = async (req = request, res = response) => {

    const { id_token } = req.body;



    try {

        const { nombre, avatar, email } = await googleverify(id_token);

        let usuario = await Usuario.findOne({ email });

        if (!usuario) {
            // crear el usuario
            const data = {
                nombre,
                email,
                password: '123456',
                avatar,
                google: true
            };

            usuario = new Usuario(data);
            await usuario.save();

        }

        //Verificar si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario bloqueado'
            })
        }

        //Generar Jwt
        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msj: 'Token de google no reconocido'
        })
    }
}

module.exports = {
    login,
    googleSingIn
}