const { response } = require('express');
const  User  = require('../models/user');
const  bcrypt  = require('bcryptjs');
const { JSONWebTokenGenerator } = require('../helpers/jwt');

const login = async ( req, res = response ) => {

        const { email, password } = req.body; 
        try {
            const userDB = await User.findOne( { email } );

            if( !userDB ){
                return res.status(404).json({
                    ok:false,
                    msg : "Email Invalido"
                })
            }
            
            const isPassword = await bcrypt.compareSync( password, userDB.password );

            if( !isPassword ){
                return res.status(404).json({
                    ok:false,
                    msg : "Password Invalido"
                })
            }

            //Generate JWT
            const token = await JSONWebTokenGenerator( userDB.id );

            res.json({
                ok : true,
                token,
                msg: "Logeando"
            })

        }catch(error){
            console.log(error);
            res.status(500).json({
                ok:false,
                msg : "Algo salio mal"
            })
        }
}




module.exports = {
    login
}