const Product=require('../models/productModel.js')
const Vendor=require('../models/storeModels.js')
const Category=require('../models/categoryModel.js')
const SubCategory=require('../models/subCategoryModel.js')

const addProduct=async (req,res)=>{
try {
    const arr=[];
for(let i=0;i<req.files.length;i++){
    arr[i]=req.files[i].filename;
}
const addProduct=new Product({
    vendor_id:req.body.vendor_id,
    store_id:req.body.store_id,
    name:req.body.name,
    price:req.body.price,
    discount:req.body.discount,
    category_id:req.body.category_id,
    subCategory_id:req.body.subCategory_id,
    images:arr
}) 
addProduct.save();
res.status(200).send({success:true,message:"product is added",data:addProduct})

} catch (error) {
    res.status(400).send(error.message)
}

}

module.exports={
    addProduct
}