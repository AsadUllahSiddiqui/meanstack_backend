const mongoose=require('mongoose');

const productschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    categoryId:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    brandName:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    discount:{
        type:Number,
        required:true
    }
})

module.exports=mongoose.model('product',productschema)