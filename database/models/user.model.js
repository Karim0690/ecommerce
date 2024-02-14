import mongoose from "mongoose";
import bcrypt from 'bcrypt'



const userSchema =new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,'Username is required'],
        minLength:[1,'too short name']
    },
    email:{
        type:String,
        trim:true,
        required:[true,'email is required'],
        minLength:1,
        unique:[true,'email must be unique']
    },
    password:{
        type:String,
        require:true,
        minLength:[8,"password can't be less than 8 characters"]
    },
    passwordChangedAt: Date,
    phone:{
        type:String,
        required:[true,'Phone number is required'],
    },
    profilePic:String,
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    isActive:{
        type:Boolean,
        default:true
    },
    verified:{
        type:Boolean,
        default:false
    },
    wishlist:[{
        type:mongoose.Types.ObjectId,
        ref:'product'
    }],
    address:[{
        city:String,
        street:String,
        phone:String
    }]
},{timestamps:true})

userSchema.pre('save', function(){
    this.password = bcrypt.hashSync(this.password,8)
})

userSchema.pre('findOneAndUpdate', function(){
    if(this._update.password) this._update.password = bcrypt.hashSync(this._update.password,8)
})

export const userModel = mongoose.model('user',userSchema)