const { response, request } = require('express');
const {Settings} = require('../models');


//Crear Settings
const crearSettings = async (req = request, res = response) => {

    try {

        settings = new Settings();
        await settings.save();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj: 'Por favor comuniquese con el adminitrador'
        })
    }
}


//habilitar o desabilitar formulario
const habilitarFormularios = async (req = request, res = response) => {

    const id = "6029ad047413ab4398b56760";
    const {habilitar}= req.body

    try {

        const formulario = await Settings.findByIdAndUpdate( id , {formularios:habilitar} );

        res.json({
            formulario,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj: 'Por favor comuniquese con el adminitrador'
        })
        
    }

}


module.exports = {
    crearSettings,
    habilitarFormularios

}