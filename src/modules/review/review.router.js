import express from 'express'
import { validation } from './../../middleware/validation.js';
import { createReview, deleteReview, getAllReviews, getReview, updateReview } from './review.controller.js';
import { getReviewSchema, reviewSchema, updateReviewSchema } from './review.validation.js';
import { allowedTo, protectedRoutes } from '../../auth/auth.controller.js';


const reviewRouter = express.Router()


reviewRouter
    .route('/')
    .post(protectedRoutes,allowedTo('user'),validation(reviewSchema),createReview)
    .get(getAllReviews)

reviewRouter
    .route('/:id')
    .get(validation(getReviewSchema),getReview)
    .delete(protectedRoutes,allowedTo('admin','user'),validation(getReviewSchema),deleteReview)
    .put(protectedRoutes,allowedTo('admin','user'),validation(updateReviewSchema),updateReview)

export default reviewRouter