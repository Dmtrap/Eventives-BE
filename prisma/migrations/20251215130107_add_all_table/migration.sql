-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_speakerId_fkey";

-- CreateTable
CREATE TABLE "speaker" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "instagram" TEXT,
    "x" TEXT,
    "facebook" TEXT,
    "linkedin" TEXT,
    "photo" TEXT,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "speaker_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_speakerId_fkey" FOREIGN KEY ("speakerId") REFERENCES "speaker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "speaker" ADD CONSTRAINT "speaker_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
