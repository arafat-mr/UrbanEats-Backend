import { Request, Response } from "express";
import { AnalyticsService } from "./analytics.service";




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
export const AnayticsController={
    getAdminAnalytics,
    getCustomerAnalytics
}