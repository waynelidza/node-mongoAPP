const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  ProductSchema = new Schema({
    name:{
        type:String,
        required:[true,'Name field is required']
    },
    description:{
        type:String,
        required:[true,'description field is required']
    },
    price:{
        type:String,
        required:[true,'Price field is required']
    },
    ImageUrl:{
        type:String,
        required:[false,'ImageUrl field is required']
    }

});const Products = mongoose.model('Product',ProductSchema);
module.exports=Products;