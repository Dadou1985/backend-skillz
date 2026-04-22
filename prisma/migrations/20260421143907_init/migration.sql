/*
  Warnings:

  - You are about to drop the column `hotelId` on the `chat_messages` table. All the data in the column will be lost.
  - You are about to drop the column `supportId` on the `chat_messages` table. All the data in the column will be lost.
  - Added the required column `room` to the `chat_messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `chat_messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `chat_messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "chat_messages" DROP CONSTRAINT "chat_messages_hotelId_fkey";

-- DropForeignKey
ALTER TABLE "chat_messages" DROP CONSTRAINT "chat_messages_supportId_fkey";

-- AlterTable
ALTER TABLE "chat_messages" DROP COLUMN "hotelId",
DROP COLUMN "supportId",
ADD COLUMN     "room" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_ChatMessageToSupport" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ChatMessageToSupport_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ChatMessageToHotel" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ChatMessageToHotel_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ChatMessageToSupport_B_index" ON "_ChatMessageToSupport"("B");

-- CreateIndex
CREATE INDEX "_ChatMessageToHotel_B_index" ON "_ChatMessageToHotel"("B");

-- AddForeignKey
ALTER TABLE "_ChatMessageToSupport" ADD CONSTRAINT "_ChatMessageToSupport_A_fkey" FOREIGN KEY ("A") REFERENCES "chat_messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatMessageToSupport" ADD CONSTRAINT "_ChatMessageToSupport_B_fkey" FOREIGN KEY ("B") REFERENCES "support"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatMessageToHotel" ADD CONSTRAINT "_ChatMessageToHotel_A_fkey" FOREIGN KEY ("A") REFERENCES "chat_messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatMessageToHotel" ADD CONSTRAINT "_ChatMessageToHotel_B_fkey" FOREIGN KEY ("B") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;
