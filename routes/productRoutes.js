const { urlencoded } = require('body-parser');
const express=require('express')
const product_router=express();
product_router.use(express.json())
product_router.use(express.urlencoded({extended:true}));
const multer=require('multer')
const path=require('path')
product_router.use(express.static('public'))
const auth=require('../middleware/auth.js')
const productController=require('../controllers/productController.js')
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'../public/productImages'),(error,success)=>{
            if(error) throw error;
        })
    },
    filename:(req,file,cb)=>{
        const name=Date.now()+'-'+file.originalname;
        cb(null,name,(error,success)=>{
            if(error) throw error;
        })
    }
})
const upload=multer({storage:storage});
product_router.post('/addproduct',upload.array('images'),auth.auth,productController.addProduct);
module.exports=product_router;