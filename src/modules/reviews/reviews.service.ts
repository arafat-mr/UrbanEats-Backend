import { prisma } from "../../lib/prisma";

interface CreateReviewInput {
  customerId: string;
  mealId: string;
  orderId: string;
  rating: number;
  comment?: string;
}



const canReviewMeal = async (customerId: string, mealId: string) => {
  const orderItem = await prisma.orderItem.findFirst({
    where: {
      mealId,
      order: {
        customerId,
        orderStatus: "DELIVERED",
      },
    },
    select: {
      orderId: true,
    },
  });

  return orderItem?.orderId || null;
};


const createReview = async ({
  customerId,
  mealId,
  orderId,
  rating,
  comment,
}: CreateReviewInput) => {
  // Validate that the customer can review this meal
  const orderItem = await prisma.orderItem.findFirst({
    where: {
      mealId,
      orderId,
      order: { customerId, orderStatus: "DELIVERED" },
    },
  });

  if (!orderItem) {
    throw new Error("You can only review meals you have purchased and delivered.");
  }

  const review = await prisma.review.create({
    data: {
      mealId,
      orderId,
      customerId,
      rating,
      comment: comment || null,
    },
  });

  return review;
};

const getMealReviews = async (mealId: string) => {
  // Fetch all reviews for the meal
  const reviews = await prisma.review.findMany({
    where: { mealId },
    orderBy: { createdAt: "desc" },
  });

  // Fetch customer names for each review
  const customerIds = [...new Set(reviews.map((review) => review.customerId))]; 
  const customers = await prisma.user.findMany({
    where: { id: { in: customerIds } },
    select: { id: true, name: true },
  });

  // Map customer names into reviews
  const reviewsWithCustomer = reviews.map((r) => ({
    ...r,
    customer: customers.find((c) => c.id === r.customerId) || { name: "Unknown" },
  }));

  return reviewsWithCustomer;
};


const getHotDeals= async()=>{
  const hotMeals= await prisma.review.findMany({
    orderBy:{rating:"desc"},
    take:3,
    include:{meal: true}
  })
  return hotMeals

}
export const ReviewsService = {
  canReviewMeal,
  createReview,
  getMealReviews,
  getHotDeals
};
