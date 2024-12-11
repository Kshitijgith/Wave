
const {login}=require('../controller/authcontroller')
const {authorize}=require('../middleware/auth')
const {createGroup,Joingroup,leavegroup,addmember,removemember}=require('../controller/groupcontroller')
const {Adduser}=require('../controller/CreateUser')
const express=require('express');
const router=express.Router();
router.post('/CreateUser',Adduser);
router.post('/CreateGroup',authorize,createGroup)
router.post('/login',login)
router.post('/joingroup',authorize,Joingroup)
router.post('/leavegroup',authorize,leavegroup);
router.post('/addmember',authorize,addmember);
router.post('/removemember',authorize,removemember);
module.exports=router