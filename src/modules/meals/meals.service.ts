import { Meal } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


const addMeal = async(data : Omit<Meal,"id" | "createdAt" | "updatedAt"  >)=>{


    const result = await prisma.meal.create({
        data 
    })

    return result
}

const getMeal= async()=>{
    const result= await prisma.meal.findMany()

    return result
}

export const MealService ={
    addMeal,
    getMeal
}