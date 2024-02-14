import { AppError } from "../../utils/AppError.js"
import { catchAsyncError } from "../../middleware/catchAsyncError.js"
import { Featuers } from '../../utils/Featuers.js';
import { cuoponModel } from './../../../database/models/coupon.model.js';
import qrcode from 'qrcode'


const createCoupon = catchAsyncError(async(req,res,next)=>{
    let result = new cuoponModel(req.body)
    await result.save()
    res.status(201).json({message:"success",result})
})

const getAllCoupons = catchAsyncError(async (req,res)=>{
    let featuers = new Featuers(cuoponModel.find(),req.query).pagination().filter().sort().search().fields()
    let result = await featuers.mongooseQuery
    res.status(200).json({message:"success",page:featuers.page,result})
})

const getCoupon = catchAsyncError(async (req,res,next)=>{

    const {id} = req.params
    let result = await cuoponModel.findById(id)
    let url = await qrcode.toDataURL(result.code)
    !result && next(new AppError(`Coupon not found`,404))
    result &&  res.status(200).json({message:"success",result,url})
})

const updateCoupon = catchAsyncError(async (req,res,next)=>{
    const {id} = req.params
    let result = await cuoponModel.findOneAndUpdate(id, req.body,{new:true})
    !result && next(new AppError(`Coupon not found`,404))
    result && res.status(200).json({message:"success",result})
})

const deleteCoupon = catchAsyncError(async (req,res,next)=>{
    const {id} = req.params
    let result = await cuoponModel.findByIdAndDelete(id)
    !result && next(new AppError(`Coupon not found`,404))
    result && res.status(200).json({message:"success",result})
})

export{
    createCoupon,
    getAllCoupons,
    getCoupon,
    updateCoupon,
    deleteCoupon
}