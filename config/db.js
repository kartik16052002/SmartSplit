const mongoose = require('mongoose');
const connectDB= async ()=>{
    try {
        await mongoose.connect("mongodb+srv://kartikchoudhary1605:ktkjat@cluster0.53u2y.mongodb.net/");
        console.log(`Connected to mongo database:${mongoose.connection.host}`);
        
    } catch (error) {
        console.log(`mongoose Database error ${error}`)
    }
}



module.exports=connectDB;
