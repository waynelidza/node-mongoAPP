const express = require('express');
const bodyPaser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes/api');
var winston = require('winston');
expressWinston = require('express-winston');


var multer = require('multer');
var bodyParser = require('body-parser');

app.use(bodyPaser.json());
//init routes
app.use(routes);

//connect to mongodb
mongoose.connect("mongodb://localhost/ivy");
mongoose.Promise = global.Promise;


//error handling
app.use(function (err,req,res,next) {



    console.log(err.message);
    if(err.message.search('duplicate')){
        res.status(409).send({message:'Phonenumber exist'});

    }else{
        res.status(422).send({error:err.message});

    }
});

app.listen(process.env.port||3000,function () {

    console.log("now listening");

});

// app.use(function (req, res, next) {
//
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin", "*"');
//
//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//
//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//
//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     // res.setHeader('Access-Control-Allow-Credentials', true);
//
//     // Pass to next layer of middleware
//     next();
// });
