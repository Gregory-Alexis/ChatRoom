/*
  Warnings:

  - The primary key for the `DislikePost` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "DislikePost" DROP CONSTRAINT "DislikePost_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "DislikePost_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "DislikePost_id_seq";
