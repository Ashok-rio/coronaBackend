const mongoose = require('mongoose');

const TestingCenterSchema  = new mongoose.Schema({

    centerName:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('centers',TestingCenterSchema);