const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
const user=require('../models/users');
dotenv.config();
const genratetoken=(id,email)=>{
    return jwt.sign({id,email},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}
const login=async(req,res)=>{
    const{Email,Password}=req.body
    if(!Email||!Password){
        return res.status(400).json({message:'provide email and password'})
    }
    try{
        let val=await user.findOne({email:Email});
        if(!val){
            return res.status(400).json({message:'User does not exist'})
        }
        const salt=bcrypt.genSalt(10);
        
        const compare=await bcrypt.compare(Password,val.password);
        if(compare===true){
            const token=genratetoken(val.id,Email)
            return res.status(200).json({success:true,token,message:'login successful'})
        }
    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false,message:'Internal server error'})
    }
    
    


}
module.exports={login}

