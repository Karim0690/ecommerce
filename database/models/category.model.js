import mongoose from "mongoose";



const categorySchema = mongoose.Schema({
    name:{
        type:String,
        unique:[true,'Name is requierd'],
        trim: true,
        required:true,
        minLength:[2,'too Short category name']
    },
    slug:{
        type: String,
        lowercase: true,
        required:true,
    },
    image:String
},{timestamps: true})

categorySchema.post('init',(document)=>{
    document.image = process.env.BASE_URL+"categories/"+document.image
})


export const categoryModel = mongoose.model('category',categorySchema)