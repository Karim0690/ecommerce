import { AppError } from "../../utils/AppError.js"
import { catchAsyncError } from "../../middleware/catchAsyncError.js"
import { productModel } from './../../../database/models/product.model.js';
import slugify from 'slugify';
import { Featuers } from "../../utils/Featuers.js";


const createProduct = catchAsyncError(async(req,res)=>{
    req.body.slug = slugify(req.body.title)
    req.body.imageCover = req.files.imageCover[0].filename
    req.body.images = req.files.images.map((fname)=> fname.filename)
    let result = new productModel(req.body)
    await result.save()
    res.status(201).json({message:"success",result})
})

const getAllProducts = catchAsyncError(async (req,res)=>{
    let featuers = new Featuers(productModel.find(),req.query).pagination().filter().sort().search().fields()
    let result = await featuers.mongooseQuery
    res.status(200).json({message:"success",page:featuers.page,result})
})

const getProduct = catchAsyncError(async (req,res,next)=>{
    const {id} = req.params
    let result = await productModel.findById(id)
    !result && next(new AppError(`Product not found`,404))
    result &&  res.status(200).json({message:"success",result})
})

const updateProduct = catchAsyncError(async (req,res,next)=>{
    const {id} = req.params
    if(req.body.title) req.body.slug = slugify(req.body.title)
    let result = await productModel.findByIdAndUpdate(id, req.body,{new:true})
    !result && next(new AppError(`Product not found`,404))
    result && res.status(200).json({message:"success",result})
})

const deleteProduct = catchAsyncError(async (req,res,next)=>{
    const {id} = req.params
    let result = await productModel.findByIdAndDelete(id)
    !result && next(new AppError(`Product not found`,404))
    result && res.status(200).json({message:"success",result})
})

export{
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct
}