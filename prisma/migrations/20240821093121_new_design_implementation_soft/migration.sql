/*
  Warnings:

  - Added the required column `createdBy` to the `event-categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedBy` to the `event-categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventLogo` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventSeatCount` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventSeatMax` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sponsorId` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedBy` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `venueId` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedBy` to the `roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedBy` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userProfileId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "event-categories" ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "updatedBy" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "eventLogo" TEXT NOT NULL,
ADD COLUMN     "eventSeatCount" INTEGER NOT NULL,
ADD COLUMN     "eventSeatMax" INTEGER NOT NULL,
ADD COLUMN     "sponsorId" INTEGER NOT NULL,
ADD COLUMN     "updatedBy" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD COLUMN     "venueId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "roles" ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "updatedBy" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "googleId" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "updatedBy" TEXT NOT NULL,
ADD COLUMN     "userProfileId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "userProfile" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "affiliateLink" TEXT NOT NULL,

    CONSTRAINT "userProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedule" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "activityStart" TIMESTAMP(3) NOT NULL,
    "activityEnd" TIMESTAMP(3) NOT NULL,
    "speakerId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "venue" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "venueName" TEXT NOT NULL,
    "venueDesc" TEXT NOT NULL,
    "venueAddress" TEXT NOT NULL,
    "venueCity" TEXT NOT NULL,
    "venueGMapsLocation" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,

    CONSTRAINT "venue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sponsors" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "sponsorName" TEXT NOT NULL,
    "sponsorWebLink" TEXT NOT NULL,
    "sponsorLogo" TEXT NOT NULL,

    CONSTRAINT "sponsors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "participantLists" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "attendance" BOOLEAN NOT NULL,
    "attendanceTime" TIMESTAMP(3) NOT NULL,
    "participantId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "participantLists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventTicket" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "ticketPrice" DECIMAL(65,30) NOT NULL,
    "description" TEXT NOT NULL,
    "seatCount" INTEGER NOT NULL,
    "seatMax" INTEGER NOT NULL,
    "saleStart" TIMESTAMP(3) NOT NULL,
    "saleEnd" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "eventTicket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticketTransaction" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "participantId" INTEGER NOT NULL,
    "ticketId" INTEGER NOT NULL,

    CONSTRAINT "ticketTransaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "userProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_sponsorId_fkey" FOREIGN KEY ("sponsorId") REFERENCES "sponsors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_speakerId_fkey" FOREIGN KEY ("speakerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participantLists" ADD CONSTRAINT "participantLists_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participantLists" ADD CONSTRAINT "participantLists_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventTicket" ADD CONSTRAINT "eventTicket_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticketTransaction" ADD CONSTRAINT "ticketTransaction_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticketTransaction" ADD CONSTRAINT "ticketTransaction_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "eventTicket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
