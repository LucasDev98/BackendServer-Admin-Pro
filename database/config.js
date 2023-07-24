const mongoose = require('mongoose');



const dbConection = async () => {
    try {
        
       await mongoose.connect( process.env.CONN , {

       });

        console.log("DB Online")

    } catch (error) {
        console.log(error);
        throw new error("Algo salio mal");
    }
}

 module.exports = {
    dbConection
 }