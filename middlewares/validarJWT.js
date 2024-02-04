const  jwt  = require('jsonwebtoken');
const { response } = require('express');
const User = require('../models/user');





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


const validarAdmin = async (req, res, next) => {

    
    const uid = req.params.id;
    console.log(req.params.id)
    console.log(req.body)
    try {
        
        const userDB = await User.findById(uid);


        if ( !userDB ){

            return res.status(404).json({
                ok : false,
                msg : 'Usuario no existe'
            })
        }
        
        if ( userDB.role !== 'ADMIN_ROLE'){
            return res.status(402).json({
                ok : false,
                msg : 'No tiene permisos para realizar esta acción'
            })
        }

        next();
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok : false,
            msg : 'Algo salio Mal'
        })
    }


}

const validarAdminOMismoUsuario = async (req, res, next) => {

    
    const id = req.params.id;
    const uid = req.uid;
    try {
        console.log(uid)
        console.log(id)
        
        const userDB = await User.findById(uid);


        if ( !userDB ){

            return res.status(404).json({
                ok : false,
                msg : 'Usuario no existe'
            })
        }
        
        if ( userDB.role !== 'ADMIN_ROLE' && uid != id){
            return res.status(402).json({
                ok : false,
                msg : 'No tiene permisos para realizar esta acción'
            })
        }

        next();
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok : false,
            msg : 'Algo salio Mal'
        })
    }


}




module.exports = { valdidarToken, validarAdmin, validarAdminOMismoUsuario}
