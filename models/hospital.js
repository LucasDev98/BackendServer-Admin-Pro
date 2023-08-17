const { Schema, model } = require('mongoose');





const HospitalSchema = Schema({
    name : {
        type : String,
        required : true,
    },
    img : {
        type : String,
        required : false,
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
})




HospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();

    return object;
})


module.exports = model( 'Hospital', HospitalSchema )
