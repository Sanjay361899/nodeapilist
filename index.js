const express=require('express');
const mongoose=require('mongoose');
const app=express();
const user_routes=require('./routes/userRoutes.js')
mongoose.connect('mongodb://127.0.0.1:27017/ecom')
app.use('/',user_routes)

const store_routes=require('./routes/storeRoutes.js')
app.use('/',store_routes);

const category_routes=require('./routes/categoryRoutes.js')
app.use('/',category_routes);

const sub_routes=require('./routes/subCategoryRoutes.js')
app.use('/',sub_routes);

const product_routes=require('./routes/productRoutes.js')
app.use('/',product_routes)

const address_routes=require('./routes/adressRoutes.js')
app.use('/',address_routes);

app.listen(3000,()=>{
    console.log("server is connected on")
})