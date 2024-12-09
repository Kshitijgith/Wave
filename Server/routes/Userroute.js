const {Adduser}=require('../controller/CreateUser');
const {login}=require('../controller/authcontroller')
const {authorize}=require('../middleware/auth')
const express=require('express');
const router=express.Router();
router.post('/CreateUser',authorize,Adduser);
router.post('/login',login)
module.exports=router