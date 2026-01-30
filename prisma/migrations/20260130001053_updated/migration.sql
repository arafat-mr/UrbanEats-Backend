-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
