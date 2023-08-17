const { Schema, model } = require('mongoose');

const MedicalSchema = Schema({

    name : {
        type : String,
        required : true
    },
    img : {
        type : String,
        required : false
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    hospital : {
        type : Schema.Types.ObjectId,
        ref : 'Hospital',
        required : true
    }
})


MedicalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();

    return object;
})


module.exports = model('Medical', MedicalSchema );