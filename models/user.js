const { Schema, model } = require("mongoose");


const UserSchema = Schema({
    name : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    img : {
        type : String,
        default : "no-image",
        required : false
        
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        default : "USER_ROLE",
        required : true
        
    },
    google : {
        type : Boolean,
        default : false,
        required : false
    }

})


UserSchema.method( 'toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();

    object.uid = _id;

    return object;
})


module.exports = model( 'User', UserSchema ); 