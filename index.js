const express=require('express');
const mongoose=require('mongoose');
const app=express();
const user_routes=require('./routes/userRoutes.js')
mongoose.connect('mongodb://127.0.0.1:27017/ecom')
app.use('/',user_routes)
app.listen(3000,()=>{
    console.log("server is connected on")
})