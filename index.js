const express = require('express');
const bodyPaser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes/api');

app.use(bodyPaser.json());
//init routes
app.use(routes);

//connect to mongodb
mongoose.connect("mongodb://localhost/ivy");
mongoose.Promise = global.Promise;


//error handling
app.use(function (err,req,res,next) {
    console.log('err');
    res.status(422).send({error:err.message});
});

app.listen(process.env.port||3009,function () {
    console.log("now listening");
});