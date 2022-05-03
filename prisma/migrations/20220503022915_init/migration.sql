-- DropIndex
DROP INDEX "Member_email_key";

-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "email" DROP NOT NULL;
