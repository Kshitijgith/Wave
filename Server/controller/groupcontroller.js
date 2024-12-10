const Group=require('../models/group')
const mongoose=require('mongoose')
const createGroup=async(req,res)=>{
    const {groupname,Name}=req.body;
    if(!groupname||!Name){
        return res.status(401).json({success:false,message:'Provide Name and GroupName'})
    }
    try{
        const group=new Group({
            groupName:groupname,
            groupAdmin:[Name],
            groupMembers:[Name],
        })
        await group.save();
        res.status(200).json({success:true,message:'Group Created Successfully'})
    }
    catch(error){
res.status(500).json({success:false,message:'Internal Server Error'})
    }
}
const Joingroup=async(req,res)=>{
const{groupid,Name}=req.body;
if(!groupid){
    return res.status(400).json({success:false,message:'plese provide group id'});
}
if (!mongoose.isValidObjectId(groupid)){
    return res.status(400).json({success:false,message:'Provide valid groupid'})
}
try{

    const groupp=await Group.findById(groupid);
    if (groupp && groupp.groupMembers.includes(Name)) {
        return res.status(400).json({success:false,message:'already part of group'})
    } 
    
    
    if(!groupp){
        return res.status(400).json({message:'group not found'});
    
    }
const group=await Group.findOneAndUpdate(
id,
{$push:{groupMembers:Name}},
{new:true}
)

res.status(200).json({success:true,message:'Group joined successfully'})

}
catch(error){
    res.status(500).json({success:false,message:'internal server Error'})
}
}
module.exports={createGroup,Joingroup}