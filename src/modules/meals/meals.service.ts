
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
  category?: string |undefined;
  dietary?: string | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  page?: number ;
  limit?: number;
  skip?: number;
};

const getMeal = async (payload: GetMealPayload) => {
  let categoryIds: string[] | undefined = undefined;

  
  if (payload.category) {
    const categories = await prisma.category.findMany({
      where: { name: { equals: payload.category, mode: "insensitive" } },
    });
    if (categories.length > 0) {
      categoryIds = categories.map((c) => c.id);
    } else {
      // If category not found, return empty
      return {
        data: [],
        meta: {
          page: payload.page ?? 1,
          limit: payload.limit ?? 10,
          total: 0,
          totalPages: 0,
        },
      };
    }
  }

  // BUILD WHERE CONDITION
  const whereCondition: any = {};

  // Search on meal name
  if (payload.search) {
    whereCondition.name = { contains: payload.search, mode: "insensitive" };
  }

  // Filter by category
  if (categoryIds) {
    whereCondition.categoryId = { in: categoryIds };
  }

  // Filter dietary tags
  if (payload.dietary) {
    whereCondition.dietaryTags = {
      has: payload.dietary,
    };
  }

  // Filter price
  if (payload.minPrice !== undefined || payload.maxPrice !== undefined) {
    whereCondition.price = {};
    if (payload.minPrice !== undefined) whereCondition.price.gte = payload.minPrice;
    if (payload.maxPrice !== undefined) whereCondition.price.lte = payload.maxPrice;
  }

  // FETCH MEALS AND COUNT
  const [meals, total] = await Promise.all([
    prisma.meal.findMany({
      where: whereCondition,
      skip: payload.skip ?? ((payload.page ?? 1) - 1) * (payload.limit ?? 10),
      take: payload.limit ?? 10,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.meal.count({ where: whereCondition }),
  ]);

  return {
    data: meals,
    meta: {
      page: payload.page ?? 1,
      limit: payload.limit ?? 10,
      total,
      totalPages: Math.ceil(total / (payload.limit ?? 10)),
    },
  };
};



const getMealById= async (mealId : string)=>{



return await prisma.meal.findUnique({
  where :{
    id :mealId
  },
  include:{
    provider:{
      select:{
        id:true,
        user: {
          select:{
            name:true
          }
        }
      }
    }
  }
})
 
}


// const getMyMeals = async (userId : string ) => {

//   const provider= await prisma.provider.findUnique({
//     where :{
//       userId : userId as string
//     }
//   })
//   return await prisma.meal.findMany({
//     where: {
//       providerId: provider?.id as string ,   
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });
// };


const getMyMeals= async (userId: string) => {
  const provider = await prisma.provider.findFirst({
    where: {
      userId: userId,   
    },
  });

  if (!provider) {
    return [];
  }

  return await prisma.meal.findMany({
    where: {
      providerId: provider.id,  
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};


   const deleteMeal = async (mealId : string)=>{
       return await prisma.meal.delete({
        where :{
          id :mealId
        }
       })
   }
//userId   updated data  mealid
const updateMeal=async(providerId : string, data :{name?:string,description ?:string,price?:number,image?:string},mealId:string)=>{


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
  updateMeal,
  
  
}
