const { comprobarJWT } = require('../helpers');



const socketController = async (socket, io, grupo) => {

    const usuario = await comprobarJWT(socket.handshake.headers('x- token'));

    if (!usuario) {
        return socket.disconnect();
    }

    // Conectarlo a una sala especial
    socket.join(usuario.id); // global, socket.id, usuario.id


    socket.to(usuario.id).emit('notificacion', { grupo });
    console.log(grupo);


}





module.exports = {
    socketController,
} 