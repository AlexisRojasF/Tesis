

const { response, request } = require('express');
const { subirArchivo } = require('../helpers');
const { validarArchivo } = require('../middlewares');
const { Usuario } = require('../models');


const cargarArchivos = async (req = request, res = response) => {

    try {
        //para crear carpetas y cambiar las extenciones
        //const nombre = await subirArchivo(req.files ,['txt', 'md' ] ,'textos')
        const nombre = await subirArchivo(req.files, undefined, 'imgs');

        res.json({
            nombre
        })
    } catch (msg) {
        return res.status(400).json({ msg });
    }

}

const actulizarAvatar = async (req = request, res = response) => {

    const { id } = req.params;
    const usuario = await Usuario.findById(id);

    if (!usuario) {

        return res.status(400).json(
            {
                msg: `el usuario con el id: ${id} no existe`
            });
    }
    const nombre = await subirArchivo(req.files, undefined, 'avatares');

    usuario.avatar = nombre;

    await usuario.save()


    res.json({
        usuario
    })
}


module.exports = {
    cargarArchivos,
    actulizarAvatar

}