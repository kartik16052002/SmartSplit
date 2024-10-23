const mongoose = require('mongoose');
const connectDB= async ()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/");
        console.log(`Connected to mongo database:${mongoose.connection.host}`);
        
    } catch (error) {
        console.log(`mongoose Database error ${error}`)
    }
}



module.exports=connectDB;