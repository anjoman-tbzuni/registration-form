-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Admin');

-- CreateEnum
CREATE TYPE "Degree" AS ENUM ('BA', 'MA', 'PHD');

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "familyName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "verifiedPhoneNumber" BOOLEAN NOT NULL DEFAULT false,
    "studentNumber" INTEGER NOT NULL,
    "dormitoryStudent" BOOLEAN NOT NULL DEFAULT false,
    "dormitory" TEXT,
    "interests" TEXT[],
    "cooperationAreas" TEXT[],
    "activityRecords" TEXT,
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
    "phoneNumber" TEXT NOT NULL,
    "pin" TEXT NOT NULL,
    "expiresAfter" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AuthCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_email_key" ON "Member"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Member_phoneNumber_key" ON "Member"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Member_studentNumber_key" ON "Member"("studentNumber");

-- CreateIndex
CREATE UNIQUE INDEX "AuthCode_phoneNumber_key" ON "AuthCode"("phoneNumber");

-- AddForeignKey
ALTER TABLE "SchoolProfile" ADD CONSTRAINT "SchoolProfile_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
