/*
  Warnings:

  - You are about to drop the column `date_only` on the `UserTaskTime` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserTaskTime" DROP COLUMN "date_only",
ADD COLUMN     "date" TEXT NOT NULL DEFAULT '';
