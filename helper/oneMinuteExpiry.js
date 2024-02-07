const oneMinute=async(otpDate,time=1)=>{
    try {
        var cdate=new Date();
        var differenceDate=(cdate.getTime()-otpDate)/1000;
        differenceDate/=60;
        console.log(differenceDate,"difference in date");
        if(differenceDate>time){
            return true;
        }
        return false;
    } catch (error) {
        console.log({message:error.message,err:"erorr"})
    }
}
module.exports=oneMinute;