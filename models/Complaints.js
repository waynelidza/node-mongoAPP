const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  ComplaintsSchema = new Schema({
    Message:{
        type:String,
        required:[true,'Message field is required']
    },
    DatetimeSent:{
        type:String,
        required:[true,'DatetimeSent field is required']
    },

    Sender:{
        type:String,
        required:[true,'Sender field is required']
    },
    Reply:{
        type:String,
        required:[false,'Sender field is required']
    },
    Status:{
        type:String,
        required:[true,'Status field is required']
    },
});const Complaints = mongoose.model('Complaints ',ComplaintsSchema);
module.exports=Complaints;