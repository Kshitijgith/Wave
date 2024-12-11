const express=require('express')
const http=require('http');
const dotenv=require('dotenv');
const {Server}=require('socket.io');
const mongoose=require('mongoose');
const { connect } = require('http2');
dotenv.config();
const app=express();
const Connect=()=>{
    try{
        mongoose.connect(process.env.MONGO_URL);
        console.log('MONGODB connected')
    }
    catch(error){
       console.log(error)
    }
}
Connect();
const start=()=>{
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:'*',
        methods:['GET','POST']
    }
})

app.post('/',(req,res)=>{
    res.json({message:'Socket server and express server running'});
})

app.listen(4000,'0.0.0.0',
    console.log(`Socket Server running on port ${4000}`)
)
}
start()


