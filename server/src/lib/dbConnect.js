import mongoose from "mongoose";
import { config } from "dotenv";
config();
export const dbConnect = async ()=>{

    try {
        await mongoose.connect(process.env.MONGO_URI,{
            dbName:"wd-compiler",
        });
        console.log("Database connected successfully")
    } catch (error) {
        console.log("Database connectoin error")
    }
    
}
