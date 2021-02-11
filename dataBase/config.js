const mongoose = require('mongoose');


const dbConnection = async ()=>{


    try {

       await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex:true,
            useFindAndModify: false
        });

        console.log('DB Onlinet')

        
    } catch (error) {

        console.log(error);
        throw  new Error('Error ala hora de inicilizar BD');
        
    }
}

module.exports = {
    dbConnection
}