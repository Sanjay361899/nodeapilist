const jwt=require('jsonwebtoken')
const config=require('../config/config.js')

const auth=(req,res,next)=>{
    try{
    const token = req.body.token||req.query.token||req.headers["authorization"];
    if(!token){
        res.status(200).send({success:false,message:"token is required for fetching this api no token found."})
    }
 else{ 
      const descode=jwt.verify(token,config.config.secret_jwt);
      req.users=descode;
      next();
    }
}catch(error){
        res.status(400).send({message:"error in token fetching"})
    }
   
}
module.exports={
    auth
}