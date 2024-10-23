const mongoose =require('mongoose');

const groupSchema=new mongoose.Schema({
    groupName:{
        type:String,
        required:true,
        unique:true
    },
    createrId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    settlementCompleted:{
        type:Boolean,
        default:false
    }

},{timestamps:true})


module.exports= mongoose.model('group',groupSchema);