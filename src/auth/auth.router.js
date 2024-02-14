import express from 'express'
import { signin, signup } from './auth.controller.js'



export const authRouter = express.Router()

authRouter.post('/signup',signup)
authRouter.post('/signin',signin)