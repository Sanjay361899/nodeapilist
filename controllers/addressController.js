const Address=require('../models/addressModel.js')

const addAddress=async(req,res)=>{
    try {
        const userAddress= await Address.findOne({user_id:req.body.user_id});
       const add=[]
        if(userAddress){
           for(let i=0;i<userAddress?.address?.length;i++){
            add.push(userAddress?.address[i]);
           }
           add.push(req.body.address)
        const updateAdd= await Address.findOneAndUpdate({user_id:req.body.user_id},{$set:{address:add}},{returnDocument:"after"});
        res.status(200).send({success:true,msg:"Address updation is saved.",data:updateAdd})

        }else{
        const data=await new Address({
            user_id:req.body.user_id,
            address:req.body.address
        })
        await data.save();
        res.status(200).send({success:true,msg:"Address is saved.",data:data})
    }
        
     

    } catch (error) {
        res.status(400).send({success:false,msg:error.message})
    }
}
module.exports={
    addAddress
}