import express, { Request, Response, Router } from "express"
import { MealController } from "./meals.controller"

const router= express.Router()


// post 
router.post('/',MealController.addMeal)

// get 

router.get('/',MealController.getMeal)
export const MealRouters :Router=router