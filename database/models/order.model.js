import mongoose from "mongoose";



const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref:'user'
    },
    cartItems:[{
        product:{type:mongoose.Types.ObjectId, ref:'product'},
        quantity:Number,
        price:Number
    }],
    totalOrderPrice:Number,
    shippingAddress:{
        street:String,
        city:String,
        phone:String
    },
    paymentMethod:{
        type:String,
        enum: ['card','cash'],
        default:'cash'
    },
    isPaid:{
        type:Boolean,
        default:false
    },
    isDeliverd:{
        type:Boolean,
        default:false
    },
    deliverdAt:Date
},{timestamps:true})


export const orderModel = mongoose.model('order',orderSchema)