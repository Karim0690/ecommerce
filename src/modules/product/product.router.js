import express from 'express'
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from './product.controller.js'
import { validation } from './../../middleware/validation.js';
import { createProductSchema, getProductSchema, updateProductSchema } from './product.validation.js';
import { uploadManyFile } from '../../middleware/fileUpload.js';
import { allowedTo, protectedRoutes } from '../../auth/auth.controller.js';

let fieldsArray = [{ name: 'imageCover', maxCount: 1 },{ name: 'images', maxCount: 10 }]

const productRouter = express.Router()


productRouter
    .route('/')
    .post(protectedRoutes,uploadManyFile(fieldsArray,'product'),validation(createProductSchema),createProduct)
    .get(getAllProducts)

productRouter
    .route('/:id')
    .get(validation(getProductSchema),getProduct)
    .delete(protectedRoutes,allowedTo('admin'),validation(getProductSchema),deleteProduct)
    .put(protectedRoutes,allowedTo('admin'),validation(updateProductSchema),updateProduct)

export default productRouter