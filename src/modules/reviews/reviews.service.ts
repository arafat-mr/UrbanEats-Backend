import { prisma } from "../../lib/prisma";

interface CreateReviewInput {
  customerId: string;
  mealId: string;
  orderId: string;
  rating: number;
  comment?: string | undefined;
}

const createReview = async ({
  customerId,
  mealId,
  orderId,
  rating,
  comment,
}: CreateReviewInput) => {
  
  const orderItem = await prisma.orderItem.findFirst({
    where: {
      mealId,
      orderId,
      order: { customerId }, 
    },
  });

  if (!orderItem) {
    throw new Error("You can only review meals you have ordered");
  }

 const reviewData = {
  customerId,
  mealId,
  orderId,
  rating,
  comment: comment ?? null, // 
};
  const review = await prisma.review.create({
    data: reviewData
  });

  return review;
};

export const ReviewsService={
    createReview
}