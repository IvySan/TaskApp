/*
  Warnings:

  - You are about to drop the column `date` on the `UserTaskTime` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `UserTaskTime` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserTaskTime" DROP COLUMN "date",
DROP COLUMN "time",
ADD COLUMN     "date_only" TIMESTAMP(3),
ADD COLUMN     "time_only" TIMESTAMP(3);
