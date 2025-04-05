import express from 'express'
import WishListController from '../Controllers/WishListController.js'
import middleware from '../middleware/Auth.js'
const wishlistRouter = express.Router()

wishlistRouter.post("/addWishListByUser",middleware.auth, WishListController.addWishListByUser)

wishlistRouter.delete('/removeWishListByUser', middleware.auth, WishListController.removeWishListByUser)

wishlistRouter.get('/getWishListByUser', middleware.auth, WishListController.getWishListByUser)

wishlistRouter.get('/getAllPropertiesWithInterestCount', middleware.auth, WishListController.getAllPropertiesWithInterestCount)

export default wishlistRouter