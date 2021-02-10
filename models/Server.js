const express = require('express');
const cors = require('cors');

class Server {


    constructor() {
        this.app = express();
        this.port = process.env.PORT


        //Middlewares
        this.middleware();

        //Rutas de la aplicacion
        this.routes();

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

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
        });
    }

}


module.exports = Server;