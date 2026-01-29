import { Request, Response } from "express";
import { MealService } from "./meals.service";


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

          const result = await MealService.getMeal({search : searchValue,dietary: dietaryValue,minPrice:minPriceValue,maxPrice:maxPriceValue})

          res.status(200).json(result)
    } catch (error :any) {
         res.status(400).json({
            error :error.message,
            message :'Error adding meal'
        })
    }
}

export const MealController ={
    addMeal,
    getMeal
}