import { Request, Response } from "express";
import { ProvidersService } from "./providers.service";
import { paginationHelper } from "../../helper/paginationHelper";


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
export const ProvidersController = {
  getProviders,
  getProvidersById
};
