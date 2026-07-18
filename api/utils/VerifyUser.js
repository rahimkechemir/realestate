import { errorHandler } from "./error.js"
import jwt from 'jsonwebtoken'
export const VerifyToken=(req,res,next)=>{
    const token = req.cookies.token
    if(!token)return next(errorHandler(401,'unothorized'))
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=> { 
      if(err)return next(errorHandler(403,'forbidden')) 
      req.user=user    
      next()})
}