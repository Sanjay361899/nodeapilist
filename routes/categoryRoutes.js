const express=require("express")
const category_router=express()
category_router.use(express.json())
category_router.use(express.urlencoded({extended:true}))
const auth=require('../middleware/auth.js')
const categoryController=require('../controllers/categoryControllers.js')
category_router.post('/createCategory',auth.auth,categoryController.addCategory)
module.exports=category_router;