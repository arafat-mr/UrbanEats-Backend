import { Request, Response } from "express";
import { ProvidersService } from "./providers.service";
import { paginationHelper } from "../../helper/paginationHelper";
import { prisma } from "../../lib/prisma";
import { success } from "better-auth";


const getProviders = async (req: Request, res: Response) => {
  try {


     const {page,limit,skip} = paginationHelper(req.query)
    const providers = await ProvidersService.getProviders({page: page ?? 1,limit: limit ?? 10,skip: skip ?? 0});
    res.status(200).json(providers);
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to fetch providers",
      error: error.message,
    });
  }


};

const getProvidersById= async(req:Request,res:Response)=>{
    try {
    
            const {providerId}= req.params
            // console.log(postId);
            if(!providerId){
                throw new Error("Provider id is required")
            }
            
              const result = await ProvidersService.getProvidersById(providerId  as string)
    
              res.status(200).json(result)
        } catch (error :any)  {
            res.status(400).json({
                error :error.message,
                message :'Error fetching provider by id'
            })
        }
}

const getOrdersForProvider = async (req: any, res: Response) => {
  try {
    const userId = req.user.id; // User ID
    console.log(userId);
    

    const orders = await ProvidersService.getOrdersByProvider(userId);

    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
     
      data: orders,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getOrdersByProviderByid= async(req:Request,res:Response)=>{

   const {id} = req.params

   
   
  try {
    const result= await ProvidersService.getOrdersByProviderByid(id as string)

    res.status(200).json({success:true,result})
  } catch (error :any) {
     res.status(400).json({
                error :error.message,
                message :'Error fetching orders by id'
            })
  }
}

const mealStatusUpdate= async (req: any, res: Response) => {
    try {
      const providerId = req.user.id; 
      const { id: orderId } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({
          success: false,
          message: "Status is required",
        });
      }

      const updatedOrder = await ProvidersService.mealStatusUpdate(
        
        orderId,
        status
      );

      return res.status(200).json({
        success: true,
        message: "Order status updated successfully",
        data: updatedOrder,
      });
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }


  const createProvider= async(req:Request,res:Response)=>{

    const {userId}= req.body
    try {
      if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }
      const  result= await ProvidersService.createProvider(userId as string)
      res.status(201).json({
      success: true,
      message: "Provider created successfully",
      data: result,
    }); 
    } catch (error:any) {
        return res.status(400).json({
          success: false,
          message: "Error creating provider",
        });
    }
  }

export const ProvidersController = {
  getProviders,
  getProvidersById,
  getOrdersForProvider,
  getOrdersByProviderByid,
  mealStatusUpdate,createProvider
};
