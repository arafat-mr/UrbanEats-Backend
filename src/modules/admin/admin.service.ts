import { prisma } from "../../lib/prisma"
import { UserRole } from "../../middlewares/middleware";



type GetUserPayload = {

  page?:number |undefined ;
  limit?:number |undefined ;
  skip?:number | undefined
};
type GetOrdersPayload = {
  page?: number | undefined;
  limit?: number | undefined;
  skip?: number |undefined;

}

type GetCategoriesPayload = {
  page?: number | undefined;
  limit?: number | undefined;
  skip?: number | undefined; 
};
export const getUsers = async (payload: GetUserPayload) => {
  const { page = 1, limit = 10, skip = (page - 1) * limit } = payload;

  const [data, total] = await Promise.all([
    prisma.user.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.user.count(),
  ]);

  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};


const updateUserstatus= async (
  userId: string,
  status?: string | undefined 
): Promise<any> => {
    if (!status) {
    throw new Error("Status is required");
  }
const userData= await prisma.user.findFirst({
    where :{
        id:userId
    },
    select :{
        id :true
    }
})

if (!userData){
    throw new Error('No user found')
}

return await prisma.user.update({
   
    where :{
        id :userId
    },
    data:{
        status: status as any
    }
})
}


 
const getOrders = async (payload: GetOrdersPayload) => {
  const { page = 1, limit = 10, skip = (page - 1) * limit } = payload;

  // Fetch orders and total count
  const [data, total] = await Promise.all([
    prisma.order.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        orderItems: {
          include: {
            meal: {
              select: {
                id: true,
                name: true, // include meal name
              },
            },
          },
        },
        user: { select: { id: true, name: true, email: true } }, 
      },
    }),
    prisma.order.count(),
  ]);

  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};
const getCategories = async (payload: GetCategoriesPayload) => {
  const { page = 1, limit = 10, skip = (page - 1) * limit } = payload;

  // Fetch categories and total count
  const [data, total] = await Promise.all([
    prisma.category.findMany({
      skip,
      take: limit,
      orderBy: { name: 'asc' },
      select: { id: true, name: true },
    }),
    prisma.category.count(),
  ]);

  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const  updateCategory=async (id: string, data: { name?: string;  }) => {
    try {
      const updated = await prisma.category.update({
        where: { id },
        data,
      });
      return updated;
    } catch (err: any) {
      // Prisma throws error if id not found
      if (err.code === "P2025") return null;
      throw err;
    }
  }

const deleteCategory=async (id: string) => {
    try {
      const deleted = await prisma.category.delete({
        where: { id },
      });
      return deleted;
    } catch (err: any) {
      if (err.code === "P2025") return null;
      throw err;
    }
  }
export const AdminService={
getUsers,
updateUserstatus,
getOrders,
getCategories,
updateCategory,
deleteCategory

}