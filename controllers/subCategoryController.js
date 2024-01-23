const SubCategory=require('../models/subCategoryModel.js')
const Category=require('../models/categoryModel.js')


const addSubCategory=async (req,res)=>{
    try {
        const categoryData= await Category.findById({_id:req.body.category_id})
        if(categoryData){
            const data=await  SubCategory.find();
            var check=false;
            if(data.length>0){
             for(var i=0;i<data.length;i++){
                if(data[i].subCategory.toLowerCase()==req.body.subCategory.toLowerCase()){
                    check=true;
                    break;
                }
             }}
             if(check){
                res.status(200).send({success:false,message:"already category exist"})

             }else{
            const subCat=new SubCategory({
                category_id:req.body.category_id,
                subCategory:req.body.subCategory
            })
            subCat.save();
            res.status(200).send({success:true,message:"subcategory added under category"})

        }}else{
        res.status(200).send({success:false,message:"no such category exist"})

        }
    } catch (error) {
        res.status(400).send({success:false,message:error.message})
    }
}
module.exports={
    addSubCategory
}