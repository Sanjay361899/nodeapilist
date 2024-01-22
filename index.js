const express=require('express');
const mongoose=require('mongoose');
const app=express();
const user_routes=require('./routes/userRoutes.js')
mongoose.connect('mongodb://127.0.0.1:27017/ecom')
app.use('/',user_routes)

const store_routes=require('./routes/storeRoutes.js')
app.use('/',store_routes);

const category_router=require('./routes/categoryRoutes.js')
app.use('/',category_router);


app.listen(3000,()=>{
    console.log("server is connected on")
})