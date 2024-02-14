import mongoose from "mongoose";



const brandSchema = mongoose.Schema({
    name:{
        type:String,
        unique:[true,'Name is requierd'],
        trim: true,
        required:true,
        minLength:[2,'too Short brand name']
    },
    slug:{
        type:String,
        lowercase: true,
        required:true,
    },
    logo: String,
},{timestamps:true})

brandSchema.post('init',(document)=>{
    document.logo = process.env.BASE_URL+"brand/"+document.logo
})

export const brandModel = mongoose.model('brand',brandSchema)