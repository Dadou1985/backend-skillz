-- DropForeignKey
ALTER TABLE "ameneties" DROP CONSTRAINT "ameneties_babyBedId_fkey";

-- DropForeignKey
ALTER TABLE "ameneties" DROP CONSTRAINT "ameneties_blanketId_fkey";

-- DropForeignKey
ALTER TABLE "ameneties" DROP CONSTRAINT "ameneties_hairDryerId_fkey";

-- DropForeignKey
ALTER TABLE "ameneties" DROP CONSTRAINT "ameneties_ironId_fkey";

-- DropForeignKey
ALTER TABLE "ameneties" DROP CONSTRAINT "ameneties_pillowId_fkey";

-- DropForeignKey
ALTER TABLE "ameneties" DROP CONSTRAINT "ameneties_soapId_fkey";

-- DropForeignKey
ALTER TABLE "ameneties" DROP CONSTRAINT "ameneties_toiletPaperId_fkey";

-- DropForeignKey
ALTER TABLE "ameneties" DROP CONSTRAINT "ameneties_towelId_fkey";

-- DropForeignKey
ALTER TABLE "business_users" DROP CONSTRAINT "business_users_hotelId_fkey";

-- DropForeignKey
ALTER TABLE "chat" DROP CONSTRAINT "chat_guestTokenId_fkey";

-- DropForeignKey
ALTER TABLE "chat" DROP CONSTRAINT "chat_hotelId_fkey";

-- DropForeignKey
ALTER TABLE "chat" DROP CONSTRAINT "chat_supportId_fkey";

-- DropForeignKey
ALTER TABLE "check_list_items" DROP CONSTRAINT "check_list_items_eveningId_fkey";

-- DropForeignKey
ALTER TABLE "check_list_items" DROP CONSTRAINT "check_list_items_morningId_fkey";

-- DropForeignKey
ALTER TABLE "check_list_items" DROP CONSTRAINT "check_list_items_nightId_fkey";

-- DropForeignKey
ALTER TABLE "check_lists" DROP CONSTRAINT "check_lists_hotelId_fkey";

-- DropForeignKey
ALTER TABLE "feedback_items" DROP CONSTRAINT "feedback_items_improvementFeedbackId_fkey";

-- DropForeignKey
ALTER TABLE "feedback_items" DROP CONSTRAINT "feedback_items_satisfactionFeedbackId_fkey";

-- DropForeignKey
ALTER TABLE "feedbacks" DROP CONSTRAINT "feedbacks_hotelId_fkey";

-- DropForeignKey
ALTER TABLE "guest_tokens" DROP CONSTRAINT "guest_tokens_guestUserId_fkey";

-- DropForeignKey
ALTER TABLE "guest_users" DROP CONSTRAINT "guest_users_hotelId_fkey";

-- DropForeignKey
ALTER TABLE "room_ameneties" DROP CONSTRAINT "room_ameneties_guestUserId_fkey";

-- DropForeignKey
ALTER TABLE "room_ameneties" DROP CONSTRAINT "room_ameneties_hotelId_fkey";

-- DropForeignKey
ALTER TABLE "support" DROP CONSTRAINT "support_hotelId_fkey";

-- AddForeignKey
ALTER TABLE "check_lists" ADD CONSTRAINT "check_lists_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_list_items" ADD CONSTRAINT "check_list_items_morningId_fkey" FOREIGN KEY ("morningId") REFERENCES "check_lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_list_items" ADD CONSTRAINT "check_list_items_eveningId_fkey" FOREIGN KEY ("eveningId") REFERENCES "check_lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_list_items" ADD CONSTRAINT "check_list_items_nightId_fkey" FOREIGN KEY ("nightId") REFERENCES "check_lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_users" ADD CONSTRAINT "business_users_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guest_users" ADD CONSTRAINT "guest_users_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_ameneties" ADD CONSTRAINT "room_ameneties_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_ameneties" ADD CONSTRAINT "room_ameneties_guestUserId_fkey" FOREIGN KEY ("guestUserId") REFERENCES "guest_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ameneties" ADD CONSTRAINT "ameneties_babyBedId_fkey" FOREIGN KEY ("babyBedId") REFERENCES "room_ameneties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ameneties" ADD CONSTRAINT "ameneties_blanketId_fkey" FOREIGN KEY ("blanketId") REFERENCES "room_ameneties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ameneties" ADD CONSTRAINT "ameneties_hairDryerId_fkey" FOREIGN KEY ("hairDryerId") REFERENCES "room_ameneties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ameneties" ADD CONSTRAINT "ameneties_ironId_fkey" FOREIGN KEY ("ironId") REFERENCES "room_ameneties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ameneties" ADD CONSTRAINT "ameneties_pillowId_fkey" FOREIGN KEY ("pillowId") REFERENCES "room_ameneties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ameneties" ADD CONSTRAINT "ameneties_soapId_fkey" FOREIGN KEY ("soapId") REFERENCES "room_ameneties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ameneties" ADD CONSTRAINT "ameneties_toiletPaperId_fkey" FOREIGN KEY ("toiletPaperId") REFERENCES "room_ameneties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ameneties" ADD CONSTRAINT "ameneties_towelId_fkey" FOREIGN KEY ("towelId") REFERENCES "room_ameneties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guest_tokens" ADD CONSTRAINT "guest_tokens_guestUserId_fkey" FOREIGN KEY ("guestUserId") REFERENCES "guest_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_items" ADD CONSTRAINT "feedback_items_satisfactionFeedbackId_fkey" FOREIGN KEY ("satisfactionFeedbackId") REFERENCES "feedbacks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_items" ADD CONSTRAINT "feedback_items_improvementFeedbackId_fkey" FOREIGN KEY ("improvementFeedbackId") REFERENCES "feedbacks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "support" ADD CONSTRAINT "support_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_supportId_fkey" FOREIGN KEY ("supportId") REFERENCES "support"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_guestTokenId_fkey" FOREIGN KEY ("guestTokenId") REFERENCES "guest_tokens"("id") ON DELETE CASCADE ON UPDATE CASCADE;
