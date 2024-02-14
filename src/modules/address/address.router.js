import express from 'express'
import { allowedTo, protectedRoutes } from '../../auth/auth.controller.js';
import { addAddress, getAllUserAddress, removeFromAddress } from './address.controller.js';


const addressRouter = express.Router()


addressRouter
    .route('/')
    .patch(protectedRoutes,allowedTo('user'),addAddress)
    .delete(protectedRoutes,allowedTo('user'),removeFromAddress)
    .get(protectedRoutes,allowedTo('user'),getAllUserAddress)

export default addressRouter