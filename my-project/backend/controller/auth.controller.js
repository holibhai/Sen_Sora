const { User } = require("../models/user.model");
const bcryptjs=require("bcryptjs");
const generateTokenAndSetCookie = require("../utils/generateToken");


const signup=async (req,res)=>{
    try {
        const {firstName,lastName,username,password,confirmPassword}=req.body;
        if(password !== confirmPassword){
            return res.status(400).json({error:"Passwords don't match"})
        }
        const user=await User.findOne({username})
        if(user){
            return res.status(400).json({error:"Username already exists"})
        }

        //Hash Password
        const salt=await bcryptjs.genSalt(10);
        const hashPassword=await bcryptjs.hash(password,salt)


        const newUser=new User({
            firstName,
            lastName,
            username,
            password:hashPassword,

        })
        if(newUser){
             generateTokenAndSetCookie(newUser._id,res)
            await newUser.save()
            res.status(201).json(newUser)
        }else{
            res.status(400).json({error:"Invalid user data"})
        }
  

    } catch (error) {
        console.log("Error in signup controller",error.message)
        res.status(500).json({error:"Internal Server Error"})
    }

}
 const login= async (req,res)=>{
    
    try {
        const{username,password}=req.body
        const user=await User.findOne({username})
        const isPasswordCorrect=await bcryptjs.compare(password,user?.password || "");
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid username or password"})
        }
        generateTokenAndSetCookie(user._id,res)
        res.status(200).json(user)

    }catch (error) {
        console.log("Error in login controller",error.message)
        res.status(500).json({error:"Internal Server Error"})
    }

}
 const logout= async (req,res)=>{
    try {
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"Logged out successfully"})

    }catch (error) {
        console.log("Error in logput controller",error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}



module.exports={
    signup,login,logout
}