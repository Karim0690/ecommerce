import { categoryModel } from "../../../database/models/category.model.js"
import slug from 'slugify'
import { AppError } from "../../utils/AppError.js"
import { catchAsyncError } from "../../middleware/catchAsyncError.js"
import { Featuers } from "../../utils/Featuers.js"
import slugify from "slugify"


const createCategory = catchAsyncError(async(req,res)=>{
    req.body.slug = slugify(req.body.name)
    req.body.image = req.file.filename
    let result = new categoryModel(req.body)
    await result.save()
    res.json({message:"success",result})
})

const getAllCategories = catchAsyncError(async (req,res)=>{
    let featuers = new Featuers(categoryModel.find(),req.query).pagination().filter().sort().search().fields()
    let result = await featuers.mongooseQuery
    res.status(200).json({message:"success",page:featuers.page,result})
})

const getCategory = catchAsyncError(async (req,res,next)=>{
    const {id} = req.params
    let result = await categoryModel.findById(id)
    !result && next(new AppError(`category not found`,404))
    result && res.status(200).json({message:"success",result})
})

const updateCategory = catchAsyncError(async (req,res,next)=>{
    const {id} = req.params
    req.body.slug = slugify(req.body.name)
    req.body.image = req.file.filename
    let result = await categoryModel.findByIdAndUpdate(id, req.body,{new:true})
    !result && next(new AppError(`category not found`,404))
    result && res.status(200).json({message:"success",result})
})

const deleteCategory = catchAsyncError(async (req,res,next)=>{
    const {id} = req.params
    let result = await categoryModel.findByIdAndDelete(id)
    !result && next(new AppError(`category not found`,404))
    result && res.status(200).json({message:"success",result})
})

export{
    createCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory
}