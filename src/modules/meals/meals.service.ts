
import { Meal } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const addMeal = async (
  data: Omit<Meal, "id" | "createdAt" | "updatedAt" | "providerId"  >,
  userId: string,
) => {
  const provider = await prisma.provider.findFirst({
    where: { userId },
  });
 

 
  
  if (!provider) {
    throw new Error("Provider profile not found");
  }

  const result = await prisma.meal.create({
    data: {
      ...data,
      providerId: provider.id,

    },
  });

  return result;
};
type GetMealPayload = {
  search?: string | undefined;
  dietary?: string | undefined;   // single dietary tag
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  page?:number ;
  limit?:number ;
  skip?:number
};

const getMeal = async (payload : GetMealPayload) => {
   

    let categoryIds: string[] | undefined = undefined;

  if (payload.search) {
    const categories = await prisma.category.findMany({
      where: { name: { contains: payload.search, mode: "insensitive" } },
    });
    if (categories.length > 0) {
      categoryIds = categories.map((c) => c.id);
    } else {
      return [];
    }
  }


  const whereCondition: any = {};

  if (categoryIds) {
    whereCondition.categoryId = { in: categoryIds };
  }

  if (payload.dietary) {
    whereCondition.dietaryTags = {
      has: payload.dietary,
     
    };
  }

  if (payload.minPrice !== undefined || payload.maxPrice !== undefined) {
    whereCondition.price = {};
    if (payload.minPrice !== undefined) whereCondition.price.gte = payload.minPrice;
    if (payload.maxPrice !== undefined) whereCondition.price.lte = payload.maxPrice;
  }


const [meals, total] = await Promise.all([
    prisma.meal.findMany({
      where: whereCondition,
      skip: payload.skip ?? 0,
      take: payload.limit ?? 5,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.meal.count({
      where: whereCondition,
    }),
  ]);

  return {
    data: meals,
    meta: {
      page: payload.page ?? 1,
      limit: payload.limit ?? 5,
      total,
      totalPages: Math.ceil(total / (payload.limit ?? 5)),
    },
  };
};



const getMealById= async (mealId : string)=>{



return await prisma.meal.findUnique({
  where :{
    id :mealId
  }
})
 
}


   const getMyMeals= async(providerId: string)=>{
        return await prisma.meal.findMany({
          where:{
            providerId : providerId
          },
          orderBy :{
                createdAt :"desc"
            }
        })
   }



   const deleteMeal = async (mealId : string)=>{
       return await prisma.meal.delete({
        where :{
          id :mealId
        }
       })
   }
//userId   updated data  mealid
const updateMeal=async(providerId : string, data :{name?:string,description ?:string,price?:number,image?:string},mealId:string)=>{
console.log(providerId,data,mealId);

const mealdata= await prisma.meal.findFirst({
  where :{
    id :mealId
  },
  select:{
    id :true
  }
})

if(!mealdata){
  throw new Error("No data exists")
}

return await prisma.meal.update({
  where :{
    id : mealId
  },
  data
})
}


export const MealService = {
  addMeal,
  getMeal,
  getMealById,
  getMyMeals,
  deleteMeal,
  updateMeal
  
}
