import express, { Router } from "express";
import { ProvidersController } from "./providers.controller";

const router = express.Router();

router.get("/", ProvidersController.getProviders);
router.get("/:providerId", ProvidersController.getProvidersById);

export const ProvidersRouter: Router = router;
