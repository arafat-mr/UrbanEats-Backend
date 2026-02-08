import { prisma } from "../../lib/prisma"


const getAdminAnalytics=async()=>{
  

     //total orders , total users , total meals


     return await prisma.$transaction(async(tx)=>{
           const totalUsers= await prisma.user.count();
           const totalOrders= await prisma.order.count();
        //    const totalMeals= await prisma.meal.count()
          const totalProviders= await prisma.provider.count()

           return {
            totalOrders,totalUsers,totalProviders
           }
     }
    
    
 
)
}



const getCustomerAnalytics = async (customerId: string) => {
 
 const orders= await prisma.order.findMany({
    where :{
       customerId
    }
 })


 const totalOrders= orders.length

 const successfulOrders = orders.filter((order)=>order.orderStatus!=="CANCELLED").length

  const successPercentage = totalOrders
    ? Math.round((successfulOrders / totalOrders) * 100)
    : 0;




  return {
    totalOrders,
    successfulOrders,
    successPercentage,
  };
};


const getProviderAnalytics= async (providerId: string) => {
    const totalDeliveredOrders = await prisma.order.count({
      where: {
        providerId,
        orderStatus: "DELIVERED",
      },
    });

    const revenue = await prisma.order.aggregate({
      where: {
        providerId,
        orderStatus: "DELIVERED",
      },
      _sum: {
        totalAmount: true,
      },
    });

    const totalItemsSold = await prisma.orderItem.aggregate({
      where: {
        order: {
          providerId,
          orderStatus: "DELIVERED",
        },
      },
      _sum: {
        quantity: true,
      },
    });

    return {
      totalDeliveredOrders,
      totalRevenue: revenue._sum.totalAmount || 0,
      totalItemsSold: totalItemsSold._sum.quantity || 0,
    };
  }
export const AnalyticsService={
    getAdminAnalytics,
    getCustomerAnalytics,
    getProviderAnalytics
}