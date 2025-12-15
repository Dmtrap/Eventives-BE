/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `userProfile` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `status` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "userProfile_userId_key" ON "userProfile"("userId");
