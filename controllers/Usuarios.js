const {response ,request} =require('express');


const usuarioGet = (req = request, res= response)=>{

    res.json({
        msg: 'get'
    });
}


module.exports = {
    usuarioGet
}
