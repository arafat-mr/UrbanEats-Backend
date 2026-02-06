import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import { number, success } from "better-auth";
import { prisma } from "../../lib/prisma";
import { UserRole } from "../../middlewares/middleware";
import { paginationHelper } from "../../helper/paginationHelper";


export const getUsers = async (req: Request, res: Response) => {
  try {
    if (!req.user || req.user.role !== UserRole.ADMIN)
      return res.status(403).json({ message: "Unauthorized" });

    
    const { page, limit, skip } = paginationHelper(req.query);

   
    const result = await AdminService.getUsers({ page, limit, skip });

    res.status(200).json({
      success: true,
      message: "Users fetched",
      result,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
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


const getOrders = async (req: Request, res: Response) => {
  try {
    // Only admins
    if (!req.user || req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Pagination
    const { page, limit, skip } = paginationHelper(req.query);

    const result = await AdminService.getOrders({ page, limit, skip });

    res.status(200).json({
      success: true,
      message: "Orders fetched",
      result,
    });
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ success: false, message: err.message });
  }
};

const getCategories = async (req: Request, res: Response) => {
  try {
    // Only admin access
    if (!req.user || req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Pagination
    const { page, limit, skip } = paginationHelper(req.query);

    const result = await AdminService.getCategories({ page, limit, skip });

    res.status(200).json({
      success: true,
      message: 'Categories fetched',
      result,
    });
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ success: false, message: err.message });
  }
};
export const AdminContoller= {
    getUsers,
    updateUserstatus,
    getOrders,
    getCategories
}