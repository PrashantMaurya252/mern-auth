import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/userRouter.js';
import authRoute from './routes/authRouter.js';
import cookieParser from 'cookie-parser';
import path from 'path'
dotenv.config();


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Connected to Database')
}).catch((err)=>{
    console.log(err)
})
const app=express();

const __dirname=path.resolve();

app.use(express.json());

app.use(express.static(path.join(__dirname,'/client/dist')));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})
app .listen(3000,()=>{
    console.log('app is listening on 3000')
})

app.use('/api/user',userRoute);
app.use('/api/auth',authRoute);
app.use(cookieParser())

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    });
});

