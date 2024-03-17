import express, { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/Users.js';

const router = express.Router();

router.post('/register',async (req,res)=>{
    try{
        const {name,email,password} = req.body;
        const user = await UserModel.findOne({email: email});

        if(user){
            return res.json({message: "User already exists!"});
        }
        const newUser = new UserModel({name,email,password});
        await newUser.save();
        res.status(200).json({message:"success"});
    }catch(e){
        res.status(400).send("Error:- "+e);
    }
})

export {router as userRouter};