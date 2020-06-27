const mongoose = require('mongoose');

const DailyUpdateSchema = new mongoose.Schema({

    cases:{
        type:Number,
        required:true
    },
    deaths:{
        type:Number,
        required:true
    },
    recoveries:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('dailyUpdate',DailyUpdateSchema);