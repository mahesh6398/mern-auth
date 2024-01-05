// require('dotenv').config()
import 'dotenv/config'
import express from "express";
import mongoose from 'mongoose';
import UserRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';


const app = new express();
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
console.log('connected');
})
.catch((err)=>{
    console.log(err)
})


// app.get('/',(req,res)=>{
//     res.json({
//         "message":"connected"
//     })
// })


app.listen(process.env.PORT,()=>{
    console.log(`server listening on 3000`)
})


app.use("/api/user",UserRoutes)
app.use('/api/auth',authRoutes)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal  error"

    return res.status(statusCode).json({
        success:false,
        message,
        statusCode,
    });
});