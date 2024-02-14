import joi from 'joi'

export const reviewSchema = joi.object({
    comment: joi.string().min(2).max(256).required(),
    product: joi.string().hex().length(24).required(),
    user: joi.string().hex().length(24).required(),
    rating: joi.number().min(1).max(5).required(),
})

export const getReviewSchema = joi.object({
    id: joi.string().hex().length(24).required()
})

export const updateReviewSchema = joi.object({
    id: joi.string().hex().length(24).required(),
    comment: joi.string().min(2).max(256),
    product: joi.string().hex().length(24),
    user: joi.string().hex().length(24),
    rating: joi.number().min(1).max(5),
})
