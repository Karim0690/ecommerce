import express from 'express'
import { validation } from './../../middleware/validation.js';
import { uploadFile } from '../../middleware/fileUpload.js';
import { changeUserPassword, createUser, deleteUser, getAllUsers, getUser, updateUser } from './user.controller.js';
import { getUserSchema, updateUserSchema, userSchema } from './user.validation.js';

const userRouter = express.Router()


userRouter
    .route('/')
    .post(uploadFile('logo','brand'),validation(userSchema),createUser)
    .get(getAllUsers)

userRouter
    .route('/:id')
    .get(validation(getUserSchema),getUser)
    .delete(validation(getUserSchema),deleteUser)
    .put(validation(updateUserSchema),updateUser)

userRouter.patch('/:id',validation(updateUserSchema),changeUserPassword)

export default userRouter