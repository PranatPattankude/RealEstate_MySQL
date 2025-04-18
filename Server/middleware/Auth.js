// import jwt from 'jsonwebtoken'

// function auth (req,res,next){
//     const tokenWithBearer = req.header('Authorization')
//     const tokenArray = tokenWithBearer.split(' ')
//     const token = tokenArray[1];
//     console.log("token from auth file :", token);
//     const user = jwt.decode(token,"batch40");
//     console.log(" user from auth :" ,user )
//     req.user = user ;
//     next();
// }

// function adminCheck(req,res,next){
//     if(req.user.role == 'admin'){
//         next()
//     }else{
//         res.status(202).send({message:"Not Admin"})
//     }
// }

// function commonUserCheck(req,res,next){
//  if(req.user.role == "user" ){
//     next()
//  }else{
//     res.status(404).send({message:"Not Common User"})
//  }
// }
// function sellerCheck(req,res,next){
//     if(req.user && req.user.role.includes("seller")){
//        next()
//     }else{
//        res.status(404).send({message:"Not seller"})
//     }
//    }
// export default { auth, adminCheck, commonUserCheck, sellerCheck }




import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Load env variables

function auth(req, res, next) {
    const tokenWithBearer = req.header('Authorization');

    if (!tokenWithBearer) {
        return res.status(401).send({ message: 'Authorization header missing' });
    }

    const tokenArray = tokenWithBearer.split(' ');
    const token = tokenArray[1];

    if (!token) {
        return res.status(401).send({ message: 'Token missing' });
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        console.log("User from auth middleware:", user);
        req.user = user;
        next();
    } catch (err) {
        console.error("JWT verification failed:", err);
        res.status(403).send({ message: 'Invalid or expired token' });
    }
}

function adminCheck(req, res, next) {
    if (req.user.role === 'admin') {
        next();
    } else {
        res.status(403).send({ message: "Not Admin" });
    }
}

function commonUserCheck(req, res, next) {
    if (req.user.role === 'user') {
        next();
    } else {
        res.status(403).send({ message: "Not Common User" });
    }
}

function sellerCheck(req, res, next) {
    if (req.user && req.user.role.includes("seller")) {
        next();
    } else {
        res.status(403).send({ message: "Not Seller" });
    }
}

export default { auth, adminCheck, commonUserCheck, sellerCheck };
