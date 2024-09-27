-- DropForeignKey
ALTER TABLE "Map" DROP CONSTRAINT "Map_userId_fkey";

-- AddForeignKey
ALTER TABLE "Map" ADD CONSTRAINT "Map_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
