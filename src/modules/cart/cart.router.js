import express from 'express'
import { allowedTo, protectedRoutes } from '../../auth/auth.controller.js';
import { addProductToCart, applyCoupon, getLoggedUserCart, removProductFromCart, updateQuantity } from './cart.controller.js';


const cartRouter = express.Router()


cartRouter
    .route('/')
    .post(protectedRoutes,allowedTo('user'),addProductToCart)
    .put(protectedRoutes,allowedTo('user'),applyCoupon)
    .get(protectedRoutes,allowedTo('user'),getLoggedUserCart)

cartRouter
    .route('/:id')
    .delete(protectedRoutes,allowedTo('admin','user'),removProductFromCart)
    .put(protectedRoutes,allowedTo('admin','user'),updateQuantity)

export default cartRouter