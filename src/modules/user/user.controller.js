import { AppError } from "../../utils/AppError.js"
import { catchAsyncError } from "../../middleware/catchAsyncError.js"
import { Featuers } from '../../utils/Featuers.js';
import { userModel } from './../../../database/models/user.model.js';


const createUser = catchAsyncError(async(req,res,next)=>{
    let user= await userModel.findOne({email:req.body.email})
    if(user) return next(new AppError('Email already exist',409))
    let result = new userModel(req.body)
    await result.save()
    res.status(201).json({message:"success",result})
})

const getAllUsers = catchAsyncError(async (req,res)=>{
    let featuers = new Featuers(userModel.find(),req.query).pagination().filter().sort().search().fields()
    let result = await featuers.mongooseQuery
    res.status(200).json({message:"success",page:featuers.page,result})
})

const getUser = catchAsyncError(async (req,res,next)=>{
    const {id} = req.params
    let result = await userModel.findById(id)
    !result && next(new AppError(`User not found`,404))
    result &&  res.status(200).json({message:"success",result})
})

const updateUser = catchAsyncError(async (req,res,next)=>{
    const {id} = req.params
    let result = await userModel.findByIdAndUpdate(id, req.body,{new:true})
    !result && next(new AppError(`User not found`,404))
    result && res.status(200).json({message:"success",result})
})
const changeUserPassword = catchAsyncError(async (req,res,next)=>{
    const {id} = req.params
    req.body.passwordChangedAt = Date.now()
    let result = await userModel.findByIdAndUpdate(id, req.body,{new:true})
    !result && next(new AppError(`User not found`,404))
    result && res.status(200).json({message:"success",result})
})

const deleteUser = catchAsyncError(async (req,res,next)=>{
    const {id} = req.params
    let result = await userModel.findByIdAndDelete(id)
    !result && next(new AppError(`User not found`,404))
    result && res.status(200).json({message:"success",result})
})

export{
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    changeUserPassword
}