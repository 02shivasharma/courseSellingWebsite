import { Router, Request, Response } from "express";
import { z } from  "zod"
import jwt from  "jsonwebtoken"
import  { PrismaClient } from "@prisma/client"

const userRouter = Router();
const prisma = new PrismaClient();
const UserSchema = z.object({
    username : z.string(),
    email : z.string().email(),
    password : z.string().min(6)
})

const UserSignInSchema = z.object({
    email : z.string().email(),
    password : z.string().min(6)
})

userRouter.post("/singup", async(req : Request, res : Response) => {
    try{
       const result = UserSchema.safeParse(req.body)

       if(!result.success){
        console.log("Input is not valid", result.error)
        return
       }else{
        const user = await prisma.user.create({
            data : {
                username : result.data.username,
                email : result.data.email,
                password : result.data.password
            }
        })
          
          const token = jwt.sign({email : user.email}, "secretissecret")
          res.json({token})

         }
    }catch(error){
        console.log("Something went wrong while signing up", error)
    }
})

userRouter.post("/signIn", async(req : Request, res : Response)=> {
    try{
        const result = UserSignInSchema.safeParse(req.body);
        if(!result.success){
            console.log("Invalid Input", result.error)
            return
        }else{
            const user = await prisma.user.findFirst({
                where : {
                    email : result.data.email
                }
            })

            if(!user){
                res.status(404).json({error : "User Doesn't exsitsts"});
            }
            const token = jwt.sign({email : user?.email}, "secretShiva");
            res.json({token})
        }
    }catch(error){
            console.log("Something went wrong while signing In", error)
        }
})

export default userRouter;