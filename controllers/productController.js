const Product=require('../models/productModel.js')
const categoryController=require('../controllers/categoryControllers.js')
const storeController=require('../controllers/storeController.js')
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
const getAllProducts= async (req,res)=>{
   try {
    const send=[];
    const category_data=await categoryController.getAllCategory();
    if(category_data.length>0){
        for(let i=0;i<category_data.length;i++){
            const product=[];
            const product_data=await Product.find({category_id:category_data[i]['_id'].toString()})
            if(product_data.length>0){
            for(let j=0;j<product_data.length;j++){
                const store_data=await storeController.storeData(product_data[j]['store_id'])
                product.push({
                    "product_name":product_data[j]['name'],
                    "images":product_data[j]['images'],
                    "store_address":store_data["address"]
                })
            }
           }
           send.push({
            "category_name":category_data[i]['category'],
            "product":product
           })
        }
        res.status(200).send({success:true,data:send})   
    }else{
        res.status(200).send({success:false,data:send})
    }
    
   } catch (error) {
    res.status(400).send({success:false,message:error.message})
   }
}

module.exports={
    addProduct,
    getAllProducts
}