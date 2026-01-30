import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const getCurrentUser=async(req:Request,res:Response)=>{
    try {   
  console.log(req.user);
  
          if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

          
        const result= await AuthService.getCurrentUser(req.user.id as string)
        res.status(200).json(result)
    }  catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export const Authcontroller={
    getCurrentUser
}