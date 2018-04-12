const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create user schema

const  sellsSchema = new Schema({
    Totalprice:{
        type:String,
        required:[false,'totalprice  field is required']
    },
    DateOrder:{
        type:Date,
        required:[false,'Dateorder field is required']
    },
    CustomerName:{
        type:String,
        required:[true,'CustomerName field is required']
    },
    callphonenumbers:{
        type:String,
        required:[true,'cellphone field is required']
    },
    details:{
        type:String,
        required:[true,'amount field is required']
    },
    status:{
        type:String,
        required:[true,'status field is required']
    },
    DatetimeOrder:{
        type:String,
        required:[true,'DateOrder field is required']
    },
});

const sells = mongoose.model('sells',sellsSchema);
module.exports= sells;