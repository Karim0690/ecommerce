import mongoose from "mongoose";

export function  dbConnection (){
    mongoose.connect(process.env.DB_Connection).then(()=>{
        console.log("Connected")
    }).catch((err)=>{
        console.log(err)
    })
}