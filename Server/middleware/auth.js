const jwt=require('jsonwebtoken');
const user=require('../models/users');
const dotenv=require('dotenv');
dotenv.config();
const authorize=async(req,res,next)=>{
    let token;
    if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.slice(7);
    }
    if(!req.headers.authorization.startsWith('Bearer')){
        return res.status(401).json({success:false,message:'Token should Start with Bearer'})
    }
   
    if(!token){
        return res.status(401).json({success:false,message:'No token'});

    }
    try{
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        const Email=decode.email;
        const User=await user.findOne({email:Email});
        if(!User){
            return res.status(401).josn({success:false,message:'unauthorized'})
        }
        req.user=User;
        next()
    }
    catch(error){
if(error.name==='TokenExpiredError'){
    return res.status(401).json({success:false,message:'Token Expired'})
}
else if(error.name==='JsonWebTokenError'){
    return res.status(401).json({success:false,message:'Jwt Malformed'})

}
else{
    return res.status(500).json({success:false,message:'Internal server error'})
}
    }
    
}
module.exports={authorize}