/*
  Warnings:

  - You are about to drop the column `eventCategory` on the `events` table. All the data in the column will be lost.
  - Added the required column `eventCategoryId` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "eventCategory",
ADD COLUMN     "eventCategoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_eventCategoryId_fkey" FOREIGN KEY ("eventCategoryId") REFERENCES "event-categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
