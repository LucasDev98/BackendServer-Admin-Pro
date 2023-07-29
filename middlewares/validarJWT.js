const  jwt  = require('jsonwebtoken');
const { response } = require('express');





const valdidarToken = async ( req, res = response, next ) => {

    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            ok: false,
            msg : "No hay token en la petición"
        })
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.JWT_SECRET )

        req.uid = uid; 

        next();
    }catch( err ){

        console.log( err );
        return res.status(500).json({
            ok : false,
            msg : "Algo salio mal token"
        })
    }

  
}




module.exports = { valdidarToken }
