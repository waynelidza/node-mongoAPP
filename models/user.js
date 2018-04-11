const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
//create user schema
SALT_WORK_FACTOR = 10;
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
        unique:true,
        required:[true,'cellphone field is required']
    },
    password:{
        type:String,
        required:[true,'password field is required']
    },
    GCMID:{
        type:String,
        required:[false,'GCMID field is required']
    },
    accountStatus:{
        type:String,
        required:[true,'acccountstatus field is required']
    }
});


UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const User = mongoose.model('User',UserSchema);
module.exports=User;