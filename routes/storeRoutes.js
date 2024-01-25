const express=require('express');
const store_routes=express();
store_routes.use(express.json())
store_routes.use(express.urlencoded({extended:true}))

const multer=require('multer');
const path=require('path');

store_routes.use(express.static('public'));

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'../public/storeImages'),(error,success)=>{
            if(error){
                throw error;
            }
        })
    },
    filename:(req,file,cb)=>{
        
        cb(null,Date.now()+'-'+file.originalname,(error,success)=>{
            if(error) throw error;
        })
    }
})
const upload= multer({storage:storage});
const storeController= require('../controllers/storeController.js')
const auth=require('../middleware/auth.js')
store_routes.post('/createStore',auth.auth,upload.single('logo'),storeController.createStore)
store_routes.post('/find-nearest-store',auth.auth,storeController.findNearestStore)

module.exports=store_routes;