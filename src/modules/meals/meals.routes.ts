import express, { NextFunction, Request, Response, Router } from "express"
import { MealController } from "./meals.controller"
import { middleWare, UserRole } from "../../middlewares/middleware"


const router= express.Router()


// post 
router.post('/', middleWare(UserRole.PROVIDER,UserRole.ADMIN),MealController.addMeal)

// get 

router.get('/',MealController.getMeal)

router.get('/myMeals',middleWare(UserRole.PROVIDER),MealController.getMyMeals)
router.get('/:mealId',MealController.getMealById)
// update 
router.patch('/:mealId', middleWare(UserRole.PROVIDER,UserRole.ADMIN),MealController.updateMeal)

// update only status 


// delete
router.delete('/:mealId',middleWare(UserRole.PROVIDER,UserRole.ADMIN),MealController.deleteMeal)
export const MealRouters :Router=router