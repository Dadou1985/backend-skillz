/*
  Warnings:

  - You are about to drop the column `adresse` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `appLink` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `base64Url` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `classement` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `code_postal` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `hotelDept` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `hotelName` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `hotelRegion` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `mail` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `pricingModel` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `room` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `babyBed` on the `guest_users` table. All the data in the column will be lost.
  - You are about to drop the column `blanket` on the `guest_users` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `guest_users` table. All the data in the column will be lost.
  - You are about to drop the column `classement` on the `guest_users` table. All the data in the column will be lost.
  - You are about to drop the column `hairDryer` on the `guest_users` table. All the data in the column will be lost.
  - You are about to drop the column `hotelDept` on the `guest_users` table. All the data in the column will be lost.
  - You are about to drop the column `hotelName` on the `guest_users` table. All the data in the column will be lost.
  - You are about to drop the column `hotelPhone` on the `guest_users` table. All the data in the column will be lost.
  - You are about to drop the column `hotelRegion` on the `guest_users` table. All the data in the column will be lost.
  - You are about to drop the column `iron` on the `guest_users` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `guest_users` table. All the data in the column will be lost.
  - You are about to drop the column `pillow` on the `guest_users` table. All the data in the column will be lost.
  - You are about to drop the column `soap` on the `guest_users` table. All the data in the column will be lost.
  - You are about to drop the column `toiletPaper` on the `guest_users` table. All the data in the column will be lost.
  - You are about to drop the column `towel` on the `guest_users` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `guest_users` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `guest_users` table. All the data in the column will be lost.
  - You are about to drop the `Chat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ChatMessageToHotel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ChatMessageToSupport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ChatToChatMessage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `chatId` to the `chat_messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_guestTokenId_fkey";

-- DropForeignKey
ALTER TABLE "_ChatMessageToHotel" DROP CONSTRAINT "_ChatMessageToHotel_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChatMessageToHotel" DROP CONSTRAINT "_ChatMessageToHotel_B_fkey";

-- DropForeignKey
ALTER TABLE "_ChatMessageToSupport" DROP CONSTRAINT "_ChatMessageToSupport_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChatMessageToSupport" DROP CONSTRAINT "_ChatMessageToSupport_B_fkey";

-- DropForeignKey
ALTER TABLE "_ChatToChatMessage" DROP CONSTRAINT "_ChatToChatMessage_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChatToChatMessage" DROP CONSTRAINT "_ChatToChatMessage_B_fkey";

-- DropIndex
DROP INDEX "business_users_userId_key";

-- DropIndex
DROP INDEX "guest_users_userId_key";

-- AlterTable
ALTER TABLE "business_users" DROP COLUMN "adresse",
DROP COLUMN "appLink",
DROP COLUMN "base64Url",
DROP COLUMN "city",
DROP COLUMN "classement",
DROP COLUMN "code_postal",
DROP COLUMN "country",
DROP COLUMN "hotelDept",
DROP COLUMN "hotelName",
DROP COLUMN "hotelRegion",
DROP COLUMN "language",
DROP COLUMN "logo",
DROP COLUMN "mail",
DROP COLUMN "phone",
DROP COLUMN "pricingModel",
DROP COLUMN "room",
DROP COLUMN "userId",
DROP COLUMN "website";

-- AlterTable
ALTER TABLE "chat_messages" ADD COLUMN     "chatId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "guest_users" DROP COLUMN "babyBed",
DROP COLUMN "blanket",
DROP COLUMN "city",
DROP COLUMN "classement",
DROP COLUMN "hairDryer",
DROP COLUMN "hotelDept",
DROP COLUMN "hotelName",
DROP COLUMN "hotelPhone",
DROP COLUMN "hotelRegion",
DROP COLUMN "iron",
DROP COLUMN "logo",
DROP COLUMN "pillow",
DROP COLUMN "soap",
DROP COLUMN "toiletPaper",
DROP COLUMN "towel",
DROP COLUMN "userId",
DROP COLUMN "website";

-- DropTable
DROP TABLE "Chat";

-- DropTable
DROP TABLE "_ChatMessageToHotel";

-- DropTable
DROP TABLE "_ChatMessageToSupport";

-- DropTable
DROP TABLE "_ChatToChatMessage";

-- CreateTable
CREATE TABLE "check_lists" (
    "id" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "check_lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "check_list_items" (
    "id" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "checkListId" TEXT NOT NULL,
    "morningId" TEXT,
    "eveningId" TEXT,
    "nightId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "check_list_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_ameneties" (
    "id" TEXT NOT NULL,
    "guestUserId" TEXT,
    "hotelId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "room_ameneties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ameneties" (
    "id" TEXT NOT NULL,
    "checkoutDate" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "babyBedId" TEXT,
    "blanketId" TEXT,
    "hairDryerId" TEXT,
    "ironId" TEXT,
    "pillowId" TEXT,
    "soapId" TEXT,
    "toiletPaperId" TEXT,
    "towelId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ameneties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat" (
    "id" TEXT NOT NULL,
    "clientFullName" TEXT NOT NULL,
    "checkoutDate" TEXT NOT NULL,
    "guestLanguage" TEXT NOT NULL,
    "hotelResponding" BOOLEAN NOT NULL,
    "isChatting" BOOLEAN NOT NULL,
    "room" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    "hotelId" TEXT,
    "supportId" TEXT,
    "guestTokenId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "check_list_items_morningId_key" ON "check_list_items"("morningId");

-- CreateIndex
CREATE UNIQUE INDEX "check_list_items_eveningId_key" ON "check_list_items"("eveningId");

-- CreateIndex
CREATE UNIQUE INDEX "check_list_items_nightId_key" ON "check_list_items"("nightId");

-- AddForeignKey
ALTER TABLE "check_lists" ADD CONSTRAINT "check_lists_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_list_items" ADD CONSTRAINT "check_list_items_morningId_fkey" FOREIGN KEY ("morningId") REFERENCES "check_lists"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_list_items" ADD CONSTRAINT "check_list_items_eveningId_fkey" FOREIGN KEY ("eveningId") REFERENCES "check_lists"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_list_items" ADD CONSTRAINT "check_list_items_nightId_fkey" FOREIGN KEY ("nightId") REFERENCES "check_lists"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_ameneties" ADD CONSTRAINT "room_ameneties_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_ameneties" ADD CONSTRAINT "room_ameneties_guestUserId_fkey" FOREIGN KEY ("guestUserId") REFERENCES "guest_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ameneties" ADD CONSTRAINT "ameneties_babyBedId_fkey" FOREIGN KEY ("babyBedId") REFERENCES "room_ameneties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ameneties" ADD CONSTRAINT "ameneties_blanketId_fkey" FOREIGN KEY ("blanketId") REFERENCES "room_ameneties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ameneties" ADD CONSTRAINT "ameneties_hairDryerId_fkey" FOREIGN KEY ("hairDryerId") REFERENCES "room_ameneties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ameneties" ADD CONSTRAINT "ameneties_ironId_fkey" FOREIGN KEY ("ironId") REFERENCES "room_ameneties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ameneties" ADD CONSTRAINT "ameneties_pillowId_fkey" FOREIGN KEY ("pillowId") REFERENCES "room_ameneties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ameneties" ADD CONSTRAINT "ameneties_soapId_fkey" FOREIGN KEY ("soapId") REFERENCES "room_ameneties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ameneties" ADD CONSTRAINT "ameneties_toiletPaperId_fkey" FOREIGN KEY ("toiletPaperId") REFERENCES "room_ameneties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ameneties" ADD CONSTRAINT "ameneties_towelId_fkey" FOREIGN KEY ("towelId") REFERENCES "room_ameneties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_supportId_fkey" FOREIGN KEY ("supportId") REFERENCES "support"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_guestTokenId_fkey" FOREIGN KEY ("guestTokenId") REFERENCES "guest_tokens"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
