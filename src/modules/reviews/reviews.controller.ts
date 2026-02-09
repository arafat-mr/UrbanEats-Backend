import { Request, Response } from "express";
import { ReviewsService } from "./reviews.service";

const canReview = async (req: Request, res: Response) => {
  try {
    const customerId = req.user?.id;
    const { mealId } = req.params;

    if (!customerId) {
      return res.status(401).json({ canReview: false });
    }

    // Use service to get delivered order containing this meal
    const orderId = await ReviewsService.canReviewMeal(
      customerId,
      mealId as string
    );

    if (!orderId) {
      return res.json({ canReview: false, orderId: null });
    }

    // Customer can review, return orderId for posting review
    return res.json({ canReview: true, orderId });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};


const createReview = async (req: Request, res: Response) => {
  try {
    const customerId = req.user?.id;
    if (!customerId) return res.status(401).json({ message: "Unauthorized" });

    const { mealId, orderId, rating, comment } = req.body;

    const review = await ReviewsService.createReview({
      customerId,
      mealId,
      orderId,
      rating,
      comment,
    });

    res.status(201).json({ success: true, data: review });
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ success: false, message: err.message });
  }
};

const getMealReviews = async (req: Request, res: Response) => {
  try {
    const { mealId } = req.params;
    if (!mealId) return res.status(400).json({ message: "mealId is required" });

    const reviews = await ReviewsService.getMealReviews(mealId as string);
    res.status(200).json({ data: reviews });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
const getHotDeals= async(req:Request,res:Response)=>{
  

  try {
     const result= await ReviewsService.getHotDeals()
    res.status(200).json(result)
  } catch (error :any) {
     res.status(500).json({ message: error.message });
  }
}
export const ReviewsController = {
  canReview,
  createReview,
  getMealReviews,
  getHotDeals
};
