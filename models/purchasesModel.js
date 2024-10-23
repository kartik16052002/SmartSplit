const mongoose = require('mongoose');

const purchaseSchema=new mongoose.Schema({
    itemName:{
        type:String,
        required:true
    },
    cost:{
        type:Number,
        required:true,
        default:'0'
    },
    payer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    groupId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'group',
        required:true
    }

},{timestamps:true})


module.exports= mongoose.model('purchase',purchaseSchema);