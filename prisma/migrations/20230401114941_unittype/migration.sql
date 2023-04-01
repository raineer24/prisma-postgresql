/*
  Warnings:

  - You are about to drop the column `image` on the `users` table. All the data in the column will be lost.
  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'CHIEFEDITOR', 'EDITOR', 'USER');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "image",
DROP COLUMN "role",
ADD COLUMN     "role" "UserType" NOT NULL DEFAULT E'USER';

-- CreateTable
CREATE TABLE "profile_image" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "secure_url" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "profile_image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_image_userId_key" ON "profile_image"("userId");

-- AddForeignKey
ALTER TABLE "profile_image" ADD CONSTRAINT "profile_image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
