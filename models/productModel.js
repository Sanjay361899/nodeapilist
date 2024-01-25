const mongoose=require('mongoose')
const productSchema=mongoose.Schema({
    vendor_id:{
        type:String,
        required:true
    },
    store_id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    discount:{
        type:String,
        required:true
    },
    category_id:{
        type:String,
        required:true
    },
    subCategory_id:{
        type:String,
        required:true
    },
    images:{
        type:Array,
        required:true,
        // validate:[ima,"file size should be less then 5"]
    }
})
function ima(val){
   return val.length<=2;
}
module.exports=mongoose.model("Product",productSchema);