import multer from 'multer'
import { AppError } from '../utils/AppError.js'


let uploads = (folderName)=>{
        const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${folderName}`)
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, uniqueSuffix+'-'+file.originalname)
        }
    })
    
    function fileFilter (req, file, cb) {
        if(file.mimetype.startsWith('image')){
            cb(null, true)
        }else{  
            cb(new AppError('Images only'), false)
        }
    }
    return multer({storage,fileFilter})
}

export const uploadFile = (fieldName,folderName)=>{
    return uploads(folderName).single(fieldName)
}

export const uploadManyFile = (arrayOfFields,folderName)=>{
    return uploads(folderName).fields(arrayOfFields)
}