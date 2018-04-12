const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Admin = require('../models/admin');
var firebase = require("firebase");
var admin = require("firebase-admin");
const request = require('request');
const fireBase = require('./firebase');
var firebaseGcm = require("./firebase");
const Products= require('../models/Product');
const Sells= require('../models/Sells');
//get list of users
router.post('/login',function (req,res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.body.cellphonenumber);
    User.findOne({
        cellphonenumber: req.body.cellphonenumber
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


    })

});
//post
router.post('/myproducts',function (req,res) {
    res.header("Access-Control-Allow-Origin", "*");
    Sells.findOne({
        callphonenumbers: req.body.cellphonenumber
    }, function(err, requests) {



            res.send(requests);


    })

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

router.post('/register',function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("regsiter");
    User.create(req.body).then(function (users) {


       res.status(201).send({message:'Succesfully registered please  wait for the admin to approve your account'});
   }).catch(next);

});


router.post('/sell',function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("regsiter sellls");
    Sells.create(req.body).then(function (users) {


        res.status(201).send({message:'Succesfully sent to the admin'});
    }).catch(next);

});
router.get('/ivy/users',function (req,res,next) {
    console.log("regsiter");
    User.find().then(function (users) {


        res.status(200).send(users);


    }).catch(next);


});



router.get('/products',function (req,res,next) {
    console.log("products");
    Products.find().then(function (products) {


        res.status(200).send(products);


    }).catch(next);


});
// router.get('/ivy/gcm',function (req,res,next) {
//     var gcms = []
//     console.log("regsitered admins");
//     Admin.find({}).then(function (users) {
//      var usertables = [] = users;
//         usertables.forEach(function(table) {
//
//              gcms.push(table.gcmID);
//
//
//     });
//         res.status(200).send(gcms);
//          var name = req.body.name;
//
//
//     }).catch(next);
//
//
// });

router.post('/admin',function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("post admin");
    Admin.create(req.body).then(function (Admin) {
        res.send('Succesfully created');
    }).catch(next);


});


router.post('/admin',function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("post admin");
    Admin.create(req.body).then(function (Admin) {
        res.send('Succesfully created');
    }).catch(next);


});

router.post('/products',function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("post admin");
    Products.create(req.body).then(function (Admin) {
        res.send('Succesfully created');
    }).catch(next);


});




// router.post('/sells',function (req,res,next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     console.log("post admin");
//     Products.create(req.body).then(function (Admin) {
//         res.send('Succesfully created');
//     }).catch(next);
//
//
// });
//UPDATE
router.put('/products/:id',function (req,res,next) {
    console.log("products");
    User.findByIdAndUpdate({_id:req.params.id},req.body).then(function (user) {
        res.send('successfully updated');


    }).catch(next);
});


router.put('/users/:id',function (req,res,next) {
    console.log("approver");
    User.findByIdAndUpdate({_id:req.params.id},req.body).then(function (user) {
        res.send('successfully activated');
        fireBase.sendmessagestoCustomer(user.GCMID);

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

    router.get('/ivy/gcm',function (req,res,next) {
        var gcms = []
        console.log("notify admins");
        Admin.find({}).then(function (users) {
            var usertables = [] = users;
            usertables.forEach(function (table) {

                gcms.push(table.gcmID);


            });
            res.status(200).send("message sent to the admin");

            fireBase.registrationTokens = gcms;

            fireBase.sendmessages(fireBase.registrationTokens)

        }).catch(next);

    });
router.get('/order/gcm',function (req,res,next) {
    var gcms = []
    console.log("notify admins");
    Admin.find({}).then(function (users) {
        var usertables = [] = users;
        usertables.forEach(function (table) {

            gcms.push(table.gcmID);


        });
        res.status(200).send("message sent to the admin");

        fireBase.registrationTokens = gcms;


        fireBase.sendmessagesfodeviler(fireBase.registrationTokens,req.body);

    }).catch(next);

});


module.exports = router;