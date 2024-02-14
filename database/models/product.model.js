import mongoose from "mongoose";




const productSchema = mongoose.Schema({
    title:{
        type: String,
        unique:[true,'Product title is unque'],
        trim:true,
        required:[true,'Product title is requierd'],
        minLength:[2,'too short product name']
    },
    slug:{
        type: String,
        lowercase: true,
        required:true,
    },
    price:{
        type: Number,
        required:[true,'Product Price is requierd'],
        min: 0
    },
    priceAfterDiscount:{
        type: Number,
        min: 0
    },
    ratingAvg:{
        type: Number,
        min:[1,'rating avarage must be greater than 1'],
        max:[5,'rating avarage must be less than 1']
    },
    ratingCount:{
        type: Number,
        default:0,
        min:0
    },
    description:{
        type: String,
        minLength:[5,'Too short product description'],
        maxLength:[500,'Too long product description'],
        required:[true,'Product description is requierd'],
        trim:true,
    },
    quantity:{
        type: Number,
        default: 0,
        min:0,
        required:[true,'Product quantity is requierd'],
    },
    sold:{
        type: Number,
        default: 0,
        min:0
    },
    imageCover:String,
    images:[String],
    category:{
        type:mongoose.Types.ObjectId,
        ref:'category',
        required:[true,'Product category is requierd'],
    },
    subcategory:{
        type:mongoose.Types.ObjectId,
        ref:'subcategory',
        required:[true,'Product subcategory is requierd'],
    },
    brand:{
        type:mongoose.Types.ObjectId,
        ref:'brand',
        required:[true,'Product brand is requierd'],
    }
},{timestamps:true,toJSON: { virtuals: true }})

productSchema.post('init',(document)=>{
    document.imageCover = process.env.BASE_URL+'product/'+document.imageCover
    document.images = document.images.map(path=>process.env.BASE_URL+'product/'+path) 
})
productSchema.virtual('reviews', {
    ref: 'review',
    localField: '_id',
    foreignField: 'product',
    justOne: true
});

productSchema.pre(/^find/,function(){
    this.populate('reviews')
})
export const productModel = mongoose.model('product',productSchema)