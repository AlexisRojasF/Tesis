require('dotenv').config();
const Server = require('./models/Server');


//Inicilizar servidor
const server = new Server();
server.listen();



