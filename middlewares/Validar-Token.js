const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const validarToken = async (req = request, res = response, next) => {

    const token = req.header('x-token');


    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }


    try {

        const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED);

        //leer usuario autentificado
        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                ok: false,
                msg: 'token no valido --'
            });
            
        }

        //VErificar si el uid no esta marcado estado : false
        if (!usuario.estado) {
            return res.status(401).json({
                ok: false,
                msg: 'token no valido --'
            });
            
        }

        req.usuario = usuario;


        next();



    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msj: 'Token no valido'
        })
    }
}

module.exports = {
    validarToken
}