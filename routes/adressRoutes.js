const express=require("express");
const address_router=express();
address_router.use(express.json());
address_router.use(express.urlencoded({extended:true}));
const auth=require('../middleware/auth.js')
const addressController=require("../controllers/addressController.js")
address_router.post('/address',auth.auth,addressController.addAddress)

module.exports=address_router;