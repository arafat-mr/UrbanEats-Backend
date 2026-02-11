import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from "../lib/auth"
export enum UserRole {
    ADMIN= 'ADMIN',
    CUSTOMER = 'CUSTOMER',
    PROVIDER='PROVIDER'
}
declare global {
    namespace Express {
        interface Request {
            user?:{
                id:string,
                email :string,
                role:string,
                name :string
                
            }
        }
    }
}
 export const middleWare= (...roles : UserRole[])=>{
   return async(req:Request,res:Response,next:NextFunction)=>{
    console.log('middleware');
    //session
      try {
        const session= await betterAuth.api.getSession({
        headers: req.headers as any
    })

    

     if(!session){
        return res.status(400).json({
            success: false,
            message:'You are not authorized'
        })
     }
    

     req.user={
   id :session.user.id,
   email : session.user.email,
   name : session.user.name,
   role : session.user.role as string
     }


     if(roles.length && !roles.includes(req.user.role as UserRole)){
           return res.status(400).json({
            success: false,
            message:'You are not authorized'
        })
     }
    next()
      } catch (error) {
          next(error);
      }
      
    
    
    
  }
}