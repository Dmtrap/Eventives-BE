/*
  Warnings:

  - A unique constraint covering the columns `[categoryName]` on the table `event-categories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "event-categories_categoryName_key" ON "event-categories"("categoryName");
