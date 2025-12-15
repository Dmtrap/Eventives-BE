/*
  Warnings:

  - You are about to drop the `_EventsToSponsors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventsToVenue` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ticketName` to the `eventTicket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeTicket` to the `eventTicket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_EventsToSponsors" DROP CONSTRAINT "_EventsToSponsors_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventsToSponsors" DROP CONSTRAINT "_EventsToSponsors_B_fkey";

-- DropForeignKey
ALTER TABLE "_EventsToVenue" DROP CONSTRAINT "_EventsToVenue_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventsToVenue" DROP CONSTRAINT "_EventsToVenue_B_fkey";

-- AlterTable
ALTER TABLE "eventTicket" ADD COLUMN     "ticketName" TEXT NOT NULL,
ADD COLUMN     "typeTicket" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "eventDescription" TEXT;

-- AlterTable
ALTER TABLE "sponsors" ADD COLUMN     "eventId" INTEGER;

-- AlterTable
ALTER TABLE "venue" ADD COLUMN     "eventId" INTEGER;

-- DropTable
DROP TABLE "_EventsToSponsors";

-- DropTable
DROP TABLE "_EventsToVenue";

-- CreateTable
CREATE TABLE "galery" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "namePicture" TEXT NOT NULL,
    "galeryCategoryId" INTEGER NOT NULL,
    "bannerId" INTEGER NOT NULL,

    CONSTRAINT "galery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "galeryCategory" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "categoryGalery" TEXT NOT NULL,

    CONSTRAINT "galeryCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banner" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "titleBanner" TEXT NOT NULL,
    "seatMax" INTEGER NOT NULL,
    "speakerCount" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "eventTime" TIMESTAMP(3) NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "banner_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "venue" ADD CONSTRAINT "venue_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sponsors" ADD CONSTRAINT "sponsors_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "galery" ADD CONSTRAINT "galery_galeryCategoryId_fkey" FOREIGN KEY ("galeryCategoryId") REFERENCES "galeryCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "galery" ADD CONSTRAINT "galery_bannerId_fkey" FOREIGN KEY ("bannerId") REFERENCES "banner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "banner" ADD CONSTRAINT "banner_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
