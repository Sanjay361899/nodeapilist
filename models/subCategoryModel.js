const mongoose=require("mongoose");

const subSchema=mongoose.Schema({
    category_id:{
        type:String,
        required:true
    },
    subCategory:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("SubCategory",subSchema)