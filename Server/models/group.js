const mongoose=require('mongoose');
const GroupSchema=new mongoose.Schema({
    groupName: { type: String, required: true },
    groupId: { type: String, required: true },
    groupMembers: [String], // Array of usernames
    chats: [
      {
        senderName: { type: String },
        message: { type: String },
        timestamp: { type: Date, default: Date.now }
      }
    ],
    groupNotifications: [String]
})
module.exports=mongoose.Model('Group',GroupSchema);