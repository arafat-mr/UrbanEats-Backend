import { Request, Response } from "express";
import { OrderService } from "./orders.service";
import { prisma } from "../../lib/prisma";


const createOrder = async (req: Request, res: Response) => {
  try {
    const customerId = req.user?.id 
    const payload = req.body;

    

    const order = await OrderService.createOrder(customerId as string, payload);

    res.status(201).json({
      success: true,
      message: "Saved to cart successfully",
      data: order,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to add to cart",
    });
  }
};

const getMyOrders = async (req: Request, res: Response) => {
  try {
    const customerId = req.user?.id;
        console.log(req.user);
        
    const orders = await OrderService.getMyOrders(customerId as string);

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to fetch orders",
    });
  }
};

 const placeOrder = async (req: any, res: Response) => {
  try {
    const customerId = req.user.id;
    const { orderId } = req.params;

    const order = await OrderService.placeOrder(customerId, orderId);

    return res.status(200).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
 const cancelCustomerOrder = async (req: any, res: Response) => {
  try {
    const customerId = req.user.id;
    const { orderId } = req.params;

    const order = await OrderService.cancelOrder(customerId, orderId);

    return res.status(200).json({
      success: true,
      message: "Order canceled successfully",
      data: order,
    });
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

const updateOrderStatus = async (req: any, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body; 

    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required" });
    
    }
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { orderStatus: status },
    });

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: updatedOrder,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};


const deleteCustomerOrder = async (req: any, res: Response) => {
  try {
    const customerId = req.user.id;      
    const { orderId } = req.params;

    const deletedOrder = await OrderService.deleteOrder(customerId, orderId);

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
      data: deletedOrder,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}
export const OrderController = {
  createOrder,getMyOrders,updateOrderStatus,placeOrder,cancelCustomerOrder,deleteCustomerOrder
}
