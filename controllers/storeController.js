const Store= require('../models/storeModels.js')
const User=require("../models/userModels.js")

const createStore=async(req,res)=>{
    try {
 
        const userData= await User.findOne({_id:req.body.vendor_id});
        if(userData){
         const storeData=await Store.findOne({vendor_id:req.body.vendor_id});
         if(storeData){
            res.status(200).send({success:false,message:"vendor store is already created"});
         }else{
           if(!req.body.longitude || !req.body.latitude){
              res.status(200).send({success:false,message:"longitude and latitude is not there."});
           }else{
            const store= new Store({
                vendor_id:req.body.vendor_id,
                buisness_email:req.body.buisness_email,
                logo:req.file.filename,
                pin:req.body.pin,
                address:req.body.address,
                location:{
                    type:"Point",
                    coordinates:[parseFloat(req.body.longitude),parseFloat(req.body.latitude)]
                }
            })
            await store.save();
            res.status(200).send({success:true,message:"store created"});
           }
         }
        }else{
            res.status(200).send({success:false,message:"vendor is not registered."})
        }
    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
    }
}
const storeData= async (id)=>{
    return await Store.findById({_id:id})
}
const findNearestStore=async(req,res)=>{
    try {
        const nearest=await Store.aggregate([
            {
              $geoNear: {
                 near: { type: "Point", coordinates: [ parseFloat(req.body.longitude),parseFloat(req.body.latitude)] },
                 key:"location",
                 minDistance: parseFloat(2000)*1609,
                 distanceLocation:'dist.location',
                 distanceField: "dist.calculated",
                 spherical: true,
              }
            }
         ]);
         res.status(200).send({success:true,msg:"nerest api is hitted", data:nearest});
    } catch (error) {
        res.status(400).send({success:false,msg:error.message})
    }
}

module.exports={
    createStore,
    storeData,
    findNearestStore
}