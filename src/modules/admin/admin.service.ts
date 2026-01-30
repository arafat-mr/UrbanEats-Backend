import { prisma } from "../../lib/prisma"
import { UserRole } from "../../middlewares/middleware";



type GetUserPayload = {

  page?:number |undefined ;
  limit?:number |undefined ;
  skip?:number | undefined
};
const getUsers = async (payload: GetUserPayload) => {
  const { page = 1, limit = 10 } = payload;
  const skip = (page - 1) * limit;

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


export const AdminService={
getUsers,
updateUserstatus
}