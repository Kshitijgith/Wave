
const {login}=require('../controller/authcontroller')
const {authorize}=require('../middleware/auth')
const {createGroup,Joingroup}=require('../controller/groupcontroller')
const {Adduser}=require('../controller/CreateUser')
const express=require('express');
const router=express.Router();
router.post('/CreateUser',Adduser);
router.post('/CreateGroup',authorize,createGroup)
router.post('/login',login)
router.post('/joingroup',authorize,Joingroup)
module.exports=router