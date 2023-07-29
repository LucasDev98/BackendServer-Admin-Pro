const  User = require('../models/user');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { JSONWebTokenGenerator } = require('../helpers/jwt');


const getUsers = async ( req, res ) => {

    const users = await User.find({}, 'name lastName email role google')

    res.json({
        ok : true,
        users,
        uid : req.uid
    })
}

const createUser =  async ( req, res = response ) => {

    const { email, password } = req.body;

   try {
       
    const emailExiste = await User.findOne({email});

        if ( emailExiste ) {

            return res.status(400).json({
                ok : false,
                msg:"el email ya esta registrado"
            })
            
        }
        
        const user = new User( req.body );

        const salt = bcrypt.genSaltSync();

        user.password = bcrypt.hashSync( password, salt );

        await user.save();

        const token = await JSONWebTokenGenerator( user.id );

        res.json({
            ok : true,
            token
        })
   } catch (error) {
        console.log(error)
        res.status(500).json({
            ok : false,
            msg : "bad request revisar logs"
        })
   }
}

const updateUser = async ( req, res = response ) => {
        const uid = req.params.id;
        try {

            const {  password,google, email, ...campos } = req.body;
            const usuarioDB = await User.findById( { _id : uid }  );

            if( !usuarioDB ) {
                return res.status(404).json({
                    ok: false,
                    msg:"No existe un usuario con ese id"
                })
            }

            if( usuarioDB.email !== email ) {
                const existeEmail = await User.findOne( { email } );

                if ( existeEmail ){
                    return res.status(500).json({
                        ok : false,
                        msg : "Ya existe un usaurio con ese email"
                    })
                }
            } 
            
            campos.email = email;
            

            const userUpdated = await User.findByIdAndUpdate(uid, campos, { new : true })
            res.json({
                ok:true,
                userUpdated,
                "msg": "Usuario actualizado Correctamente!"
            })
        } catch (error) {
            
            console.log(error);

            res.status(500).json({
                ok:false,
                error: "Algo salio mal"
            })
        }
}

const deleteUser = async ( req, res = response  ) => {
    const uid = req.params.id;
    try{    
        const usuario = await User.findById( uid );

        if( !usuario ){
            return res.status(404).json({
                ok:false,
                error : "El id no es valido"
            })
        }

        await User.findByIdAndDelete(uid);

        res.json({
            ok : true,
            msg: "Usuario eliminado exitosamente"
        })
    }catch( error ) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error : "Algo salio mal"
        })
    }
}   

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}
