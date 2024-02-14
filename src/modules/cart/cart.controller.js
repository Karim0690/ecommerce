import { AppError } from "../../utils/AppError.js"
import { catchAsyncError } from "../../middleware/catchAsyncError.js"
import { Featuers } from '../../utils/Featuers.js';
import { cartModel } from "../../../database/models/cart.model.js";
import { productModel } from './../../../database/models/product.model.js';
import { cuoponModel } from "../../../database/models/coupon.model.js";

function calcTotalPrice(cart){
    let totalPrice = 0
    cart.cartItems.forEach(elem=>{
        totalPrice+= elem.quantity*elem.price
    })
    cart.totalPrice = totalPrice
}

const addProductToCart = catchAsyncError(async(req,res,next)=>{
    let product = await productModel.findById(req.body.product)
    if(!product) return next(new AppError('Product not found',401))
    req.body.price = product.price
    let cart = await cartModel.findOne({user:req.user._id})
    if(!cart){
        let result = new cartModel({
            user:req.user._id,
            cartItems:[req.body],
        })
        calcTotalPrice(result)
        await result.save()
        return res.status(201).json({message:"success",result})
    }
    let item = cart.cartItems.find((elem)=> elem.product == req.body.product)
    if(item){
        item.quantity += 1
    }else{
        cart.cartItems.push(req.body)
    }
    calcTotalPrice(cart)
    if(cart.discount){
        cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * cart.discount)/100
    }
    await cart.save()
    res.status(201).json({message:"success",cart})
})

const removProductFromCart = catchAsyncError(async (req,res,next)=>{
    let result = await cartModel.findOneAndUpdate({user:req.user._id}, {$pull:{cartItems:{_id:req.params.id}}},{new:true})
    calcTotalPrice(result)
    if(result.discount){
        result.totalPriceAfterDiscount = result.totalPrice - (result.totalPrice * result.discount)/100
    }
    !result && next(new AppError(`Product not found`,401))
    result && res.status(200).json({message:"success",result})
})

const updateQuantity = catchAsyncError(async(req,res,next)=>{
    let product = await productModel.findById(req.params.id)
    if(!product) return next(new AppError('Product not found',401))

    let cart = await cartModel.findOne({user:req.user._id})

    let item = cart.cartItems.find((elem)=> elem.product == req.params.id)
    if(item){
        item.quantity = req.body.quantity
    }
    calcTotalPrice(cart)
    if(cart.discount){
        cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * cart.discount)/100
    }
    await cart.save()
    res.status(201).json({message:"success",cart})
})

const applyCoupon = catchAsyncError(async(req,res,next)=>{
    let coupon = await cuoponModel.findOne({code:req.body.code , expires:{$gt:Date.now()}})
    let cart = await cartModel.findOne({user:req.user._id})
    cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * coupon.discount)/100
    cart.discount = coupon.discount
    await cart.save()
    res.status(200).json({message:'success',cart})
})

const getLoggedUserCart = catchAsyncError(async(req,res,next)=>{
    let cart = await cartModel.findOne({user:req.user._id}).populate('cartItems.product')
    res.status(201).json({message:"success",cart})
})

export{
    addProductToCart,
    removProductFromCart,
    updateQuantity,
    applyCoupon,
    getLoggedUserCart
}