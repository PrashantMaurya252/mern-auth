import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Connected to Database')
}).catch((err)=>{
    console.log(err)
})
const app=express();
app .listen(3000,()=>{
    console.log('app is listening on 3000')
})