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



const getOrdersByProvider = async (providerId: string) => {

  const provider= await prisma.provider.findFirst({
    where : {
      userId:providerId
    }
  })

  console.log(provider);
   if (!provider) {
    throw new Error("Provider not found");
  }
  return prisma.order.findMany({
    where:  { providerId: provider.id }, 
    include: {
      orderItems: {
        include: { meal: true },
      },
      user: { select: { id: true, name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};

const getOrdersByProviderByid= async(providerId: string)=>{
 return await prisma.order.findFirst({
    where :{
      id: providerId
    }
  })
}
const mealStatusUpdate= async (
    // providerId: string,
    orderId: string,
    status: "PREPARING" | "READY" | "DELIVERED" | "CANCELLED"
  ) => {
    // Validate status
    const validStatuses = ["PREPARING", "READY", "DELIVERED", "CANCELLED"];
    if (!validStatuses.includes(status)) {
      throw new Error("Invalid order status");
    }

    // Find the order and make sure it belongs to this provider
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        // providerId,
      },
    });

    if (!order) {
      throw new Error("Order not found or does not belong to this provider");
    }

    // Update status
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { orderStatus: status },
      include: { orderItems: true }, 
    });

    return updatedOrder;
  }


  const createProvider=async(userId: string)=>{
  
    return await prisma.provider.create({
    data:{userId}
    })
  }

export const ProvidersService = {
  getProviders,
  getProvidersById,
  getOrdersByProvider,
  getOrdersByProviderByid,
  mealStatusUpdate,createProvider
};
