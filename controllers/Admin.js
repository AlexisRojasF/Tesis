const { response, request } = require('express');
const Admin = require('../models/Admin');

//Crear Admin
const crearAdmin = async (req = request, res = response) => {

    const usuario = req.usuario;

    try {

        let admin = await Admin.findOne({ usuario_id: usuario.id });

        if (admin) {

            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese id'
            })
        }

        admin = new Admin();

        admin.usuario_id = usuario._id;
        usuario.admin = admin.id;

        await admin.save();
        await usuario.save();


        res.json({
            usuario,
            admin
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj: 'Por favor comuniquese con el adminitrador'
        })
    }
}

//Actualizar Admin

const actualizarAdmin = async (req = request, res = response) => {

    const { id } = req.params;
    const body = req.body

    const admin = await Admin.findByIdAndUpdate(id, body);

    res.json({
        msg: 'Actulizar',
        admin
    })

}
//-------------------------------


//eliminar Admin cambiar estado a false
const borrarAdmin = async (req = request, res = response) => {

    const { id } = req.params;
    const admin = await Admin.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'borrar',
        admin
    })

}

//Traer una lista de usuarios paginada
const buscarAdmin = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true };



    const [total, admin] = await Promise.all([
        Admin.countDocuments(query),
        Admin.find(query)
            .limit(Number(limite))
            .skip(Number(desde))
    ]);


    res.json({
        msg: 'usuarios paginador',
        total,
        admin
    })
}

//--------------------------------------

module.exports = {
    crearAdmin,
    actualizarAdmin,
    borrarAdmin,
    buscarAdmin,
}