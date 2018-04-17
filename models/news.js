const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  NewsSchema = new Schema({
    description:{
        type:String,
        required:[true,'description field is required']
    },
    DatetimeSent:{
        type:String,
        required:[true,'DateOrder field is required']
    },

});const News = mongoose.model('news ',NewsSchema);
module.exports=News;