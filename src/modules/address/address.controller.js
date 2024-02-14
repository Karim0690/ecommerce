import { AppError } from "../../utils/AppError.js"
import { catchAsyncError } from "../../middleware/catchAsyncError.js"
import { userModel } from "../../../database/models/user.model.js"




const addAddress = catchAsyncError(async (req,res,next)=>{
    let result = await userModel.findByIdAndUpdate(req.user._id, {$addToSet:{address:req.body}},{new:true})
    !result && next(new AppError(`Not found`,404))
    result && res.status(200).json({message:"success",result:result.address})
})

const removeFromAddress = catchAsyncError(async (req,res,next)=>{
    let result = await userModel.findByIdAndUpdate(req.user._id, {$pull:{address:{_id:req.body.address}}},{new:true})
    !result && next(new AppError(`Not found`,404))
    result && res.status(200).json({message:"success",result:result.address})
})

const getAllUserAddress = catchAsyncError(async (req,res,next)=>{
    let result = await userModel.findOne({_id:req.user._id}).populate('address')
    !result && next(new AppError(`Not found`,404))
    result && res.status(200).json({message:"success",result:result.address})
})


export{
    addAddress,
    removeFromAddress,
    getAllUserAddress
}