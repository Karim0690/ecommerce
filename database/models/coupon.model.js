import mongoose from "mongoose";




const couponSchema = mongoose.Schema({
    code:{
        type:String,
        trim:true,
        required:[true,'coupon is required'],
        unique:true
    },
    discount:{
        type:Number,
        min:0,
        required:[true,'coupon discount is required']
    },
    expires:{
        type:Date,
        required:[true,'coupon date required']
    }
},{timestamps:true})

export const cuoponModel = mongoose.model('coupon',couponSchema)