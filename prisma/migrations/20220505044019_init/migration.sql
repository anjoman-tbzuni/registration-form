-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "interests" DROP NOT NULL,
ALTER COLUMN "interests" SET DATA TYPE TEXT;