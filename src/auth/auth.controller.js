import { catchAsyncError } from './../middleware/catchAsyncError.js';
import { userModel } from './../../database/models/user.model.js';
import { AppError } from './../utils/AppError.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const signup = catchAsyncError(async (req,res,next)=>{
    let user = await userModel.findOne({email:req.body.email})
    if(user) return next(new AppError('email already exist!',409))
    let createUser = new userModel(req.body)
    await createUser.save()
    res.json({message:"success",createUser})
})

export const signin = catchAsyncError(async (req,res,next)=>{
    const {email,password} = req.body
    let user = await userModel.findOne({email})
    if(user && await bcrypt.compare(password, user.password)){
        let token = jwt.sign({name:user.name,_id:user._id,role:user.role},process.env.SECRET_KEY)
        return res.json({message:'success',token})
    }else{
        next(new AppError('Incorrect Email or Password!',401))
    }
})


export const  protectedRoutes = catchAsyncError(async(req,res,next)=>{
    let {token} = req.headers
    if(!token) return next(new AppError('Token not provided',401))
    let decoded = jwt.verify(token,process.env.SECRET_KEY)

    let user = await userModel.findById(decoded._id)
    if(!user) return next(new AppError('Invalid Token!',401))
    if(user.passwordChangedAt){
        let changePasswordDate = parseInt(user.passwordChangedAt.getTime()/1000)
        if(changePasswordDate > decoded.iat) return next(new AppError('Invalid Token!',401))
    }
    req.user = user
    next()
})

export const allowedTo=(...roles)=>{
    return catchAsyncError(async (req,res,next)=>{
        if(!roles.includes(req.user.role))
            return next(new AppError('You are not authorized "You are a"'+req.user.role,401))
        next()
    })
}