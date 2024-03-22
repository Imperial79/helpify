import { UserModel } from "../models/Users.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

export const Profile =  async (req,res)=>{
    const userID = req.params.userID;
    const user = await UserModel.findById(userID);
    res.status(200).json(user);
}

export const Register = async (req,res)=>{
    try{
        const {name,email,password,latitude,longitude} = req.body;
        const user = await UserModel.findOne({email});

        if(user){
            return res.json({message: "User already exists!"});
        }
        const hashPWD = await bcrypt.hash(password,10);
        const newUser = new UserModel({name,email,password: hashPWD,latitude,longitude});
        await newUser.save();
        res.status(200).json({message:"success"});
    }catch(e){
        res.status(400).send("Error:- ",e);
    }
}

export const Login = async (req,res)=>{
    const {email, password} = req.body;
    const user = await UserModel.findOne({email});

    if(!user){
        return res.json({error:"User doesn't exist"});
    }
    const isPwdValid = await bcrypt.compare(password,user.password);
    if(!isPwdValid){
        return res.json({error:"Incorrect Password"})
    }

    const token = jwt.sign({id: user._id},process.env.SECRET);
    res.json({token, userID: user._id});
}