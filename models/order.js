const mongoose=require('mongoose');

const orderschema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    productIdArray:[String],
    productQuantityArray:[Number],
    productNameArray:[String],
    totalPrice:{
        type:Number,
        required:true
    },
    totalDiscount:{
        type:Number,
        required:true
    },
    delevedStatus:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phoneNo:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    postalCode:{
        type:String,
        required:true
    },
    ApartmentNo:{
        type:String,
        required:true
    }

})

module.exports=mongoose.model('order',orderschema)