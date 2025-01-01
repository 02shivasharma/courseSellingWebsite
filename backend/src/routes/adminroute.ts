import { Router } from "express";
import { Request, Response } from "express";
import { PrismaClient}  from "@prisma/client"
import jwt from "jsonwebtoken"
import { string, z }  from "zod"


const prisma = new PrismaClient();
const Adminrouter = Router();

const adminSchema = z.object({
    name : z.string(),
    email : z.string().email(),
    password : z.string().min(18)
})

Adminrouter.post("signUp", async(req : Request , res : Response) => {
     try{
        const validSchema = adminSchema.safeParse(req.body)
        if(!validSchema.success){
            console.log("Invalid Input", validSchema.error);
            return;
        }else{
            const admin = await prisma.admin.create({
                data : {
                    name : validSchema.data.name,
                    email : validSchema.data.email,
                    password : validSchema.data.password
                }
            })
           const token = jwt.sign({id : admin.id, email : admin.email}, "secretshiva");
           res.json({token})

        }
        
     }catch(error){
        console.error("Something went wrong " , error)
     }

})

Adminrouter.post("/signIn", async(req: Request, res : Response) => {
    try{
        const {email, password} = req.body;
        const admin = await prisma.admin.findFirst({
            where : {
                email : email,
                password : password
            }
        })
        const token = jwt.sign({id : admin?.id, email : admin?.email}, "shivasecret");

        res.json({token})
    }catch(error){
        console.error("Error while signibg in", error)
    }
})

export default Adminrouter;