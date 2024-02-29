/*
  Warnings:

  - You are about to drop the column `time_only` on the `UserTaskTime` table. All the data in the column will be lost.
  - Added the required column `time` to the `UserTaskTime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserTaskTime" DROP COLUMN "time_only",
ADD COLUMN     "time" TEXT NOT NULL;
