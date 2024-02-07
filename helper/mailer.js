const config= require('../config/config.js')
const nodemailer=require('nodemailer')
const sendMail= async(email,sub,text)=>{
    try {
       const transporter=nodemailer.createTransport({
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
            subject:sub,
            html:text
        }
       transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.log(error);
            }else{
                console.log("mail has been sent");
            }
        })
    } catch (error) {
       console.log({msg:error});
    }
}
module.exports=sendMail;