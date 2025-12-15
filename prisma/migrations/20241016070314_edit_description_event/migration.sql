/*
  Warnings:

  - You are about to drop the column `eventDescription` on the `events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "eventDescription",
ADD COLUMN     "description" TEXT;
