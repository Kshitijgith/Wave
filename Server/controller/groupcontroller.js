const Group=require('../models/group')
const User=require('../models/users')
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
const leavegroup=async(req,res)=>{
    const {Name,groupid}=req.body;
    if(!Name||!groupid){
        return res.status(400).json({success:false,message:'provide Name and groupid'});

    }
    if(!mongoose.isValidObjectId(groupid)){
        return res.status(400).json({success:false,message:'provide valid group id'});
    }
    try{
        const group=await Group.findById(groupid);
        if(!group){
            return res.status(400).json({success:false,message:'Group Not Found'});
        }
        const index=group.groupMembers.indexOf(Name);
        if(index==-1){
            return res.status(400).json({success:false,message:'Not Partof this group'})
        }
        group.groupMembers.splice(index,1);
        if(group.groupMembers.length===0){
            await group.deleteOne();
            return res.status(200).json({success:true,message:'Group deleted successfully'})
        }
        return res.status(200).json({success:true,message:'group leaved'});

    }
    catch(error){
res.status(500).json({success:false,message:'Internal Server Error'})
    }
    
}
const addmember=async(req,res)=>{
const {Name,AdderName,groupid}=req.body;
if(!Name||!AdderName||!groupid){
    return res.status(400).json({success:false,message:'Provide all fields'});

}

if(!mongoose.isValidObjectId(groupid)){
    return res.status(400).json({success:false,messsage:'provide valid groupid'});

}
try{

    const group=await Group.findById(groupid);
    if(!group){
        return res.status(400).json({success:false,message:'Group Not Found'});
    }
const user=await User.findOne({
    username:Name,
})
if(!user){
    return res.status(400).json({success:false,message:'User not found'});

}
if(!group.groupAdmin.includes(AdderName)){
    return res.status(400).json({success:false,message:'You are not admin'})
}
if(group.groupMembers.includes(Name)){
    return res.status(400).json({success:false,message:'User already present'})
}
group.groupMembers.push(Name);
user.Groups.push({
groupname:group.groupName,
groupid:groupid
})
await user.save();
await group.save();
return res.status(200).json({success:true,message:`${AdderName} added ${user.username}`})
}



catch(error){
    return res.status(500).json({success:false,message:'Internal server Error'});

}

}
const removemember=async(req,res)=>{
    const{groupid,member,Adminname}=req.body;
    if(!groupid||!member||!Adminname){
        return res.status(400).json({success:false,message:'provide all fields'})
    }
    if(!mongoose.isValidObjectId(groupid)){
        return res.status(400).json({success:false,message:'provide valid groupid'});
    }
    const group=await Group.findById(groupid);
    if(!group){
        return res.status(400).json({success:false,message:'group not exist'})
    }
    const user=await User.findOne({
        username:member
    })
    if(!user){
        return res.status(400).json({success:false,message:'user not found'});
    }
    try{
        if(group.groupMembers.includes(member)===false){
            return res.status(400).json({success:false,message:'user not part of group'});
            }
            const index=group.groupMembers.indexOf(member);
            console.log(index);
            group.groupMembers.splice(index,1);
            const uindex = user.Groups.findIndex(g=>g.groupname===group.groupName)
           user.Groups.splice(uindex,1);
           await group.save();
           await user.save();
           return res.status(200).json({success:true,message:`${Adminname} removed ${user.username}`})
            
    }
    catch(error){
        return res.status(500).json({success:false,message:false});
    }
    


}

module.exports={createGroup,Joingroup,leavegroup,addmember,removemember}