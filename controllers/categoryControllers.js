const Category=require('../models/categoryModel.js')
const addCategory=async(req,res)=>{
try {
    const data=await  Category.find();
    if(data.length>0){
        var check=false;
     for(var i=0;i<data.length;i++){
        if(data[i].category.toLowerCase()==req.body.category.toLowerCase()){
            check=true;
            break;
        }
     }
     if(check){
        res.status(200).send({success:false,message:"category already existing."})
     }else{
        const cat=new Category({
            category:req.body.category
        });
        await cat.save()
        res.status(200).send({success:true,message:"category created.",data:cat})
     }
    }else{
        const categ=new Category({
            category:req.body.category
        });
        await categ.save()
        res.status(200).send({success:true,message:"category created.",data:categ})
    }
} catch (error) {
    res.status(400).send(error.message)
}
}
const getAllCategory=async ()=>{
    return await Category.find();
}

module.exports={
    addCategory,
    getAllCategory
}