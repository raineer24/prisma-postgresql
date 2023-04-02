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
