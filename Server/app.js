import express from 'express'
import cors from 'cors'
import db from "./Configuration/Cofig.js"
import userRouter from "./Routes/userRouter.js"
import propertyRoutes from './Routes/propertyRoutes.js'
import path from 'path'
import inquiryRouter from "./Routes/inquiryRoutes.js"
const app = express();

// Middleware Connections
app.use(cors())
app.use(express.json())

//image path 
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, 'uploads/')));
console.log(__dirname)

// Routes
app.use('/user', userRouter)
app.use('/property',propertyRoutes)
app.use('/inquiry',inquiryRouter)
// Connection
app.listen(7000, ()=>{
    console.log('App running in port: '+7000)
})