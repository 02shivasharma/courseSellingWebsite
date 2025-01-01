import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export async function authMiddleware(req : Request, res : Response, next : NextFunction) : Promise<any> {
    const authHeader = req.headers.authorization;
    
    if(!authHeader){
        return res.json({error : "Authorization header not provided"})
    }
    const token = authHeader.split(' ')[1];  
    const decoded = jwt.verify(token, "secretShiva")


    if(!decoded || typeof decoded === 'string'){
        return res.status(401).json({ error : "Invalid or expired token"})
    }
    req.body.userId = decoded.id
    next()
}