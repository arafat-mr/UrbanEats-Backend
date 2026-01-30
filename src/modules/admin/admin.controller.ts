import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import { number, success } from "better-auth";
import { prisma } from "../../lib/prisma";
import { UserRole } from "../../middlewares/middleware";
import { paginationHelper } from "../../helper/paginationHelper";


const getUsers=async(req:Request,res:Response)=>{

   
     
   try {
    if (!req.user || req.user.role !== UserRole.ADMIN)
      return res.status(403).json({ message: "Unauthorized" });

    const { page, limit } = paginationHelper(req.query);

    const result = await AdminService.getUsers({
      page: page ?? 1,
      limit: limit ?? 10,
    });

    res.status(200).json({ success: true, message: "Users fetched", result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

const updateUserstatus = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
     const { status } = req.body;
  const adminId= req.user?.id
    if (typeof adminId !== "string") {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const adminData= await prisma.user.findUnique({
        where:{
            id:adminId
        }
    })
    console.log({adminData});
    

    if(adminData?.role !== UserRole.ADMIN ){
        throw  new Error('You are not authorized')
    }
    const updated = await AdminService.updateUserstatus(userId as string, status);
    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const AdminContoller= {
    getUsers,
    updateUserstatus
}