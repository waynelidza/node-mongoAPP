const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Admin = require('../models/admin');
var firebase = require("firebase");
var admin = require("firebase-admin");
const request = require('request');
const fireBase = require('./firebase');



//get list of users
router.get('/user/login',function (req,res) {

});
//post
router.post('/users/login',function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('login');
    console.log(req.body);
    User.findOne({
        cellphonenumber: req.body.cellphonenumber
    }, function(err, user) {

        console.log(err);

        console.log(req.body.password);
     if(!user){


         res.status(401).send({message:'wrong cellphonenumber or password'});
     }else {

       if(user.password.toString()=== req.body.password.toString()){
           res.send(user);
       }else {
           res.status(401).send({message:'wrong cellphonenumber or password'});
       }

     }


    }).catch(next);
});
router.post('/admin/login',function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('login');
    console.log(req.body);
    Admin.findOne({
        username: req.body.username
    }, function(err, user) {

        console.log(err);

        if(!user){


            res.status(401).send({message:'wrong username or password'});
        }else {

            // if(user.password.toString()=== req.body.password.toString()){
            //     res.send(user);
            // }else {
            //     res.status(401).send({message:'wrong username or password'});
            // }
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (err) throw err;
                console.log('correct', isMatch); // -> Password123: true


                if(isMatch==true){
                    res.send(user);
                }else{
                    res.status(401).send({message:'wrong username or password'});
                }
            });


        }


    }).catch(next);
});

router.post('/ivy/register',function (req,res,next) {
    console.log("regsiter");
   User.create(req.body).then(function (users) {


       res.status(201).send({message:'Succesfully registered wait for the admin to approve your account'});

   }).catch(next);


});
router.get('/ivy/users',function (req,res,next) {
    console.log("regsiter");
    User.find().then(function (users) {


        res.status(200).send(users);

    }).catch(next);


});
router.get('/ivy/gcm',function (req,res,next) {
    var gcms = []
    console.log("regsitered admins");
    Admin.find({}).then(function (users) {
     var usertables = [] = users;
        usertables.forEach(function(table) {

             gcms.push(table.gcmID);
            console.log(gcms);

    });
        res.status(200).send(gcms);
    }).catch(next);


});



router.post('/admin',function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("post admin");
    Admin.create(req.body).then(function (Admin) {
        res.send('Succesfully created');
    }).catch(next);


});
//UPDATE
router.put('/users/:id',function (req,res,next) {
    console.log("delete");
    User.findByIdAndUpdate({_id:req.params.id},req.body).then(function (users) {
        res.send('successfully activated'+ users);
console.log("approver");

    }).catch(next);
});

router.put('/users/gcm/:id',function (req,res,next) {
    console.log("delete");
    User.findByIdAndUpdate({_id:req.params.id},req.body).then(function (users) {
        res.send('successfully up updated GCM activated');
        console.log("approver");

    }).catch(next);
});




//delete
router.delete('/users/:id',function (req,res,next) {
    console.log("delete");
  User.findByIdAndRemove({_id:req.params.id}).then(function (users) {
      res.send('successfully deleted'+ users);


}).catch(next);

});
router.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");

    next();
});



module.exports = router;