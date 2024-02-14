import express from 'express'
import { createBrand, deleteBrand, getAllBrands, getBrand, updateBrand } from './brand.controller.js'
import { validation } from './../../middleware/validation.js';
import { brandSchema, getBrandSchema, updateBrandSchema } from './brand.validation.js';
import { uploadFile } from '../../middleware/fileUpload.js';
import { allowedTo, protectedRoutes } from '../../auth/auth.controller.js';

const brandRouter = express.Router()


brandRouter
    .route('/')
    .post(protectedRoutes,allowedTo('admin'),uploadFile('logo','brand'),validation(brandSchema),createBrand)
    .get(getAllBrands)

brandRouter
    .route('/:id')
    .get(validation(getBrandSchema),getBrand)
    .delete(protectedRoutes,allowedTo('admin'),validation(getBrandSchema),deleteBrand)
    .put(protectedRoutes,allowedTo('admin'),validation(updateBrandSchema),updateBrand)

export default brandRouter