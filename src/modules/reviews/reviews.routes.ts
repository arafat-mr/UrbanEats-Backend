import { Router } from "express";

import { middleWare, UserRole } from "../../middlewares/middleware";
import { ReviewsController } from "./reviews.controller";

const router = Router();

// Post a review
router.post("/", middleWare(UserRole.CUSTOMER,UserRole.ADMIN,UserRole.PROVIDER), ReviewsController.createReview);

// Get all reviews for a meal
// router.get("/meal/:mealId", );

// // Get all reviews by a customer
// router.get("/my-reviews", middleWare(UserRole.CUSTOMER), );

export const ReviewsRouter = router;
