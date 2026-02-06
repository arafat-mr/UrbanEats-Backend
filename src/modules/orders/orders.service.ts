import { OrderStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";


interface CreateOrderPayload {
  providerId: string;
  deliveryAddress: string;
  items: {
    mealId: string; 
    quantity: number;
  }[];
}
interface UpdateBeforePlace {
  deliveryAddress?: string;
  items?: { mealId: string; quantity: number }[];
}
const createOrder = async (customerId: string, payload: CreateOrderPayload) => {
  const { providerId, deliveryAddress, items } = payload;

 
  const mealIds = items.map(item => item.mealId);
  const meals = await prisma.meal.findMany({
    where: { id: { in: mealIds }, isAvailable: true },
  });

  if (meals.length !== items.length) {
    throw new Error("Invalid or unavailable meal selected");
  }

  
  let totalAmount = 0;
  const orderItemsData = items.map(item => {
    const meal = meals.find(meal => meal.id === item.mealId)!;
    totalAmount += meal.price * item.quantity;
    return { mealId: meal.id, quantity: item.quantity, price: meal.price };
  });


  const order = await prisma.$transaction(async tx =>
    tx.order.create({
      data: {
        customerId,
        providerId,
        
        deliveryAddress,
        totalAmount,
        orderItems: { create: orderItemsData },
      },
      include: { orderItems: true },
    })
  );

  return order;
};


const getMyOrders = async (customerId: string) => {
  return prisma.order.findMany({
    where: {  customerId },  
    include: {
      orderItems: {
        include: { meal: true }, 
      },
    },
    orderBy: { createdAt: "desc" },
  });
};
 
  
const placeOrder = async (
  customerId: string,
  orderId: string,
  updateData?: UpdateBeforePlace
) => {
  // fetch order
  const order = await prisma.order.findFirst({
    where: { id: orderId, customerId, orderStatus: "CART" },
    include: { orderItems: true },
  });

  if (!order) throw new Error("Order not found or already placed");

  // update delivery address if provided
  if (updateData?.deliveryAddress) {
    order.deliveryAddress = updateData.deliveryAddress;
  }

  // update quantities if items provided
  if (updateData?.items) {
    for (const item of updateData.items) {
      const orderItem = order.orderItems.find(oi => oi.mealId === item.mealId);
      if (orderItem) {
        orderItem.quantity = item.quantity;
      } else {
        throw new Error(`Meal ${item.mealId} not found in order`);
      }
    }
  }

  // calculate total
  const totalAmount = order.orderItems.reduce((sum, oi) => sum + oi.price * oi.quantity, 0);

  // update order in DB
  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: {
      orderStatus: "PLACED",
      deliveryAddress: order.deliveryAddress,
      totalAmount,
      orderItems: {
        update: order.orderItems.map(oi => ({
          where: { id: oi.id },
          data: { quantity: oi.quantity },
        })),
      },
    },
    include: { orderItems: true },
  });

  return updatedOrder;
};


const cancelOrder = async (customerId: string, orderId: string) => {
 
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      customerId,
      orderStatus: { in: ["CART", "PLACED"] }, 
    },
  });

  if (!order) {
    throw new Error("Order cannot be canceled or not found");
  }


  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: { orderStatus: "CANCELLED" },
  });

  return updatedOrder;
};




  const updateOrderStatus= async (orderId: string, status:any ) => {
    const validStatuses = [ "PREPARING", "READY", "DELIVERED", "CANCELLED"];

    if (!validStatuses.includes(status)) {
      throw new Error("Invalid order status");
    }

    // Update order status
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {  orderStatus:status },
    });

    return updatedOrder;
  }

  

  const deleteOrder = async (customerId: string, orderId: string) => {

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      customerId,
      orderStatus: "CANCELLED" 
    },
  });

  if (!order) {
    throw new Error("Order not found or cannot be deleted");
  }

  // Delete the order (cascades to orderItems)
  const deletedOrder = await prisma.order.delete({
    where: { id: orderId },
  });

  return deletedOrder;
};

export const OrderService = {
     createOrder,getMyOrders,updateOrderStatus,placeOrder ,cancelOrder,deleteOrder};
