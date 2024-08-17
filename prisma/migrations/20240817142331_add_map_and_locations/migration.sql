/*
  Warnings:

  - Added the required column `pinLatitude` to the `Map` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pinLongitude` to the `Map` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pinName` to the `Map` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Map" ADD COLUMN     "pinLatitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "pinLongitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "pinName" TEXT NOT NULL;
