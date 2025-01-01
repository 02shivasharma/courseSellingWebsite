import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

export const adminMiddleware = (req : Request, res: Response, next : NextFunction)=>{
   const authHeader = req.headers.authorization;
   if(!authHeader){
    return res.status(404).json({error : "Authentiacation Token is not Provided"});
   }
   try{
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, "shiva");

    if(!decoded || typeof decoded === 'string'){
        return res.status(403).json({error : "Invalid Token is provided"})
    }
      req.body.adminId = decoded?.id
   }catch(error){
    console.log("Authenticatin failed", error)
   }
}