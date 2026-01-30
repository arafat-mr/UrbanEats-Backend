import express, { Router } from "express";
import { ProvidersController } from "./providers.controller";
import { middleWare, UserRole } from "../../middlewares/middleware";

const router = express.Router();

router.get("/", ProvidersController.getProviders);
router.get(
    "/my-orders",
    middleWare(UserRole.PROVIDER),
    ProvidersController.getOrdersForProvider
);
router.get('/my-orders/:id',ProvidersController.getOrdersByProviderByid)
router.get("/:providerId", ProvidersController.getProvidersById);
router.patch(
  "/orders/:id",
  middleWare(UserRole.PROVIDER,UserRole.ADMIN),
  ProvidersController.mealStatusUpdate
  
);
export const ProvidersRouter: Router = router;
