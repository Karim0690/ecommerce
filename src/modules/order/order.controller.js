import { AppError } from "../../utils/AppError.js"
import { catchAsyncError } from "../../middleware/catchAsyncError.js"
import { cartModel } from "../../../database/models/cart.model.js";
import { productModel } from './../../../database/models/product.model.js';
import { orderModel } from './../../../database/models/order.model.js';
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51OjkxPBscFNFfdL09TqZRthbI1hD9fynn33lDrCut0pNnIqsRQnX3gz7wUfPZJEosPhfrSSxhuyqx3ILjpK7nZNc00CL6bOXiZ');

const createCashOrder = catchAsyncError(async (req,res,next)=>{
    const cart = await cartModel.findById(req.params.id)
    const totalOrderPrice = cart.totalPriceAfterDiscount? cart.totalPriceAfterDiscount : cart.totalPrice;
    const order = new orderModel({
        user:req.user._id,
        cartItems:cart.cartItems,
        totalOrderPrice,
        shippingAddress:req.body.shippingAddress,
    })
    await order.save()
    let options = cart.cartItems.map(item=>({
        updateOne:{
            filter:{_id:item.product},
            update:{$inc:{quantity:-item.quantity, sold:item.quantity}}
        }
    }))
    await productModel.bulkWrite(options)
    await cartModel.findByIdAndDelete(req.params.id)
    return res.status(201).json({message:"success",order})
})
const getSpecificOrder = catchAsyncError(async (req,res,next)=>{
    let order = await orderModel.findOne({user:req.user._id}).populate('cartItems.product')
    res.status(200).json({message:"success",order})
})
const getallOrders = catchAsyncError(async (req,res,next)=>{
    let order = await orderModel.find({}).populate('cartItems.product')
    res.status(200).json({message:"success",order})
})
const createCheckOutSession = catchAsyncError(async (req,res,next)=>{
    const cart = await cartModel.findById(req.params.id)
    const totalOrderPrice = cart.totalPriceAfterDiscount? cart.totalPriceAfterDiscount : cart.totalPrice;
    let session = await stripe.checkout.sessions.create({
        line_items:[
            {
                price_data:{
                    currency:'egp',
                    unit_amount : totalOrderPrice * 100,
                    product_data:{
                        name : req.user.name
                    }
                },
                quantity:1
            }
        ],
        mode:'payment',
        success_url:'https://www.google.com/',
        cancel_url:'https://www.google.com/',
        customer_email:req.user.email,
        client_reference_id:req.params.id,
        metadata:req.body.shippingAddress
    })
    res.status(201).json({message:'success',session})
})

export{
    createCashOrder,
    getSpecificOrder,
    getallOrders,
    createCheckOutSession
}