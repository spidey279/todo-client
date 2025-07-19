import mongoose from "mongoose"

export default function connectDB(){ 
       mongoose.connect(process.env.MONGODB_URI).then(()=>console.log("db connected"))
}

