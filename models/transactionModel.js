const mongoose =require('mongoose');

const transactionSchema =new mongoose.Schema({
    payer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    payee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    groupId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'group',
        required:true
    }
});

module.exports = mongoose.model('transaction', transactionSchema);