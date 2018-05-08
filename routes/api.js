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
const Complaints = require('../models/Complaints');
const News= require('../models/news');
var multer = require('multer');
var bodyParser = require('body-parser');
var upload = multer({ dest: '/opt/lampp/htdocs/uploads/' });
var path;
router.use(bodyParser.json());

router.post('/Upload', upload.any(), function(req, res, next) {


    var filename =req.files[0].filename;

var imageUrl='http://ec2-34-240-133-21.eu-west-1.compute.amazonaws.com/uploads/'+filename;



    res.status(200).send(imageUrl);


});
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
    Sells.find({
        callphonenumbers: req.body.cellphonenumber
    }, function(err, requests) {



            res.send(requests);


    })

});



router.post('/findme',function (req,res) {
    res.header("Access-Control-Allow-Origin", "*");
    User.find({
        callphonenumbers: req.body.cellphonenumber
    }, function(err, user) {



        res.send(users);


    })

});


router.post('/cp',function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("cp");
    Complaints.create(req.body).then(function (cp) {


        res.status(201).send({message:'Succesfully sent to Admin'});
    }).catch(next);

});
router.post('/cps',function (req,res,next) {
    console.log("cp");
    Complaints.find({
        Sender: req.body.Sender
    }, function(err, requests) {

        console.log(request);

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
router.post('/news',function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("news");
    News.create(req.body).then(function (users) {


        res.status(201).send({message:'sent'});
    }).catch(next);

});
router.get('/adminNews',function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("news");
    News.find(req.body).then(function (news) {


        res.status(201).send(news);
    }).catch(next);

});
router.post('/report',function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.body.name);
        var useranme = req.body.name;
    var gcms = []
    console.log("notify admins");
    Admin.find({}).then(function (users) {
        var usertables = [] = users;
        usertables.forEach(function (table) {

            gcms.push(table.gcmID);


        });


        fireBase.registrationTokens = gcms;


        fireBase.sendmessagesCollect(fireBase.registrationTokens,useranme);
        res.status(200).send("message sent to the admin");
    }).catch(next);

});
router.post('/newsDelete',function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    News.findByIdAndRemove({
        _id: req.body._id
    }, function(err, requests) {



        res.status(200).send({message:'Succesfully deleted'});
    })

});

router.post('/sell',function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("regsiter sellls");
    Sells.create(req.body).then(function (users) {


        res.status(201).send({message:'Succesfully sent to the admin'});
    }).catch(next);

});


router.get('/sell',function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("sellls get ");

    Sells.find({
        status: '0'
    }, function(err, requests) {

        console.log(request);

        res.send(requests);


    }).catch(next);

});



router.get('/sellsALL',function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("sellls get ");

    Sells.find({

    }, function(err, requests) {

        console.log(request);

        res.send(requests);


    }).catch(next);

});
router.get('/ivy/users',function (req,res,next) {
    console.log("regsiter");

    User.find({
        accountStatus: '0'
    }, function(err, requests) {

        console.log(request);

        res.send(requests);


    }).catch(next);
});



router.get('/products',function (req,res,next) {
    console.log("products");
    Products.find().then(function (products) {


        res.status(200).send(products);


    }).catch(next);


});



router.post('/products',function (req,res,next) {
    console.log("producTS DELEE");
    Products.findByIdAndRemove({
        _id: req.body._id
    }, function(err, requests) {



        res.status(200).send({message:' deleted'});



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

        res.status(201).send({message:'created'});


    }).catch(next);


});

router.post('/product',function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("post admin");


    Products.create(req.body).then(function (Admin) {
        res.status(201).send({message:'created'});
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

    User.findByIdAndUpdate({_id:req.params.id},req.body).then(function (user) {
        res.send('successfully updated');


    }).catch(next);
});

router.put('/users/:id',function (req,res,next) {
    console.log("user upadate");
    User.findByIdAndUpdate({_id:req.params.id},req.body).then(function (user) {
        res.send('successfully updated');


    }).catch(next);
});
router.put('/usersEdit/:id',function (req,res,next) {
    console.log("approver");
    User.findByIdAndUpdate({_id:req.params.id},req.body).then(function (user) {
        res.status(201).send({message:'activated'});
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

    router.post('/product/:id',function (req,res,next) {
        console.log("delete");
        Products.findByIdAndRemove({_id:req.params.id}).then(function (users) {

            res.send({message:'deleted'});

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
router.post('/prodcast',function (req,res,next) {
    var gcms = []
    console.log("notify admins");
    User.find({}).then(function (users) {
        var usertables = [] = users;
        usertables.forEach(function (table) {

            gcms.push(table.GCMID);


        });
        res.status(200).send(gcms);

        fireBase.registrationTokens = gcms;

        fireBase.sendmessagesNews(fireBase.registrationTokens,req.body.message)

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