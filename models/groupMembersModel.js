const mongoose = require('mongoose');

const groupMemberSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    memberId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    groupId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'group',
        required:true
    },
})


module.exports= mongoose.model('groupMember',groupMemberSchema);