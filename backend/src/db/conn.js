
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const connectDB = async()=>{
    try{
        const connectionInstance = await mongoose.connect(process.env.DB);
        console.log(`mongodb connected! \nconnected on: ${connectionInstance.connection.host}`);
    }
    catch(err){
        console.log("mongodb connection failed: ",err)
    }
}


export default connectDB;