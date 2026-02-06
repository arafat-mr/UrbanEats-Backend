import { Router } from "express";
import { middleWare, UserRole } from "../../middlewares/middleware";
import { OrderController } from "./orders.controller";

const router = Router();


router.post("/", middleWare(UserRole.CUSTOMER,UserRole.PROVIDER,UserRole.ADMIN), OrderController.createOrder);


router.get("/my-orders", middleWare(UserRole.CUSTOMER,UserRole.PROVIDER,UserRole.ADMIN), OrderController.getMyOrders);


router.patch("/status/:orderId", middleWare(UserRole.ADMIN,UserRole.PROVIDER ), OrderController.updateOrderStatus);


router.patch("/place/:orderId", middleWare(UserRole.CUSTOMER), OrderController.placeOrder);
router.patch("/cancel/:orderId", middleWare(UserRole.CUSTOMER), OrderController.cancelCustomerOrder);

 
router.delete('/delete/:orderId',middleWare(UserRole.CUSTOMER),OrderController.deleteCustomerOrder)
export const OrderRoutes = router;
