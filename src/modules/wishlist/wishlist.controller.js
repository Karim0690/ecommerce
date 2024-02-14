import { AppError } from "../../utils/AppError.js"
import { catchAsyncError } from "../../middleware/catchAsyncError.js"
import { userModel } from "../../../database/models/user.model.js"




const addToWishlist = catchAsyncError(async (req,res,next)=>{
    const {productId} = req.body
    let result = await userModel.findByIdAndUpdate(req.user._id, {$addToSet:{wishlist:productId}},{new:true})
    !result && next(new AppError(`Not found`,404))
    result && res.status(200).json({message:"success",result})
})

const removeFromWishlist = catchAsyncError(async (req,res,next)=>{
    const {productId} = req.body
    let result = await userModel.findByIdAndUpdate(req.user._id, {$pull:{wishlist:productId}},{new:true})
    !result && next(new AppError(`Not found`,404))
    result && res.status(200).json({message:"success",result})
})

const getAllUserWishlist = catchAsyncError(async (req,res,next)=>{
    let result = await userModel.findOne({_id:req.user._id}).populate('wishlist')
    !result && next(new AppError(`Not found`,404))
    result && res.status(200).json({message:"success",result:result.wishlist})
})


export{
    addToWishlist,
    removeFromWishlist,
    getAllUserWishlist
}