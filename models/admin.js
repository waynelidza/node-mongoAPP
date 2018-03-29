const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create user schema

const  AdminSchema = new Schema({
    username:{
        type:String,
        required:[true,'Name field is required']
    },

    password:{
        type:String,
        required:[true,'password field is required']
    }

});
const Admin = mongoose.model('Admin',AdminSchema);
module.exports=Admin;