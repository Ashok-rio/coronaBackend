const mongoose = require('mongoose');

const TestYourSelfSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    address:{
        type:String
    },
    symptoms:{
        type:Array,
        required:true
    }
})

module.exports = mongoose.model('report',TestYourSelfSchema);