-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_mapId_fkey";

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE CASCADE ON UPDATE CASCADE;
