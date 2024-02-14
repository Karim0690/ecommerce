import slug from 'slugify'
import { AppError } from "../../utils/AppError.js"
import { catchAsyncError } from "../../middleware/catchAsyncError.js"
import { brandModel } from './../../../database/models/brand.model.js';
import { Featuers } from '../../utils/Featuers.js';
import slugify from 'slugify';


const createBrand = catchAsyncError(async(req,res)=>{
    req.body.slug = slugify(req.body.name)
    req.body.logo = req.file.filename
    let result = new brandModel(req.body)
    await result.save()
    res.status(201).json({message:"success",result})
})

const getAllBrands = catchAsyncError(async (req,res)=>{
    let featuers = new Featuers(brandModel.find(),req.query).pagination().filter().sort().search().fields()
    let result = await featuers.mongooseQuery
    res.status(200).json({message:"success",page:featuers.page,result})
})

const getBrand = catchAsyncError(async (req,res,next)=>{
    const {id} = req.params
    let result = await brandModel.findById(id)
    !result && next(new AppError(`Brand not found`,404))
    result &&  res.status(200).json({message:"success",result})
})

const updateBrand = catchAsyncError(async (req,res,next)=>{
    const {id} = req.params
    req.body.slug = slugify(req.body.name)
    req.body.logo = req.file.filename
    let result = await brandModel.findByIdAndUpdate(id, req.body,{new:true})
    !result && next(new AppError(`Brand not found`,404))
    result && res.status(200).json({message:"success",result})
})

const deleteBrand = catchAsyncError(async (req,res,next)=>{
    const {id} = req.params
    let result = await brandModel.findByIdAndDelete(id)
    !result && next(new AppError(`Brand not found`,404))
    result && res.status(200).json({message:"success",result})
})

export{
    createBrand,
    getAllBrands,
    getBrand,
    updateBrand,
    deleteBrand
}