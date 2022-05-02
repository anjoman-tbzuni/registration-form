/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Admin');

-- CreateEnum
CREATE TYPE "Degree" AS ENUM ('BA', 'MA', 'PHD');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "family_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "verified_phone_number" BOOLEAN NOT NULL DEFAULT false,
    "student_number" INTEGER NOT NULL,
    "dormitory_student" BOOLEAN NOT NULL DEFAULT false,
    "dormitory" TEXT,
    "interests" TEXT[],
    "cooperation_areas" TEXT[],
    "activity_records" TEXT,
    "role" "Role" NOT NULL DEFAULT E'User',

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchoolProfile" (
    "id" SERIAL NOT NULL,
    "degree" "Degree" NOT NULL,
    "univercity" TEXT,
    "college" TEXT,
    "field" TEXT,
    "entrance" TEXT,
    "orientation" TEXT,
    "memberId" TEXT NOT NULL,

    CONSTRAINT "SchoolProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthCode" (
    "id" SERIAL NOT NULL,
    "phone_number" TEXT NOT NULL,
    "pin" TEXT NOT NULL,
    "expires_after" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AuthCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_email_key" ON "Member"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Member_phone_number_key" ON "Member"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "Member_student_number_key" ON "Member"("student_number");

-- CreateIndex
CREATE UNIQUE INDEX "AuthCode_phone_number_key" ON "AuthCode"("phone_number");

-- AddForeignKey
ALTER TABLE "SchoolProfile" ADD CONSTRAINT "SchoolProfile_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
