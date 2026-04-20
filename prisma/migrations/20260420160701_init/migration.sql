/*
  Warnings:

  - You are about to drop the column `markup` on the `hotels` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `business_users` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `createdAt` on the `business_users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `createdAt` on table `guest_tokens` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `guest_tokens` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `createdAt` to the `guest_users` table without a default value. This is not possible if the table is not empty.
  - Made the column `updatedAt` on table `guest_users` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `createdAt` to the `hotels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `hotels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "business_users" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "guest_tokens" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "guest_users" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "hotels" DROP COLUMN "markup",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
