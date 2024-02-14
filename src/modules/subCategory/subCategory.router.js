import express from 'express'
import { createSubCategory, deleteSubCategory, getAllSubCategories, getSubCategory, updateSubCategory } from './subCategory.controller.js'
import { validation } from './../../middleware/validation.js';
import { crateSubCategorySchema, getSubCategorySchema, updateSubCategorySchema } from './subcategory.validation.js';
import { allowedTo, protectedRoutes } from '../../auth/auth.controller.js';

const subCategortRouter = express.Router({mergeParams:true})

subCategortRouter
    .route('/')
    .post(protectedRoutes,allowedTo('admin'),validation(crateSubCategorySchema),createSubCategory)
    .get(getAllSubCategories)

subCategortRouter
    .route('/:id')
    .get(validation(getSubCategorySchema),getSubCategory)
    .delete(protectedRoutes,allowedTo('admin'),validation(getSubCategorySchema),deleteSubCategory)
    .put(protectedRoutes,allowedTo('admin'),validation(updateSubCategorySchema),updateSubCategory)

export default subCategortRouter