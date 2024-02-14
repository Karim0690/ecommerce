import express from 'express'
import { allowedTo, protectedRoutes } from '../../auth/auth.controller.js';
import { createCashOrder, createCheckOutSession, getSpecificOrder, getallOrders } from './order.controller.js';


const orderRouter = express.Router()


orderRouter
    .route('/')
    .get(protectedRoutes,allowedTo('admin','user'),getSpecificOrder)

orderRouter.get('/allorders',getallOrders)


orderRouter
    .route('/:id')
    .post(protectedRoutes,allowedTo('user'),createCashOrder)

orderRouter.post('/checkout/:id',protectedRoutes,allowedTo('user'),createCheckOutSession)

export default orderRouter