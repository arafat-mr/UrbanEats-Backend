import { Request, Response } from "express";
import { MealService } from "./meals.service";


const addMeal= async(req:Request,res:Response)=>{
    try {

        console.log(req.body);
        
         const result= await MealService.addMeal(req.body)

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
          const result = await MealService.getMeal()

          res.status(201).json(result)
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