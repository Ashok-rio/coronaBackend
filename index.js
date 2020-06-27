const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport =  require('passport');
const port = process.env.PORT || 8080; //!port 

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));

const mongoURI = "mongodb://localhost:27017/coronabackend";//?mondoDB connection string

//mongoose connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB Connected")
    })
    .catch(err => {
        console.log(err)
    });
    
const user = require('./routes/Route')
app.use('/api',user)

app.listen(port, function () {                              //?Server port
    console.log(`Server is running on port:${port}`);
});
