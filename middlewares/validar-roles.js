const { response, request } = require('express');


const esAdmin = (req = request, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            ok: false,
            msg: 'se quiere validar el role sin validar el token'
        });
    }

    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            ok: false,
            msg: `${nombre} no es administrador` 
        });

    }


    next();

}

const tieneRole = (...roles) => {

    return (req = request, res = response, next)=>{

        if (!req.usuario) {
            return res.status(500).json({
                ok: false,
                msg: 'se quiere validar el role sin validar el token'
            });
        }
        
        if (!roles.includes( req.usuario.rol )) {
            return res.status(500).json({
                ok: false,
                msg: `El servicio requiere uno de estos Roles ${roles}`
            });
        }

        next();

    }

}

module.exports = {
    esAdmin,
    tieneRole
}