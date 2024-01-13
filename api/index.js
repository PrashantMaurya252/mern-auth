import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/userRouter.js';
import authRoute from './routes/authRouter.js';
dotenv.config();


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Connected to Database')
}).catch((err)=>{
    console.log(err)
})
const app=express();
app.use(express.json());
app .listen(5000,()=>{
    console.log('app is listening on 5000')
})

app.use('/api/user',userRoute);
app.use('/api/auth',authRoute);

