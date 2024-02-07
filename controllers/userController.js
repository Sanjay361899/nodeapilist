const User= require('../models/userModels.js');
const Otp=require('../models/otpModel.js')
const bcryptjs=require('bcryptjs')
const jwt = require('jsonwebtoken')
const config=require('../config/config.js')
const nodemailer=require('nodemailer');
const otpModel = require('../models/otpModel.js');
const sendMail = require('../helper/mailer.js');
const oneMinute = require('../helper/oneMinuteExpiry.js');
const sendResetPasswordMail= async(name,email,token,id)=>{
    try {
       const transporter= nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:config.config.emailUser,
                pass:config.config.emailPassword
            }
        })
        const mailOptions={
            from:config.config.emailUser,
            to:email,
            subject:'for reset password',
            html:'<p> hii '+name+', Please copy the link for reset and <a href="http://127.0.0.1:3000/reset-password?token='+id+'">reset your password </a> '
        }
        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.log(error);
            }else{
                console.log("mail has been sent");
            }
        })
    } catch (error) {
        res.status(400).send({success:false,msg:error.message})
    }
}
const securepass=async(password)=>{
    try{
     const passwordHash= await bcryptjs.hash(password,10);
     return passwordHash;
    }catch(error)
    {
        res.status(400).send(error.message);
    }
}
const secretKey=async(id)=>{
try{
const token = jwt.sign({ _id: id }, config.config.secret_jwt)
return token;
}
catch(error){
    throw (error.message)
}
}
const login_user= async(req,res)=>{
    try{
    const userData=await User.findOne({email:req.body.email})
    if(userData){
     const compare = await bcryptjs.compare(req.body.password,userData.password);
     if(compare){
        const keyToken=await secretKey(userData._id);
        const result={
            _id:userData._id,
            name:userData.name,
            email:userData.email,
            image:userData.image,
            type:userData.type,
            mobile:userData.mobile,
            token:keyToken
        }
        res.status(200).send({data:result,success:true,message:"logged in"})
     }else{
        res.status(200).send({success:false,message:"password is not correct"})
     }
    }else{
        res.status(200).send("user does not exist.")
    }}
    catch(error){
        res.status(400).send(error.message)
    }
}
const register_user=async(req,res)=>{
    try{
        console.log(req.body,"req.body");
        const spassword=await securepass(req.body.password)
const user = new User({
    name:req.body.name,
    email:req.body.email,
    mobile:req.body.mobile,
    password:spassword,
    image:req.file.filename,
    type:req.body.type
})
    const userData= await User.findOne({email:req.body.email})
    if(userData){
        res.status(200).send({message:"email already exist.",success:false});
    } else{
      const user_data= await user.save();
        res.status(200).send({message:"user data saved",sucess:true,data:user_data})
    }
    }catch(error){
        res.status(400).send(error.message);
    }
}

const update_password=async(req,res)=>{
    try {
        const user_data=await User.findOne({email:req.body.email});
        const pass=await bcryptjs.compare(req.body.password,user_data.password)
        if(pass){
         if(req.body.password==req.body.newpassword){
            res.status(200).send({message:"password is old used."})
         }else{
            const hpass=await securepass(req.body.newpassword);
            await User.findByIdAndUpdate({_id:user_data._id},{ $set:{
                password:hpass
            }})
            res.status(200).send({success:true,message:"password updated",data:user_data})
         }
        }else{
            res.status(200).send({message:"old password is not correct"})
        }
    } catch (error) {
        res.status(400).send({message:"error in updation."})
    }
}

const forget_password=async (req,res)=>{
try {
    const data=await User.findOne({email:req.body.email});
    if(data){
        const token=await secretKey(data._id);
        sendResetPasswordMail(data.name,data.email,token,data._id)
     res.status(200).send({success:true,message:"forget mail is send"})
    }else{
        res.status(200).send({message:"mail enter is not valid."})
    }
} catch (error) {
    res.status(400).send({message:"forget password request error"})
}
}
const reset_Password= async(req,res)=>{
    try {
        const iddata=req.query.token;
        const data = await User.findOne({_id:iddata});
       if(data){
        const hashpass1=await securepass(req.body.password);
        const userupdate=await User.findByIdAndUpdate({_id:id},{$set:{password:hashpass1}},{new:true})
        res.status(200).send({msg:"password changed through mail",success:true})
    }else{
     res.status(200).send({msg:"id is not correct in token",sucess:false})
    }
} catch (error) {
        res.status(400).send({success:false,msg:error.message})
    }
}
const generateRandom4Digit= async()=>{
   return Math.floor(1000+Math.random()*9000);
}
const mailOtp=async (req,res)=>{
    try {
        const userData=await User.findOne({email:req.body.email})

        if(userData){
             if(userData.is_verified!="0"){
            res.status(200).send({success:false,msg:"Already verified."})
             }else{
                const gen=await generateRandom4Digit();

        const alreadyotpSent=await otpModel.findOne({
            user_id:userData._id
        })
        const checkOneMinute=await oneMinute(alreadyotpSent.timestamp)
        if(checkOneMinute)
        {const cdate= new Date();
        await otpModel.findOneAndUpdate(
            {user_id:userData._id  },
            {otp:gen,timestamp:new Date(cdate.getTime())},
            {upsert:true, new:true,setDefaultsOnInsert:true}
            )
                const msg='<p> hii <b> '+userData.name+'</b>,</br> <h4>'+gen+'</h4></p>'
                const sub="User Verification otp."
                await sendMail(userData.email,sub,msg);
                res.status(200).send({success:true,msg:"otp sent to mail."})
             }else{
                res.status(200).send({success:false,msg:"otp resent to mail after 1 minute."})

             }
            }
    
        }else{
            res.status(200).send({success:false,msg:"email doesn't exist."})
        }
    } catch (error) {
        res.status(400).send({success:false,message:error.message})
    }
}
const verifyOtp=async(req,res)=>{
    try {
        const otpData=await otpModel.findOne({otp:req.body.otp})
        const threeMinuteCheck=await oneMinute(otpData.timestamp,timecheck=3);
        if(threeMinuteCheck){

        }else{
            res.status(200).send({message:""})
        }
    } catch (error) {
      res.status(400).send({success:false,message:error.message})
    }
}
module.exports={
    register_user,
    login_user,
    update_password,
    forget_password,
    reset_Password,
    mailOtp,
    verifyOtp
}