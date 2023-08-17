const Hospital = require('../models/hospital');
const { response } = require('express');





const getHospitals = async ( req, res = response ) => {

    const hospitals = await Hospital.find()
                                            .populate('user', 'name img')

    try {

        res.json({
            ok : true,
            msg : "Get Hospital",
            hospitals
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok : false,
            error : "Algo salio mal"
        })
    }
}



const createHospital  = async (req , res = response ) => {

    const uid = req.uid; 
 
    const hospital = new Hospital(
            { user : uid,
             ...req.body });
    try {

        const hospitalDB = await hospital.save();
        res.json({
            ok : true,
            hospital : hospitalDB,
            msg : "Create Hospital"
            
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok : false,
            msg : "Error en la peticion"
        })
    }
}

const updateHospital  = (req , res = response ) => {
    
    try {
        res.json({
            ok : true,
            msg : "Update Hospital"
        })
    } catch (error) {
        
    }
}

const deleteHospital  = (req , res = response ) => {
    
    try {
        res.json({
            ok : true,
            msg : "Delete Hospital"
        })
        
    } catch (error) {
        
    }
}


module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}