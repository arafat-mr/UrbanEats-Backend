import express, { NextFunction, Request, Response, Router } from "express"
import { MealController } from "./meals.controller"
import { middleWare, UserRole } from "../../middlewares/middleware"


const router= express.Router()


// post 
router.post('/', middleWare(UserRole.PROVIDER,UserRole.ADMIN),MealController.addMeal)

// get 

router.get('/',MealController.getMeal)
export const MealRouters :Router=router