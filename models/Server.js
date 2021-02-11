const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../dataBase/config')

class Server {


    constructor() {
        this.app = express();
        this.port = process.env.PORT

        //Conectar al base de datos
        this.conectarDB();


        //Middlewares
        this.middleware();

        //Rutas de la aplicacion
        this.routes();

    }

    async conectarDB(){

        await dbConnection();

    }

    middleware() {

        //Cors
        this.app.use(cors());

        //Parseo y lectura del body
        this.app.use(express.json());
        
        //Directorio Publico
        this.app.use(express.static('public'));
    }

    routes() {

        this.app.use('/api/usuario', require('../routes/Usuarios'));
        this.app.use('/api/auth', require('../routes/Auth'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        });
    }

}


module.exports = Server;