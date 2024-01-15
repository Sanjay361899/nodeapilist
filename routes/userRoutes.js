const express=require('express');
const user_route=express();
user_route.use(express.json())
user_route.use(express.urlencoded({extended: true}))
const path=require('path');
const multer=require('multer');
const auth=require('../middleware/auth.js')
user_route.use(express.static('public'));
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
    cb(null,path.join(__dirname,'../public/userImage'),(error,success)=>{
        if(error) throw error;
    })
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'-'+file.originalname,(error1,success1)=>{
            if(error1) throw error1;
        })
    }
})
const upload=multer({storage:storage})
const userController=require('../controllers/userController.js')
user_route.post('/register',upload.single('image'),userController.register_user);
user_route.post('/login',userController.login_user);
user_route.get('/test',auth.auth,(req,res)=>{
    res.status(200).send({message:"api fetched"})
});
user_route.post('/update',auth.auth,userController.update_password)
user_route.post('/forget',userController.forget_password)
module.exports=user_route;