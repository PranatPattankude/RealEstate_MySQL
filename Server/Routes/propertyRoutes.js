import express from 'express'
// import Controller from '../Controllers/userController.js'
import propertyController from "../Controllers/propertyController.js"
import middleware from '../middleware/Auth.js'
import multer from '../middleware/multer.js'
const propertyRouter = express.Router()

// addProperty
propertyRouter.post('/addProperty',middleware.auth,middleware.adminCheck,multer.single('prop_img'),propertyController.addProperty)

propertyRouter.post('/addPropertyByOwner',middleware.auth,middleware.sellerCheck,multer.single('prop_img'),propertyController.addPropertyByOwner)

propertyRouter.get('/getAllProperty',propertyController.getAllProperty)

propertyRouter.delete('/deleteProperty/:prop_id',middleware.auth,middleware.adminCheck,propertyController.deleteProperty)

propertyRouter.put('/updateProperty/:prop_id',middleware.auth,middleware.adminCheck,multer.single('prop_img'),propertyController.updateProperty)

propertyRouter.get('/getOneProperty/:prop_id',propertyController.getOneProperty)

propertyRouter.get('/filterProperty',propertyController.filterProperty)

propertyRouter.get('/CountOfProperty',propertyController.CountOfProperty)

propertyRouter.get('/getfilteredPropertyByModal',propertyController.getfilteredPropertyByModal)

propertyRouter.get('/filterPropertyByStatus',middleware.auth,middleware.adminCheck,propertyController.filterPropertyByStatus)

export default propertyRouter