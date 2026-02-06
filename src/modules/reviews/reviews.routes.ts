import { Router } from "express";

import { middleWare, UserRole } from "../../middlewares/middleware";
import { ReviewsController } from "./reviews.controller";

const router = Router();

router.get("/can-review/:mealId", middleWare(UserRole.CUSTOMER), ReviewsController.canReview);

router.post("/", middleWare(UserRole.CUSTOMER), ReviewsController.createReview);

router.get('/meal/:mealId',middleWare(UserRole.ADMIN,UserRole.CUSTOMER,UserRole.PROVIDER),ReviewsController.getMealReviews)

export const ReviewsRouter = router;
