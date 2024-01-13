import User from "../model/UserModel.js";
import bcryptjs from 'bcryptjs';

export const signup=async(req,res)=>{
    const {username,email,password}=req.body;
    const hashPassword=bcryptjs.hashSync(password,10);
    const newUser=new User({username,email,password:hashPassword});
    try {
        await newUser.save();
        res.status(201).json({message:"User created successfully"})
    } catch (error) {
        res.status(500).json(error.message)
    }
    
}