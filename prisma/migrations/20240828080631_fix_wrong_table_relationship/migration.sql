/*
  Warnings:

  - You are about to drop the column `sponsorId` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `venueId` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `userProfileId` on the `users` table. All the data in the column will be lost.
  - Added the required column `userId` to the `userProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `venue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_sponsorId_fkey";

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_venueId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_userProfileId_fkey";

-- AlterTable
ALTER TABLE "events" DROP COLUMN "sponsorId",
DROP COLUMN "venueId";

-- AlterTable
ALTER TABLE "userProfile" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "userProfileId";

-- AlterTable
ALTER TABLE "venue" ADD COLUMN     "eventId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "_EventsToVenue" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_EventsToSponsors" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EventsToVenue_AB_unique" ON "_EventsToVenue"("A", "B");

-- CreateIndex
CREATE INDEX "_EventsToVenue_B_index" ON "_EventsToVenue"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventsToSponsors_AB_unique" ON "_EventsToSponsors"("A", "B");

-- CreateIndex
CREATE INDEX "_EventsToSponsors_B_index" ON "_EventsToSponsors"("B");

-- AddForeignKey
ALTER TABLE "userProfile" ADD CONSTRAINT "userProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventsToVenue" ADD CONSTRAINT "_EventsToVenue_A_fkey" FOREIGN KEY ("A") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventsToVenue" ADD CONSTRAINT "_EventsToVenue_B_fkey" FOREIGN KEY ("B") REFERENCES "venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventsToSponsors" ADD CONSTRAINT "_EventsToSponsors_A_fkey" FOREIGN KEY ("A") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventsToSponsors" ADD CONSTRAINT "_EventsToSponsors_B_fkey" FOREIGN KEY ("B") REFERENCES "sponsors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
