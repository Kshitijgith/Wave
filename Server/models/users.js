const mongoose = require('mongoose');

const Userschema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    request: {
        type: [{
            Request: { type: String, required: true },
            Message: { type: String, required: true }
        }]
    },
    Friends: {
        type: [{
            friendname: { type: String, required: true },
            dateOfFriend: { type: Date, default: Date.now }
        }]
    },
    Groups: {
        type: [{
            groupname: { type: String, required: true },
            groupid: { type: String, required: true }
        }]
    },
    Notification: {
        type: [{
            Notificationtype: { type: String, required: true },
            message: { type: String, required: true }
        }]
    }
});

module.exports = mongoose.model('User', Userschema);
