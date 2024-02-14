import joi from 'joi'

export const userSchema = joi.object({
    name: joi.string().min(2).max(24).required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: joi.string().pattern(new RegExp('^(\\+201|01|00201)[0-2,5]{1}[0-9]{8}$')).required(),
})

export const getUserSchema = joi.object({
    id: joi.string().hex().length(24).required()
})

export const updateUserSchema = joi.object({
    id: joi.string().hex().length(24).required(),
    name: joi.string().min(2).max(24),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: joi.string().pattern(new RegExp('^(\\+201|01|00201)[0-2,5]{1}[0-9]{8}$')),
})
