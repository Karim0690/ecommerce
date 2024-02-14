import express from 'express'
import { allowedTo, protectedRoutes } from '../../auth/auth.controller.js';
import { createCoupon, deleteCoupon, getAllCoupons, getCoupon, updateCoupon } from './coupon.controller.js';


const couponRouter = express.Router()


couponRouter
    .route('/')
    .post(protectedRoutes,allowedTo('user'),createCoupon)
    .get(getAllCoupons)

couponRouter
    .route('/:id')
    .get(getCoupon)
    .delete(protectedRoutes,allowedTo('admin','user'),deleteCoupon)
    .put(protectedRoutes,allowedTo('admin','user'),updateCoupon)

export default couponRouter