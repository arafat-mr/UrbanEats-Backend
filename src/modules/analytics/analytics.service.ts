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

export const AnalyticsService={
    getAdminAnalytics,
    getCustomerAnalytics
}