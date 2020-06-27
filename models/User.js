const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number
    },
    address:{
        type:String
    }
})

module.exports = mongoose.model('user',UserSchema)