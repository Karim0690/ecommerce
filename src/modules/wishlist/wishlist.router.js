import express from 'express'
import { allowedTo, protectedRoutes } from '../../auth/auth.controller.js';
import { addToWishlist, getAllUserWishlist, removeFromWishlist } from './wishlist.controller.js';


const wishlistRouter = express.Router()


wishlistRouter
    .route('/')
    .patch(protectedRoutes,allowedTo('user'),addToWishlist)
    .delete(protectedRoutes,allowedTo('user'),removeFromWishlist)
    .get(protectedRoutes,allowedTo('user'),getAllUserWishlist)

export default wishlistRouter