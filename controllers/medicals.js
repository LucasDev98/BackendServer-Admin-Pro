const Medical = require('../models/medicals');
const { response } = require('express');





const getMedical = async ( req, res = response ) => {

    const medicals = await Medical.find()
                                        .populate('user', 'name')
                                        .populate('hospital', 'name')
        try {
            res.json({
                ok : true,
                medicals,
                msg : "Get Medical"
            })
        } catch (error) {
            
        }
}

const createMedical = async ( req, res = response ) => {
    const uid = req.uid;

    const medical = new Medical({
        user : uid,
        ...req.body
    })

    try {

        const medicalDB = await medical.save( medical );
        res.json({
            ok : true,
            medical : medicalDB,
            msg : "Create Medical"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok : false,
            msg : "Error inesperado"
        })
    }
}


const updateMedical = ( req, res = response ) => {
    try {
        res.json({
            ok : true,
            msg : "Update Medical"
        })
    } catch (error) {
        
    }
}

const deleteMedical = ( req, res = response ) => {
    try {
        res.json({
            ok : true,
            msg : "Delete Medical"
        })
    } catch (error) {
        
    }
}

module.exports = {
    getMedical,
    createMedical,
    updateMedical,
    deleteMedical
}