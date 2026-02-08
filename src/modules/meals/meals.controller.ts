import { Request, Response } from "express";
import { MealService } from "./meals.service";
import { paginationHelper } from "../../helper/paginationHelper";
import { prisma } from "../../lib/prisma";
import { success } from "better-auth";



const addMeal= async(req:Request,res:Response)=>{
    try {
       
           if (!req.user){
            return res.status(400).json({
           
            message :'Unauthorized'
        })
           }
           
        const userstatus= await prisma.user.findFirst({
            where :{
                id :req.user.id
            }
        })   

        if(userstatus?.status==='SUSPENDED'){
            throw new Error('You are suspended')
        }
        
         const result= await MealService.addMeal(req.body,req.user?.id as string)

         res.status(201).json(result)
    } catch (error: any) {
        res.status(400).json({
            error :error.message,
            message :'Error adding meal'
        })
    }
     
}


const getMeal = async(req :Request,res:Response)=>{
    try {

        const {search,dietary,minPrice,maxPrice}= req.query
        

        const searchValue= typeof search === 'string'?search : undefined
        const dietaryValue= typeof dietary === 'string'? dietary : undefined
       const minPriceValue = minPrice ? parseInt(minPrice as string, 10) : undefined;
const maxPriceValue = maxPrice ? parseInt(maxPrice as string, 10) : undefined;


  const {page,limit,skip} = paginationHelper(req.query)
    
  
          const result = await MealService.getMeal({search : searchValue,dietary: dietaryValue,minPrice:minPriceValue,maxPrice:maxPriceValue,page: page ?? 1,limit: limit ?? 10,skip: skip ?? 0})

          res.status(200).json(result)
    } catch (error :any) {
         res.status(400).json({
            error :error.message,
            message :'Error adding meal'
        })
    }
}

const getMealById= async(req:Request,res:Response)=>{
    try {

        const {mealId}= req.params
        // console.log(postId);
        if(!mealId){
            throw new Error("Post id is required")
        }
        
          const result = await MealService.getMealById(mealId  as string)

          res.status(200).json(result)
    } catch (error :any)  {
        res.status(400).json({
            error :error.message,
            message :'Error fetching meal by id'
        })
    }
      
}

// const getMyMeals = async (req: Request, res: Response) => {

//     try {
//       const {userId} =   req.params
//     if (!req.user) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }
//     if(!req.params){
//         return res.status(400).json({message:'Unauthorized'})
//     }
//     // const id = req.user.id;
    

// //     const provider = await prisma.provider.findFirst({
// //       where: { userId: id },
// //     });
// //    console.log(provider);
   
// //     if (!provider) {
// //       return res.status(404).json({
// //         message: "Provider profile not found for this user",
// //       });
// //     }

//     const result = await MealService.getMyMeals(userId as string );

//     res.status(200).json({
//       success: true,
//       data: result,
//     });
//   } catch (error: any) {
//     console.error(error);
//     res.status(500).json({
//       message: "Error fetching meals",
//       error: error.message,
//     });
//   }
// };

const getMyMeals = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!userId) {
      return res.status(400).json({ message: "UserId is required" });
    }

    const result = await MealService.getMyMeals(userId  as string);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching meals",
      error: error.message,
    });
  }
};

const deleteMeal = async (req:Request,res:Response)=>{
    try {

        const {mealId} = req.params
         const result= await MealService.deleteMeal(mealId as string)

         res.status(200).json({success:true,message:"Deleted successfully"})
    } catch (error:any) {
        res.status(400).json({
            error :error.message,
            message :'Error deleting meal'
        })
    }
}
const updateMeal=async(req:Request,res:Response)=>{
    try {

        const {mealId}= req.params
        
        if(!req.user){
            return res.status(400).json({
                message :'Unauthorized'
            })
        }
        
        const {id}= req.user


        const result =await MealService.updateMeal(id as string,req.body,mealId as string)
        res.status(200).json({success:true,message:"updated successfully",result})
    } catch (error :any) {
          res.status(400).json({
            error :error.message,
            message :'Error fetching meal by id'
        })
    }
}


 

export const MealController ={
    addMeal,
    getMeal,
    getMealById,
    updateMeal,
    getMyMeals,
    deleteMeal
  
   
}