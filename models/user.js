const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create user schema

const  UserSchema = new Schema({
    name:{
        type:String,
        required:[true,'Name field is required']
    },
    surname:{
        type:String,
        required:[true,'Surname field is required']
    },
    address:{
        type:String,
        required:[true,'Surname field is required']
    },
    cellphonenumber:{
        type:String,
        required:[true,'cellphone field is required']
    },
    password:{
        type:String,
        required:[true,'password field is required']
    },
    accountStatus:{
        type:String,
        required:[true,'acccountstatus field is required']
    }
});
const User = mongoose.model('User',UserSchema);
module.exports=User;