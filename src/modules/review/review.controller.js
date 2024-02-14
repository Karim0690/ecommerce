import { AppError } from "../../utils/AppError.js"
import { catchAsyncError } from "../../middleware/catchAsyncError.js"
import { Featuers } from '../../utils/Featuers.js';
import { reviewModel } from './../../../database/models/review.model.js';


const createReview = catchAsyncError(async(req,res,next)=>{
    req.body.user = req.user._id
    let isReviewed = await reviewModel.findOne({user:req.user._id,product:req.body.product})
    if(isReviewed) return next(new AppError('You made review before',409))
    let result = new reviewModel(req.body)
    await result.save()
    res.status(201).json({message:"success",result})
})

const getAllReviews = catchAsyncError(async (req,res)=>{
    let featuers = new Featuers(reviewModel.find(),req.query).pagination().filter().sort().search().fields()
    let result = await featuers.mongooseQuery
    res.status(200).json({message:"success",page:featuers.page,result})
})

const getReview = catchAsyncError(async (req,res,next)=>{
    const {id} = req.params
    let result = await reviewModel.findById(id)
    !result && next(new AppError(`Review not found`,404))
    result &&  res.status(200).json({message:"success",result})
})

const updateReview = catchAsyncError(async (req,res,next)=>{
    const {id} = req.params
    let result = await reviewModel.findOneAndUpdate({_id:id,user:req.user_id}, req.body,{new:true})
    !result && next(new AppError(`Review not found`,404))
    result && res.status(200).json({message:"success",result})
})

const deleteReview = catchAsyncError(async (req,res,next)=>{
    const {id} = req.params
    let result = await reviewModel.findByIdAndDelete(id)
    !result && next(new AppError(`Review not found`,404))
    result && res.status(200).json({message:"success",result})
})

export{
    createReview,
    getAllReviews,
    getReview,
    updateReview,
    deleteReview
}