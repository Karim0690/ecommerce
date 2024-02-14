import mongoose from "mongoose";



const subcategorySchema = mongoose.Schema({
        name:{
        type:String,
        unique:[true,'Name is requierd'],
        trim: true,
        required:true,
        minLength:[2,'too Short brand name']
    },
    slug:{
        type: String,
        lowercase: true,
        required:true,
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:'category'
    }
},{timestamps:true})

export const subcategoryModel = mongoose.model('subcategory',subcategorySchema)