
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const { response, request } = require('express');
const { subirArchivo } = require('../helpers');
const { Usuario } = require('../models');


cloudinary.config(process.env.CLOUDINARY_URL);

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


//  actualizar imagen usando el servidor propio
const actulizarAvatar = async (req = request, res = response) => {

    const { id } = req.params;
    const usuario = await Usuario.findById(id);

    if (!usuario) {

        return res.status(400).json(
            {
                msg: `el usuario con el id: ${id} no existe`
            });
    }

    //limpiar imagenes previas

    if (usuario.avatar) {
        const pathImage = path.join(__dirname, '../Uploads', 'avatares', usuario.avatar);

        if (fs.existsSync(pathImage)) {
            fs.unlinkSync(pathImage);
        }
    }

    const nombre = await subirArchivo(req.files, undefined, 'avatares');
    usuario.avatar = nombre;

    await usuario.save()

    res.json({
        usuario
    })
}


//actulizar imagen cconusmiendo api de claudinary
const actulizarAvatarCloudinary = async (req = request, res = response) => {

    const { id } = req.params;
    const usuario = await Usuario.findById(id);

    if (!usuario) {

        return res.status(400).json(
            {
                msg: `el usuario con el id: ${id} no existe`
            });
    }

    //limpiar imagenes previas

    if (usuario.avatar) {
        const nombreArr = usuario.avatar.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split('.');
        cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    usuario.avatar = secure_url;

    await usuario.save()

    res.json({
        usuario
    });
}


//mostrar avatar 
const mostrarAvatar = async (req = request, res = response) => {

    const { id } = req.params;
    const usuario = await Usuario.findById(id);

    if (!usuario) {

        return res.status(400).json(
            {
                msg: `el usuario con el id: ${id} no existe`
            });
    }


    if (usuario.avatar) {
        const pathImage = path.join(__dirname, '../Uploads', 'avatares', usuario.avatar);

        if (fs.existsSync(pathImage)) {
            return res.sendFile(pathImage);
        }
    }

    const pathImage = path.join(__dirname, '../assets/no-image.jpg');

    return res.sendFile(pathImage);

}


module.exports = {
    cargarArchivos,
    actulizarAvatar,
    mostrarAvatar,
    actulizarAvatarCloudinary

}