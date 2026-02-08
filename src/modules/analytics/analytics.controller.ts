import { NextFunction, Request, Response } from "express";
import { AnalyticsService } from "./analytics.service";
import { prisma } from "../../lib/prisma";




const getAdminAnalytics= async(req:Request,res:Response)=>{
    try {
        
       const result= await AnalyticsService.getAdminAnalytics()
       res.status(200).json(result)
         

    } catch (error:any) { 
            res.status(400).json({ message: error.message });

    }
}


const getCustomerAnalytics = async (req: Request, res: Response) => {
  try {
    const customerId = req.user?.id; 
    const analytics = await AnalyticsService.getCustomerAnalytics(customerId as string);

    return res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

  const getProvierAnalytics= async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user

   const provider= await prisma.provider.findFirst({
    where:{
     userId : user?.id as string
    }
   })

      if (!provider) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const analytics = await AnalyticsService.getProviderAnalytics(provider.id);

      res.status(200).json({
        success: true,
        message: "Provider analytics fetched successfully",
        data: analytics,
      });
    } catch (error) {
      next(error);
    }
  }
export const AnayticsController={
    getAdminAnalytics,
    getCustomerAnalytics,
    getProvierAnalytics
}