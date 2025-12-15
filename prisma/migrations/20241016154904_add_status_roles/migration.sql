/*
  Warnings:

  - The `eventStatus` column on the `events` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "eventStatus",
ADD COLUMN     "eventStatus" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "roles" ADD COLUMN     "status" BOOLEAN;
