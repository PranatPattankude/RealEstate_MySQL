import express from 'express'
import userController from '../Controllers/userController.js'
import middleware from '../middleware/Auth.js'
const userRouter = express.Router()


// Router.post('/registration',Controller.registration)


userRouter.post('/login', userController.login)

userRouter.post('/registration', userController.registration)

userRouter.delete('/deleteUser/:id', middleware.auth, middleware.adminCheck, userController.deleteUser)

userRouter.get('/getUserInfo', middleware.auth, userController.getUserInfo)

userRouter.post('/addProduct', middleware.auth, middleware.adminCheck, userController.addProduct)

userRouter.post('/AdminPassReset', userController.AdminPassReset)

userRouter.get('/getAllUsers', middleware.auth, userController.getAllUsers)

userRouter.put('/updateUser/:user_id', middleware.auth, userController.updateUser)

userRouter.post("/verify-email-password", userController.verifyEmailAndPassword);

userRouter.post("/reset-password", userController.resetPassword);

userRouter.get('/getSellers', middleware.auth, middleware.adminCheck, userController.getSellers)

userRouter.get('/getUsers', middleware.auth, middleware.adminCheck, userController.getUsers)

userRouter.put('/userApprove', middleware.auth, middleware.adminCheck, userController.userApprove)

userRouter.put('/userDenied', middleware.auth, middleware.adminCheck, userController.userDenied)

export default userRouter;