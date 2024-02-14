import slug from 'slugify'
import { AppError } from "../../utils/AppError.js"
import { catchAsyncError } from "../../middleware/catchAsyncError.js"
import { subcategoryModel } from './../../../database/models/subcategory.model.js';
import { Featuers } from '../../utils/Featuers.js';


const createSubCategory = catchAsyncError(async(req,res)=>{
    const {name,category} = req.body
    let result = new subcategoryModel({name,category,slug:slug(name)})
    await result.save()
    res.json({message:"success",result})
})

const getAllSubCategories = catchAsyncError(async (req,res)=>{
    let filter={}
    if(req.params.categoryId){
        filter={category:req.params.categoryId}
    }
    let featuers = new Featuers(subcategoryModel.find(filter),req.query).pagination().filter().sort().search().fields()
    let result = await featuers.mongooseQuery
    res.status(200).json({message:"success",page:featuers.page,result})
})

const getSubCategory = catchAsyncError(async (req,res,next)=>{
    const {id} = req.params
    let result = await subcategoryModel.findById(id)
    !result && next(new AppError(`subcategory not found`,404))
    result && res.json({message:"success",result})
})

const updateSubCategory = catchAsyncError(async (req,res,next)=>{
    const {id} = req.params
    const {name,category} = req.body
    let result = await subcategoryModel.findByIdAndUpdate(id, {name,category,slug:slug(name)},{new:true})
    !result && next(new AppError(`subcategory not found`,404))
    result && res.json({message:"success",result})
})

const deleteSubCategory = catchAsyncError(async (req,res,next)=>{
    const {id} = req.params
    let result = await subcategoryModel.findByIdAndDelete(id)
    !result && next(new AppError(`subcategory not found`,404))
    result && res.json({message:"success",result})
})

export{
    createSubCategory,
    getAllSubCategories,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory
}