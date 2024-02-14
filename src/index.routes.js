import { authRouter } from "./auth/auth.router.js"
import { globalError } from "./middleware/globalErrorMiddleware.js"
import addressRouter from "./modules/address/address.router.js"
import brandRouter from "./modules/brands/brand.router.js"
import cartRouter from "./modules/cart/cart.router.js"
import categortRouter from "./modules/category/category.router.js"
import couponRouter from "./modules/coupon/coupon.router.js"
import orderRouter from "./modules/order/order.router.js"
import productRouter from "./modules/product/product.router.js"
import reviewRouter from "./modules/review/review.router.js"
import subCategortRouter from "./modules/subCategory/subCategory.router.js"
import userRouter from "./modules/user/user.router.js"
import wishlistRouter from "./modules/wishlist/wishlist.router.js"
import { AppError } from "./utils/AppError.js"




export  function init (app){
    app.use('/categories',categortRouter)
    app.use('/subcategory',subCategortRouter)
    app.use('/brand',brandRouter)
    app.use('/product',productRouter)
    app.use('/user',userRouter)
    app.use('/review',reviewRouter)
    app.use('/wishlist',wishlistRouter)
    app.use('/address',addressRouter)
    app.use('/coupon',couponRouter)
    app.use('/cart',cartRouter)
    app.use('/order',orderRouter)
    app.use('/',authRouter)
    app.all('*', (req, res,next) => {
        next(new AppError(`can't find this route : ${req.originalUrl}`,404))
    })

    app.use(globalError)
}