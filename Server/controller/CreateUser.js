const user=require('../models/users');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv')
const tokengenrator=(id,email)=>{
    if(!id||!email){
        return 'provide id and email'
    }
    let token=jwt.sign({id,email},process.env.JWT_SECRET,
        {
            expiresIn:process.env.JWT_EXPIRE
        }
    )
    return token
}
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
let token=tokengenrator(User.id,User.email)
var v=jwt.decode(token);
v=v.email;

        res.status(200).json({User,token,v,message:'User Registered successfully'})
    }
    catch(error){
        console.log(error);
        res.status(500).json({error,message:'Internal Server error'})
    }
    

}
module.exports={Adduser}