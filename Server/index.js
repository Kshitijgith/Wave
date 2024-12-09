const express=require('express');
const ConnectDB=require('./config/connectdb');
const cors=require('cors');
const app=express();
const dotenv=require('dotenv');

dotenv.config();
ConnectDB();
app.use(cors()

)
app.use(express.json());
app.use('/user',require('./routes/Userroute'))
app.get('/',(req,res)=>{
    res.json({message:'Server Running'});
})

app.listen(process.env.PORT,'0.0.0.0',()=>{
    console.log(`server listen on port ${process.env.PORT}`);
})