const { response }  = require('express');
const  User = require('../models/user');
const  Hospital  = require('../models/hospital');
const  Medical  = require('../models/medicals');



const getAll = async ( req, res = response ) =>{
    
    const word = req.params.word;
    const regExp = new RegExp( word , 'i');
    try {
        
        const [ users, hospitals, medicals ] =  await Promise.all([
            User.find( {  name : regExp } ),
            Hospital.find( {  name : regExp } ),
            Medical.find( {  name : regExp } ),
        ])
        
        res.json({
            ok : true,
            msg : "Obteniendo Resultados",
            users,
            hospitals,
            medicals
        })
    } catch (error) {
        console.log(error)
        res.status(500).json( {
            ok : false,
            error : "Error en la peticion"
        })
    }
}


const getColecctionData = async ( req, res = response )=> {
    const tabla = req.params.table;
    const word = req.params.word;

    const regExp = new RegExp( word, 'i' );

    try {
        console.log(tabla);
        console.log(regExp);
        let data = [];

        switch ( tabla ) {
            case "medicals" :
                data = await Medical.find( { name : regExp } )
                                           .populate('hospital', 'name img')
                                           .populate('user', 'name img');
            break;

            case "hospitals" :
                 data = await Hospital.find( { name: regExp } )
                                            .populate('user', 'name img');
            break;
            
            case "users" :
                data = await User.find( { name : regExp } );
            break;

            default :
                res.status(400).json({
                    ok : false,
                    error : "You must write valid url"            
                })       
        }

        res.json({
            ok : true,
            data
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok : false,
            error : "Error inesperado"
        })
    }
}   


module.exports = {
    getAll,
    getColecctionData
}