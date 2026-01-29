-- DropForeignKey
ALTER TABLE "Meals" DROP CONSTRAINT "Meals_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "Meals" ADD CONSTRAINT "Meals_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
