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
        this.app.use('/api/estudiante', require('../routes/Estudiante'));
        this.app.use('/api/profesor', require('../routes/Profesor'));
        this.app.use('/api/admin', require('../routes/Admin'));
        this.app.use('/api/facultad', require('../routes/Facultad'));
        this.app.use('/api/programa', require('../routes/Programa'));
        this.app.use('/api/formulario', require('../routes/Formulario'));
        this.app.use('/api/grupo', require('../routes/Grupo'));
        this.app.use('/api/setting', require('../routes/Settings'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        });
    }

}


module.exports = Server;