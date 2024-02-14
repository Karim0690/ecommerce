import joi from 'joi'

export const createProductSchema = joi.object({
    title: joi.string().min(2).max(24).required(),
    description: joi.string().min(2).max(500).required(),
    price: joi.number().min(0.1).required(),
    ratingAvg: joi.number().min(1).max(5).required(),
    ratingCount: joi.number().min(1).required(),
    quantity: joi.number().min(1).required(),
    sold: joi.number().required(),
    category: joi.string().hex().length(24).required(),
    subcategory: joi.string().hex().length(24).required(),
    brand: joi.string().hex().length(24).required(),
})

export const updateProductSchema = joi.object({
    id: joi.string().hex().length(24).required(),
    title: joi.string().min(2).max(24),
    description: joi.string().min(2).max(500),
    price: joi.number().min(0.1),
    ratingAvg: joi.number().min(1).max(5),
    ratingCount: joi.number().min(1),
    quantity: joi.number().min(1),
    sold: joi.number(),
    category: joi.string().hex().length(24),
    subcategory: joi.string().hex().length(24),
    brand: joi.string().hex().length(24),
})

export const getProductSchema = joi.object({
    id: joi.string().hex().length(24).required(),
})
