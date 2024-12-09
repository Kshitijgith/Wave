const dotenv=require('dotenv');
const mongoose=require('mongoose')
dotenv.config();

const ConnectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MONGODB CONNECTED')
        //   await mongoose.connect(process.env.MONGO_URL)
    }
    catch(error){
        console.log(error);
    }
}
module.exports=ConnectDB

