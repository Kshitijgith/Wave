const user=require('../models/users');
const bcrypt=require('bcrypt');
const Adduser=async(req,res)=>{
    const {Name,Email,Password}=req.body
    if(!Name||!Email||!Password){
        return res.status(400).json({message:'provide username and password'});
    }
    try{
        let val=await user.findOne({email:Email});
        if(val){
             return res.status(400).json({message:'email is in use'})
        }
       
        const salt=await bcrypt.genSalt(10);
        const pass=await bcrypt.hash(Password,salt)
        const User=new user({
            username:Name,
            email:Email,
            password:pass
        })
        await User.save()
        res.status(200).json({User,message:'User Registered successfully'})
    }
    catch(error){
        console.log(error);
        res.status(500).json({error,message:'Internal Server error'})
    }
    

}
module.exports={Adduser}