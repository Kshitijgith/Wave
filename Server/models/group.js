const mongoose=require('mongoose');
const GroupSchema=new mongoose.Schema({
    groupName: { type: String, required: true },
    groupAdmin:{
      type:[String]
    },
    groupMembers: {
type:[String]
    }, // Array of usernames
    chats: [
      {
        senderName: { type: String },
        message: { type: String },
        timestamp: { type: Date, default: Date.now }
      }
    ],
    groupNotifications: [String]
})
module.exports=mongoose.model('Group',GroupSchema);