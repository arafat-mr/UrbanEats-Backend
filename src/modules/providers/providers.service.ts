import { prisma } from "../../lib/prisma";

type GetProvidersPayload = {
  page: number;
  limit: number;
  skip: number;
};

const getProviders = async (payload: GetProvidersPayload) => {
  const { limit, skip, page } = payload;


  const data = await prisma.provider.findMany({
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });


  const total = await prisma.provider.count();

  
  const meta = {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };

  return {
      data,
    meta,
  };
};
const getProvidersById= async(providerId:string)=>{
return await prisma.provider.findUnique({
    where :{
        id :providerId
    }
})
}
export const ProvidersService = {
  getProviders,
  getProvidersById
};
