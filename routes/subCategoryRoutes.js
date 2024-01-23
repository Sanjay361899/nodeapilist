const express=require("express");
const sub_router=express()
sub_router.use(express.json())
sub_router.use(express.urlencoded({extended:true}))
const auth=require('../middleware/auth.js')
const subCategoryController= require('../controllers/subCategoryController.js')
sub_router.post('/subCategory',auth.auth,subCategoryController.addSubCategory)

module.exports=sub_router;