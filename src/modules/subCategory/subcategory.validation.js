import joi from 'joi'

export const crateSubCategorySchema = joi.object({
    name: joi.string().min(2).max(24).required(),
    category: joi.string().hex().length(24).required(),
})

export const getSubCategorySchema = joi.object({
    id: joi.string().hex().length(24).required()
})

export const updateSubCategorySchema = joi.object({
    id: joi.string().hex().length(24).required(),
    category: joi.string().hex().length(24),
})

