const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
    
    hospitalName :{
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
    noOfBets:{
        type:Number,
        required:true
    },
    phone:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('hospital',HospitalSchema);