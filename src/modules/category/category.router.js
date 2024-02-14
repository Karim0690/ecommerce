import express from 'express'
import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from './category.controller.js'
import subCategortRouter from '../subCategory/subCategory.router.js'
import { validation } from '../../middleware/validation.js'
import { createCategorySchema, getCategorySchema, updateCategorySchema } from './category.validation.js'
import { uploadFile } from '../../middleware/fileUpload.js'

const categortRouter = express.Router();




categortRouter.use('/:categoryId/subcategory',subCategortRouter);


categortRouter
    .route('/')
    .post(uploadFile('image','category'), validation(createCategorySchema), createCategory)
    .get(getAllCategories)

categortRouter
    .route('/:id')
    .get(validation(getCategorySchema),getCategory)
    .delete(validation(updateCategorySchema),deleteCategory)
    .put(validation(getCategorySchema),updateCategory)


export default categortRouter;