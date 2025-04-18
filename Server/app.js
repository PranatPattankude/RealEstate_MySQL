// import express from 'express'
// import cors from 'cors'
// import db from "./Configuration/Cofig.js"
// import userRouter from "./Routes/userRouter.js"
// import propertyRoutes from './Routes/propertyRoutes.js'
// import path from 'path'
// import inquiryRouter from "./Routes/inquiryRoutes.js"
// import wishlistRouter from "./Routes/wishlistRoutes.js"
// import dotenv from 'dotenv';


// dotenv.config();

// const app = express();

// // Middleware Connections
// app.use(cors())
// app.use(express.json())

// //image path
// const __dirname = path.resolve()
// app.use('/uploads', express.static(path.join(__dirname, 'uploads/')));
// console.log(__dirname)

// // Routes
// app.use('/user', userRouter)
// app.use('/property',propertyRoutes)
// app.use('/inquiry',inquiryRouter)
// app.use('/wishlist',wishlistRouter)
// // Connection


// const PORT = process.env.PORT || 7000; // Fallback to 7000 if not defined

// // Connection
// app.listen(PORT, () => {
//     console.log(`App running on port: ${PORT}`);
// });
// // app.listen(7000, ()=>{
// //     console.log('App running in port: '+7000)
// // })

import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import db from './Configuration/Cofig.js';

import userRouter from './Routes/userRouter.js';
import propertyRoutes from './Routes/propertyRoutes.js';
import inquiryRouter from './Routes/inquiryRoutes.js';
import wishlistRouter from './Routes/wishlistRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
console.log("Uploads served from:", path.join(__dirname, 'uploads'));

// Routes
app.use('/user', userRouter);
app.use('/property', propertyRoutes);
app.use('/inquiry', inquiryRouter);
app.use('/wishlist', wishlistRouter);

// Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`✅ Server running on port: ${PORT}`);
});
