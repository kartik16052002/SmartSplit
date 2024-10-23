const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT=require("jsonwebtoken")


const registerController = async (req,res)=>{
    try {
        // const {email}=req.body.email;
        const existingUser = await userModel.findOne({email:req.body.email});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }
        // hashed password
        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(req.body.password,salt);
        req.body.password = hashedPassword
        // 
        const user = new userModel(req.body);
        await user.save();
        return res.status(200).send({
            success:true,
            message:"Successfully registered!!!",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while registering User",
            error
        })
    }
}


const loginController= async (req,res)=>{
    try {
        let user={};
        switch(req.body.method){
            case "email":{
                user =await userModel.findOne({email:req.body.email});
                if(!user){
                    return res.status(400).send({
                        success:false,
                        message: "User not found",
                        error
                    })
                }
            }
            break;
            case "phone":{
                user =await userModel.findOne({phone:req.body.phone});
                if(!user){
                    return res.status(400).send({
                        success:false,
                        message: "User not found",
                        error
                    })
                }
            }
            break;
            case "OAuth":{
                user =await userModel.findOne({googleId:req.body.googleId});
                if(!user){
                    return res.status(400).send({
                        success:false,
                        message: "User not found",
                        error
                    })
                }
            }
            break;
            default:{
                res.status(500).send({
                    success: false,
                    message: "Invalid method",
                    error
                })
            }

        }
        const comparedPassword = await bcrypt.compare(req.body.password,user.password);
        if(!comparedPassword){
            return res.status(400).send({
                success: false,
                message: "Incorrect Password",
                error
            })
        }
        const token = JWT.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        return res.status(200).send({
            success:true,
            message:"User logged in successfully",
            token,
            user
        })
        
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:"Error while logging in User",
            error
        })
    }
}


const currentUserController=async(req,res)=>{
    try {
        // console.log(req.body.userId)
        const user = await userModel.findOne({_id:req.body.userId});
        // console.log(user)
        return res.status(200).send({
            success:true,
            message:"User fetched successfully",
            user,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message:false,
            message:"Error while fetching user",
            error
        })
    }
}


module.exports = {registerController,loginController,currentUserController};