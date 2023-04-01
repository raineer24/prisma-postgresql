/*
  Warnings:

  - You are about to drop the column `image` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "image";

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
