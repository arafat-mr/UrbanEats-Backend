import { Request, Response } from "express";
import { ReviewsService } from "./reviews.service";

const createReview = async (req: Request, res: Response) => {
  try {
    const customerId = req.user?.id;
    if (!customerId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { mealId, orderId, rating, comment } = req.body;

    const review = await ReviewsService.createReview({
      customerId, // Now TS knows it's a string
      mealId,
      orderId,
      rating,
      comment,
    });

    res.status(201).json({ success: true, data: review });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const ReviewsController={
    createReview
}