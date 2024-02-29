-- CreateTable
CREATE TABLE "UserTaskTime" (
    "id" SERIAL NOT NULL,
    "time" VARCHAR(255),
    "date" VARCHAR(255),
    "userId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "UserTaskTime_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserTaskTime" ADD CONSTRAINT "UserTaskTime_userId_taskId_fkey" FOREIGN KEY ("userId", "taskId") REFERENCES "UserTask"("userId", "taskId") ON DELETE RESTRICT ON UPDATE CASCADE;
