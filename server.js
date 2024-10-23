const express = require("express");
const dotenv = require("dotenv");
const cors=require("cors");
const connectDB=require('./config/db');
const path = require('path');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(cors());


// test routes
app.use('/api/v1/test',require('./routes/testRoutes'));

// auth route
app.use('/api/v1/auth',require('./routes/authRoutes'));

// group route
app.use('/api/v1/group',require('./routes/groupRoutes'));

app.get('/',(req,res)=>{
    res.status(200).json({
        message:"Welcome to BillSplit"
    })
})


// static folder
app.use(express.static(path.join(__dirname,'./client/build')));

// static routes
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})


const PORT= process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Node Server runnning on port ${PORT}`);
})