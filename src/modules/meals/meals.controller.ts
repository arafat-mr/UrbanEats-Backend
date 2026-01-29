import { Request, Response } from "express";
import { MealService } from "./meals.service";
import { paginationHelper } from "../../helper/paginationHelper";


const addMeal= async(req:Request,res:Response)=>{
    try {
       
           if (!req.user){
            return res.status(400).json({
           
            message :'Unauthorized'
        })
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

        const {postId}= req.params
        // console.log(postId);
        if(!postId){
            throw new Error("Post id is required")
        }
        
          const result = await MealService.getMealById(postId  as string)

          res.status(200).json(result)
    } catch (error :any)  {
        res.status(400).json({
            error :error.message,
            message :'Error fetching meal by id'
        })
    }
      
}

export const MealController ={
    addMeal,
    getMeal,
    getMealById
}