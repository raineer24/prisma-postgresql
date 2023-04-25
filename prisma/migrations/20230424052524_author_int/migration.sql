/*
  Warnings:

  - You are about to drop the column `image` on the `users` table. All the data in the column will be lost.
  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'CHIEFEDITOR', 'EDITOR', 'USER');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "image",
ADD COLUMN     "image_id" TEXT,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "refresh_token" TEXT,
ADD COLUMN     "refresh_tooken_expire" TIMESTAMP(3),
DROP COLUMN "role",
ADD COLUMN     "role" "UserType" NOT NULL DEFAULT E'USER';

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "content" VARCHAR(512) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER,
    "body" TEXT NOT NULL,
    "likes" INTEGER,
    "headerImage" TEXT,
    "isPublished" BOOLEAN,
    "slug" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
