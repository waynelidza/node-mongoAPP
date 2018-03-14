const express = require('express');
const router = express.Router();
const User = require('../models/user');
//get list of users
router.get('/user/login',function (req,res) {

});
//post
router.post('/users/login',function (req,res,next) {
    console.log("login");
    User.find({_id:req.params._id},req.body).then(function (user) {
        res.send(user);


    }).catch(next);
});

router.post('/ivy/users',function (req,res,next) {
    console.log("post");
   User.create(req.body).then(function (users) {
       res.send(users);
   }).catch(next);


});
//UPDATE
router.put('/users/:id',function (req,res,next) {
    console.log("delete");
    User.findByIdAndUpdate({_id:req.params.id},req.body).then(function (users) {
        res.send('successfully activated'+ users);


    }).catch(next);
});

//delete
router.delete('/users/:id',function (req,res,next) {
    console.log("delete");
  User.findByIdAndRemove({_id:req.params.id}).then(function (users) {
      res.send('successfully deleted'+ users);


}).catch(next);

});
module.exports = router;